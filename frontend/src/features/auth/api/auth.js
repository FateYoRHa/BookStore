import api from "@/services/axios";

// This function ONLY performs the HTTP request.
// It contains NO UI logic.

export const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data, {
    skipAuthRefresh: true,
  });
  return response.data;
};

export const signupRequest = async (data) => {
  const response = await api.post("/auth/register", data, {
    skipAuthRefresh: true,
  });
  return response.data;
};

export const logoutRequest = async () => {
  return await api.post("/auth/logout");
};
