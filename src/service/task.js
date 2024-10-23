import { apiRequest, axiosInstance } from "./core/axios";

// Function to get task recommendations based on performance type and struggling areas
export const getTaskRecommendations = async (data) => {
  // console.log('Request received at backend:', req.body);
  return await apiRequest(() => axiosInstance.post("api/task/recommend-task", data));
};

export const deleteSubtaskFromTaskController = async (data) => {
  // console.log('Request received at backend:', req.body);
  return await apiRequest(() => axiosInstance.post("api/task/delete-subtask", data));
};

export const getCompletedTasksByUserIdController = async (data) => {
  // console.log('Request received at backend:', req.body);
  return await apiRequest(() => axiosInstance.get("api/task/completed-tasks", data));
};
