import axios from 'axios';
import appConfig from '../config';

const api = axios.create({
  baseURL: appConfig.apiUrl,
});

api.interceptors.request.use((requestConfig) => {


  if (appConfig.authToken) {

    requestConfig.headers.Authorization = appConfig.authToken;
  }

  return requestConfig;
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
