import { apiRequest, axiosInstance } from "./core/axios";

export const generateLecture = async (data) => {
  return await apiRequest(() => axiosInstance.post("/api/lectures/upload", data));
};

export const getLecturesByOrganization = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/lectures${queryString ? `?${queryString}` : ""}`;

  return await apiRequest(() => axiosInstance.get(endpoint));
};

export const getLectureById = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/lectures/${id}`));
};

export const updateLecture = async (id, data) => {
  return await apiRequest(() => axiosInstance.put(`/api/lectures/${id}`, data));
};

export const deleteLecture = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/api/lectures/${id}`));
};
