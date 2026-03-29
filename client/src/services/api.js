// ============================================
// api.js - Axios Instance with Auth Interceptor
// ============================================
// Creates a reusable Axios instance that auto-attaches
// the JWT token to every request.
// Reference: axios.create(), interceptors - reference-javascript.md
// ============================================

import axios from 'axios';

const resolveApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window === 'undefined') {
    return '/api';
  }

  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }

  return '/api';
};

const API = axios.create({
  baseURL: resolveApiBaseUrl(),
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
