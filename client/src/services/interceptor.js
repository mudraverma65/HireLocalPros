import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.loginNeeded) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    console.error("Response Error Interceptor:", error);
    return Promise.reject(error);
  }
);

export default api;
