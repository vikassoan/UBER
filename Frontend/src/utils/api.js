import axios from 'axios';

// Get the base URL with fallback
const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl || baseUrl === 'undefined') {
    console.warn('VITE_BASE_URL is not set, using fallback: http://localhost:3000');
    return 'http://localhost:3000';
  }
  return baseUrl;
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      
      // Determine redirect path based on current location
      const currentPath = window.location.pathname;
      if (currentPath.includes('captain')) {
        window.location.href = '/captain-login';
      } else {
        window.location.href = '/user-login';
      }
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;