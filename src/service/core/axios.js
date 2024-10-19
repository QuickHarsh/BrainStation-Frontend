import { toast } from "react-toastify";
import axios from "axios";
import { refresh } from "../auth";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BRAINSTATION_BE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request URL contains 'ontology'
    if (config.url.includes("/api/ontology/file")) {
      config.headers["Accept"] = "text/markdown";
      config.responseType = "text";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || import.meta.env.VITE_BRAINSTATION_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/api/auth/login") ||
      originalRequest.url.includes("/api/auth/refresh") ||
      originalRequest.url.includes("/reset-password")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refresh();

        const { access_token } = res.data;
        localStorage.setItem("token", access_token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        if (!originalRequest.url.includes("/reset-password")) {
          console.log("Redirecting to login page", originalRequest.url.includes("/reset-password"));
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export const apiRequest = async (request) => {
  const response = await request()
    .then((res) => ({
      ...res.data,
      success: true
    }))
    .catch((error) => {
      const message = error.response.data.message;
      if (error.response.status === 403) {
        if (localStorage.getItem("token")) {
          toast.error(message);
        }
      } else {
        toast.error(message);
      }
      return {
        success: false,
        message: message
      };
    });

  return response;
};

export const ontologyApiRequest = async (request) => {
  const response = await request()
    .then((res) => ({
      ...res,
      success: true
    }))
    .catch((error) => {
      const message = error.response.data.message;
      if (error.response.status === 403) {
        if (localStorage.getItem("token")) {
          toast.error(message);
        }
      } else {
        toast.error(message);
      }
      return {
        success: false,
        message: message
      };
    });

  return response;
};
