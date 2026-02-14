import { verifyAccessToken } from "../utis/token.js";
import { extractAccessToken } from "../utis/extractAccessToken.js";
import { User } from "../model/index.js";

export async function authenticate(req, res, next) {
  try {
    const accessToken = extractAccessToken(req.headers.authorization);
    const payload = verifyAccessToken(accessToken);
    const user = await User.findById(payload.sub).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }
    req.user = user;
    next()
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
