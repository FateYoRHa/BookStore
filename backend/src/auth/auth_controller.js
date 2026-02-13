import * as authService from "./auth_services.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } =
      await authService.registerService({ email, password });

    res
      .status(201)
      .json({ access_token: accessToken, refresh_token: refreshToken });
  } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Duplicate value detected.",
        });
      }

    console.log("Error register", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginService({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.log("Error login", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
  } catch (error) {
    console.log("Error register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
