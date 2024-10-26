import { apiRequest, axiosInstance } from "./core/axios";

export const getTaskRecommendations = async (data) => {
  return await apiRequest(() => axiosInstance.post("api/task/recommend-task", data));
};

export const deleteSubtaskFromTaskController = async (data) => {
  return await apiRequest(() => axiosInstance.post("api/task/delete-subtask", data));
};

export const getCompletedTasks = async (data) => {
  return await apiRequest(() => axiosInstance.get("api/task/completed-tasks", data));
};

export const getCompletedTasksCount = async (data) => {
  return await apiRequest(() => axiosInstance.get("api/task/completed-tasks-count", data));
};

export const getLecturePerformance = async (data) => {
  return await apiRequest(() => axiosInstance.get("api/progress/lecture-performance", data));
};

export const getStudentCumulativeAverage = async (data) => {
  return await apiRequest(() => axiosInstance.get("api/progress/cumulative-average", data));
};

export const getStudentAlerts = async (data) => {
  return await apiRequest(() => axiosInstance.get("api/progress/alerts", data));
};
