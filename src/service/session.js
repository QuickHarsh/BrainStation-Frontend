import { apiRequest, axiosInstance } from "./core/axios";

// Function to save the session data to the backend
export const saveSession = async (sessionData) => {
  return await apiRequest(() => axiosInstance.post("/api/sessions", sessionData));
};

// Function to get session by ID
export const getSessionById = async (sessionId) => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/${sessionId}`));
};

// Function to get all sessions by the authenticated user
export const getSessionsByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/user`));
};

// Function to get all sessions by the authenticated user for a specific module
export const getSessionsByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/userByModule`));
};

// Function to get start and end times of sessions per module for the authenticated user
export const getStartEndTimesByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/start-end-times`));
};

// Function to get total focus time by the authenticated user per module
export const getTotalFocusTimeByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/total-focus-time`));
};

// Function to get average focus time by the authenticated user per module
export const getAverageFocusTimeByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/average-focus-time`));
};

// Function to get session data for the authenticated user
export const getSessionDataByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/sessionData`));
};

// Function to get the average focus time by the authenticated user (without module ID)
export const getAverageFocusTimeByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/average-focus-time-by-user`));
};

// Function to get the total session duration by the authenticated user
export const getTotalSessionDurationByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/total-session-duration-by-user`));
};

export const getClassificationFeedback = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/classification-feedback`));
};
