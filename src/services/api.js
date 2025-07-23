import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use((config) => {
  config.headers.Authorization = AUTH_TOKEN; 
  return config;
});
export const getAllMovies = (params) => api.get('/movies', { params });
export const deleteMovie = (id) => api.delete(`/movies/${id}/`);
export const getMovieById = (id) => api.get(`/movies/${id}/`);
export const addMovie = (movieData) => api.post('/movies/', movieData);
export const importMovies = (formData) =>
  api.post('/movies/import/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateMovie = (id, updatedData) =>
  api.patch(`/movies/${id}/`, updatedData);