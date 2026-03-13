import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
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
  baseURL: "http://localhost:5005",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  const params = new URLSearchParams();
  params.append("client_id", "react-password-client");
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);

  try {
    const response = await axios.post(
      "http://localhost:5005/connect/token",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const result = response.data;
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);

    return result.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // если 401 и не пробовали обновить
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, authClient };
