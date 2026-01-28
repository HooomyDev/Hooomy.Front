import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7111/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authClient = axios.create({
  baseURL: "https://localhost:5001/auth",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { apiClient, authClient };
