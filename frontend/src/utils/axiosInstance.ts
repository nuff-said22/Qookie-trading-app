import axios from 'axios';
import { useRouter } from 'next/navigation'; // For redirects (client-side)

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend
});

// Request interceptor: Add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Clear invalid token
      if (typeof window !== 'undefined') { // Client-side only
        const router = useRouter();
        router.push('/'); // Redirect to login
      }
      alert('Session expired or unauthorized. Please log in.');
    }
    return Promise.reject(error);
  }
);

export default api;