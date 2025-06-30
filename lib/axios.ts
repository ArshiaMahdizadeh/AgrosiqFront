import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default api;


api.interceptors.request.use((config) => {
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
      }
      return Promise.reject(err);
    }
  );
  