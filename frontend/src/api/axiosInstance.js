import axios from "axios";
import { backendDomin, getAuthHeaders } from "../common/index";

const api = axios.create({
  baseURL: backendDomin, // Automatically prepend backend domain
});

// Auto attach token before each API call
api.interceptors.request.use((config) => {
  const headers = getAuthHeaders();
  config.headers = { ...(config.headers || {}), ...headers };
  return config;
});

export default api;
