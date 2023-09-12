import axios from "axios";
import { generateSessionToken } from "./generateSessionToken";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseAxios = axios.create({ baseURL });

// Interceptor to add a session if it doesn't exist
baseAxios.interceptors.request.use(
  (config) => {
    const userHasSession = sessionStorage.getItem("user");
    if (!userHasSession) {
      const sessionToken = generateSessionToken();
      sessionStorage.setItem("user", sessionToken);
    }

    // Add Toke request headers
    const sessionToken = sessionStorage.getItem("user");
    if (sessionToken) {
      config.headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseAxios;
