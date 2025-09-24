import axios from 'axios';
import { getToken } from './get-token';

const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL || '/api';

const http = axios.create({
  baseURL: baseURL,  // Use import.meta.env instead
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Set up an interceptor for the request to add the Authorization header
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.Authorization = `wiki ${token ? token : ''}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
