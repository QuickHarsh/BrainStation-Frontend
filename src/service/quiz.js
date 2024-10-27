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

export const getQuizFeedback = async (lectureId, data, params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/quizzes/feedback/${lectureId}${queryString ? `?${queryString}` : ""}`;

  return await apiRequest(() => axiosInstance.post(endpoint, data));
};

export const getQuizzesDueByToday = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/due`));
};

export const getQuizzesDueDetails = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/due/details`));
};

export const getAttemptQuiz = async (lectureId) => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/attempt/${lectureId}`));
};

export const getLectureQuizSummary = async (moduleId) => {
  return await apiRequest(() => axiosInstance.get(`/api/quizzes/summary/${moduleId}`));
};
