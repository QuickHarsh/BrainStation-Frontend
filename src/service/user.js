import { apiRequest, axiosInstance } from "./core/axios";

export const getUserModules = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/users/user-modules`));
};
