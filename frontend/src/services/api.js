import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // make sure this matches your Express backend
});

// Optional: attach token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
