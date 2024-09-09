import { apiRequest, axiosInstance } from "./core/axios";

export const getQuestions = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/questions${queryString ? `?${queryString}` : ""}`;

  console.log("Requesting questions from:", endpoint);

  return await apiRequest(() => axiosInstance.get(endpoint));
};

export const getOneQuestion = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/questions/${id}`));
};

export const flagQuestion = async (id) => {
  return await apiRequest(() => axiosInstance.post(`/api/questions/${id}/flag`));
};
