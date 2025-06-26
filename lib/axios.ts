import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // set in .env.local
  withCredentials: true, // if FastAPI uses cookies
});

export default api;


api.interceptors.request.use((config) => {
    // Add token from localStorage or cookie
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        // Redirect to login, etc.
      }
      return Promise.reject(err);
    }
  );
  