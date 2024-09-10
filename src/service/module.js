import { apiRequest, axiosInstance } from "./core/axios";

export const addModule = async (data) => {
  return await apiRequest(() => axiosInstance.post("/api/modules", data));
};

export const getAllModules = async () => {
  return await apiRequest(() => axiosInstance.get("/api/modules"));
};

export const getModuleById = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/modules/${id}`));
};
