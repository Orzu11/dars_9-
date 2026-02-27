import axios from "axios";

const baseURL = import.meta.env.VITE_API || "https://behruzdev.uz/api/v1";

const instance = () => {
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default instance;