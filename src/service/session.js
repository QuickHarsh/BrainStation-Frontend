import axios from "axios";

// Define the base URL for the API
const baseURL = `${import.meta.env.VITE_BRAINSTATION_BE_URL}/api/sessions/`;

// Function to save the session data to the backend
export const saveSession = async (sessionData) => {
  try {
    const response = await axios.post(`${baseURL}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error saving session data:", error);
    throw error;
  }
};

// Function to get session by ID
export const getSessionById = async (sessionId) => {
  try {
    const response = await axios.get(`${baseURL}${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session by ID:", error);
    throw error;
  }
};

// Function to get sessions by user ID
export const getSessionsByUser = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions by user:", error);
    throw error;
  }
};

// Function to get user data (related to sessions, if applicable)
export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}user/${userId}/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
