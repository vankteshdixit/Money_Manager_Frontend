import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // This ensures all requests (e.g., api.get('/login'))
  // will go to /api/login
  baseURL: '/api', 
});

// Add a request interceptor to include the auth token
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