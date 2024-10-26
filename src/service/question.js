import { apiRequest, axiosInstance } from "./core/axios";

export const getQuestions = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/questions${queryString ? `?${queryString}` : ""}`;

  return await apiRequest(() => axiosInstance.get(endpoint));
};

export const getOneQuestion = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/questions/${id}`));
};

export const getQuestionsCountByModule = async (moduleId) => {
  return await apiRequest(() => axiosInstance.get(`/api/questions/count/${moduleId}`));
};

export const flagQuestion = async (id) => {
  return await apiRequest(() => axiosInstance.post(`/api/questions/${id}/flag`));
};
