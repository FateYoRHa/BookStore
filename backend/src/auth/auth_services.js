import { User } from "../model/index.js";
import { RefreshToken } from "../model/RefreshToken.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utis/token.js";

import { createCustomerService } from "../services/core/customer_services.js";

export async function registerService(user) {
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
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return { registerUser, accessToken, refreshToken };
}

export async function loginService(login) {
  const { email, password } = login;
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
  // Store refresh token connected to user id
  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
}

export async function refreshService(refToken) {
  try {
    if (!refToken) {
      const error = new Error("Token not recognized");
      error.status = 401;
      throw error;
    }
    // verify refresh token
    const payload = verifyRefreshToken(refToken);
    // find token using user id
    const token = await RefreshToken.findOne({ user: payload.sub });
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
    // compare token with hashed token
    const storedToken = await token.compareRefreshToken(refToken);

    if (!storedToken) {
      const error = new Error("Token not recognized");
      error.status = 403;
      throw error;
    }
    const tokens = await RefreshToken.find({ user: payload.sub });
    if (!tokens) return;
    let matchedToken = null;
    // loop through to find correct token
    for (const t of tokens) {
      // compare each hash
      const isMatch = await t.compareRefreshToken(refToken);
      if (isMatch) {
        // match correct one
        matchedToken = t;
        break;
      }
    }
    // REFRESH ROTATION
    await RefreshToken.deleteOne({ _id: matchedToken._id });

    // check db for user
    const user = await User.findById(payload.sub);
    // ISSUE TOKENs
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

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
