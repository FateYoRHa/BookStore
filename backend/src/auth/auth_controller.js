import * as authService from "./auth_services.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await authService.registerService({ email, password });
    res.status(201).json(user)
  } catch (error) {
    console.log("Error register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function login(req, res) {
  try {
  } catch (error) {
    console.log("Error register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function logout(req, res) {
  try {
  } catch (error) {
    console.log("Error register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
