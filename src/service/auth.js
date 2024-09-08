import { apiRequest, axiosInstance } from "./core/axios";

export const login = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/login`, data));
};

export const register = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/register`, data), showLoader);
};

export const forgotPassword = async () => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/forgot_password`));
};

export const resetPassword = async (code, data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/reset_password/${code}`, data));
};

export const getCurrentUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/auth/current`));
};

export const refresh = () => {
  const token = localStorage.getItem("refresh_token");
  if (!token) {
    return Promise.reject("No token stored");
  }
  return apiRequest(() => axiosInstance.post(`/api/auth/refresh`, { refresh_token: token }));
};

export const logout = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  return await apiRequest(() => axiosInstance.post(`/api/auth/logout`, { refresh_token }));
};
