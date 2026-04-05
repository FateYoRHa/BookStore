import { User } from "../model/index.js";
import { RefreshToken } from "../model/RefreshToken.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utis/token.js";

import { createCustomerService } from "../services/core/customer_services.js";

export async function registerService(user) {
  try {
    const { email, password } = user;
    const emailUsed = await User.findOne({ email: email });
    if (emailUsed) {
      const error = new Error("Email is already taken.");
      error.status = 409;
      throw error;
    }
    const registerUser = await User.create({ email, password });
    const id = registerUser._id;
    const name = email.split("@")[0];
    // soft signup/create customer
    await createCustomerService({ id, name });
    const accessToken = signAccessToken(registerUser);
    const refreshToken = signRefreshToken(registerUser);

    await RefreshToken.create({
      user: registerUser._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

export async function loginService(login) {
  const { email, password, deviceId } = login;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error(
      "Credentials does not match any data from our database.",
    );
    error.status = 401;
    throw error;
  }
  const passMatch = await user.comparePassword(password);
  if (!passMatch) {
    const error = new Error(
      "Credentials does not match any data from our database.",
    );
    error.status = 401;
    throw error;
  }

  // ISSUE TOKEN
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  // Store refresh token connected to user id and device id
  await RefreshToken.findOneAndUpdate(
    { user: user._id, deviceId },
    {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    { upsert: true, new: true },
  );

  return { accessToken, refreshToken };
}

export async function refreshService(refToken, deviceId) {
  try {
    if (!refToken) {
      const error = new Error("Token not recognized");
      error.status = 401;
      throw error;
    }
    if (!deviceId) {
      const error = new Error("Device ID is required");
      error.status = 400;
      throw error;
    }
    // verify refresh token
    const payload = verifyRefreshToken(refToken);
    const token = await RefreshToken.findOne({
      user: payload.sub,
      deviceId,
    });

    if (!token) {
      const error = new Error("Token not recognized");
      error.status = 403;
      throw error;
    }

    if (token.expiresAt < new Date()) {
      const error = new Error("Token expired");
      error.status = 401;
      throw error;
    }
    const isMatch = await token.compareRefreshToken(refToken);

    if (!isMatch) {
      // reuse detection
      await RefreshToken.deleteMany({ user: payload.sub });

      const error = new Error("Token reuse detected");
      error.status = 403;
      throw error;
    }

    // check db for user
    const user = await User.findById(payload.sub);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    // ISSUE TOKENs
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    await RefreshToken.findOneAndUpdate(
      { user: user._id, deviceId },
      {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { new: true },
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("refresh service error", error.message || error);
    throw error;
  }
}

export async function logoutService(refreshToken) {
  try {
    if (!refreshToken) return;
    // verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    // find all tokens that belong to user
    const tokens = await RefreshToken.find({ user: payload.sub });
    if (!tokens) return;
    let matchedToken = null;
    // loop through to find correct token
    for (const t of tokens) {
      // compare each hash
      const isMatch = await t.compareRefreshToken(refreshToken);
      if (isMatch) {
        // match correct one
        matchedToken = t;
        break;
      }
    }

    if (!matchedToken) throw error;
    return await RefreshToken.deleteOne({ _id: matchedToken._id });
  } catch (error) {
    console.log("Error logout service", error.message || error);
    throw error;
  }
}
