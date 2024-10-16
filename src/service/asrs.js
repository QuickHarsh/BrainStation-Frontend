import axios from "axios";

const API_URL = `${import.meta.env.VITE_BRAINSTATION_BE_URL}/api/assrs`;

// Service to create a new ASRS result
export const createAssrsResult = async (userId, questions) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      userId,
      ...questions // Spread the questions into the request body
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating ASRS result");
  }
};

// Service to check if ASRS result exists for a user
export const checkAssrsResultExists = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/check`);
    return response.data.exists;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error checking ASRS result existence");
  }
};

// Service to check if the existing ASRS result is older than 6 months
export const checkAssrsResultAge = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/check-age`);
    return response.data.isOlderThanSixMonths;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error checking ASRS result age");
  }
};

// Service to update an existing ASRS result
export const updateAssrsResult = async (userId, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating ASRS result");
  }
};

// Service to retrieve the ASRS result by user ID
export const getAssrsResultByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/getByUser/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error retrieving ASRS result");
  }
};
