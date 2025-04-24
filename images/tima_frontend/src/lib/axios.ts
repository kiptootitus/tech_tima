// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Bearer token automatically if present
api.interceptors.request.use(
  (config: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Optional: Handle expired token
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // You can redirect or logout user here
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login'; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
