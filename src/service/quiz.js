import { apiRequest, axiosInstance } from "./core/axios";

export const respondToQuiz = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/quizzes/respond`, data));
};

export const getQuizzes = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/quizzes${queryString ? `?${queryString}` : ""}`;

  return await apiRequest(() => axiosInstance.get(endpoint));
};

export const getUserScoreBasedOnLecture = async (userId, lectureId) => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/score/${userId}/${lectureId}`));
};

export const getQuizFeedback = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/quizzes/feedback`, data));
};

export const GetQuizzesDueByToday = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/due`));
};
