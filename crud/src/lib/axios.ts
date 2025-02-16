// Configure axios instance with default settings for the application
import axios from 'axios';
import authService from '@/services/authService';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // API server base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 * Automatically adds the JWT token to all outgoing requests if available
 * This ensures authenticated requests without manually adding the token each time
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Add token in Bearer format
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles authentication errors (401 Unauthorized)
 * Automatically logs out user when token is invalid or expired
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      // Clear auth state on 401 Unauthorized
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
