import { apiRequest, axiosInstance } from "./core/axios";

export const getQuizPerformanceData = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/analytics/quiz-performance`));
};
