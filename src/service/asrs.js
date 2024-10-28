import { apiRequest, axiosInstance } from "./core/axios";

// Service to create a new ASRS result
export const createAssrsResult = async (data) => {
  return await apiRequest(() => axiosInstance.post("/api/assrs", data));
};

// Service to check if ASRS result exists for a user
export const checkAssrsResultExists = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/api/assrs/check${queryString ? `?${queryString}` : ""}`;
  return await apiRequest(() => axiosInstance.get(endpoint));
};

// Service to check if the existing ASRS result is older than 6 months
export const checkAssrsResultAge = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/api/assrs/check-age${queryString ? `?${queryString}` : ""}`;
  return await apiRequest(() => axiosInstance.get(endpoint));
};

// Service to update an existing ASRS result
export const updateAssrsResult = async (data) => {
  return await apiRequest(() => axiosInstance.patch("/api/assrs", data));
};

// Service to retrieve the ASRS result by user ID
export const getAssrsResultByUser = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/api/assrs/getByUser${queryString ? `?${queryString}` : ""}`;
  return await apiRequest(() => axiosInstance.get(endpoint));
};

// Service to retrieve alternate ASRS questions
export const getAlternativeAssrsQuestions = async () => {
  return await apiRequest(() => axiosInstance.get("/api/assrs/alternate-questions"));
};
