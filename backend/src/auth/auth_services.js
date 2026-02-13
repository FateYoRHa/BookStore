import { User } from "../model/index.js";
import { signAccessToken, signRefreshToken } from "../utis/token.js";

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

  return { accessToken, refreshToken };
}
