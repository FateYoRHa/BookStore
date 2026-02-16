import api from "../../../services/axios.js";

// This function ONLY performs the HTTP request.
// It contains NO UI logic.

export const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
