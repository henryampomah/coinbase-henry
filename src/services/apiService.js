import axios from 'axios';

const API_BASE_URL = 'https://interim-assessment-22047836-1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,        // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;