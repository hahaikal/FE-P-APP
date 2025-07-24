import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

// Interceptor untuk menambahkan token JWT ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani respons error dari API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika error adalah 401 Unauthorized, token tidak valid atau kedaluwarsa
    if (error.response && error.response.status === 401) {
      // Hapus token dari storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiry');
      
      // Arahkan ke halaman login. Menggunakan window.location akan me-refresh
      // aplikasi dan membersihkan semua state React.
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;