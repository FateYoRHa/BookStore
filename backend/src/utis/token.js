import jwt from "jsonwebtoken";

export const signAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const signRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
