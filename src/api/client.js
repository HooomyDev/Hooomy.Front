import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7111/api",
  headers: { "Content-Type": "application/json" },
});

const authClient = axios.create({
  baseURL: "https://localhost:5001/auth",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { apiClient, authClient };
