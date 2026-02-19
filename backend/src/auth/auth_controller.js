import * as authService from "./auth_services.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authService.registerService({
      email,
      password,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production" use true in production
      // sameSite: "strict", //use in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // res.status(201).json({
    //   access_token: accessToken,
    //   refresh_token: refreshToken,
    // });
    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(error);
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

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production" use true in production
      // sameSite: "strict", //use in production
      sameSite: "lax",
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

export async function refresh(req, res) {
  try {
    // get refresh token from cookie and send to refresh service
    const { accessToken, refreshToken } = await authService.refreshService(
      req.cookies.refreshToken,
    );
    // set new cookie
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production" use true in production
      // sameSite: "strict", //use in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.log("Error refresh", error.message || error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    await authService.logoutService(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production" use true in production
      // sameSite: "strict", //use in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Logout Failed" });
  }
}
