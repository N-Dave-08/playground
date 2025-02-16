// Main authentication service for handling user authentication operations
import axiosInstance from '@/lib/axios';

const API_URL = '/auth';

// Interface for login request payload
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for registration that extends login credentials with additional name field
export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

// Interface defining the structure of authentication response from the server
export interface AuthResponse {
  token: string;  // JWT token for authenticated requests
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const authService = {
  /**
   * Authenticates user with email and password
   * On successful login:
   * 1. Makes POST request to /auth/login
   * 2. Stores JWT token in localStorage
   * 3. Stores user data in localStorage
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Registers a new user with name, email and password
   * On successful registration:
   * 1. Makes POST request to /auth/register
   * 2. Stores JWT token in localStorage
   * 3. Stores user data in localStorage
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post(`${API_URL}/register`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logs out the current user by:
   * 1. Removing JWT token from localStorage
   * 2. Removing user data from localStorage
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Retrieves the current authenticated user's data from localStorage
   * Returns null if no user is authenticated
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  /**
   * Retrieves the current JWT token from localStorage
   * Used by axios interceptor for authenticated requests
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Checks if a user is currently authenticated
   * Returns true if a valid token exists in localStorage
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

export default authService;
