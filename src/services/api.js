import axios from 'axios';

// 1. Get the production backend URL from Vercel's environment variables
//    Vite exposes this as import.meta.env.VITE_API_BASE_URL
// 2. If it's not in production (npm run dev), it will be 'undefined',
//    so we fall back to '/api' to use your local proxy.
const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token (this is unchanged)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;