import axios from "axios";
import { backendDomin, getAuthHeaders } from "../common/index";

const api = axios.create({
  baseURL: backendDomin,
});

// optional: attach token before each request
api.interceptors.request.use((config) => {
  const headers = getAuthHeaders();
  config.headers = { ...(config.headers || {}), ...headers };
  return config;
});

export default api;
