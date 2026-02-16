import axios from "axios";

// This is your centralized HTTP client.
// ALL API calls go through this instance.

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
// const BASE_URL = import.meta.env.MODE === "development" ? "http://api:5000" : "/";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows cookies (important for JWT httpOnly)
});

export default api;
