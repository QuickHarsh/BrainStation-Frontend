import { apiRequest, axiosInstance } from "./core/axios";

// Fetch predictions for all modules by userId
export const getPredictionsForAllModules = async () => {
  return await apiRequest(() => axiosInstance.get("api/progress/predict-all-modules"));
};
