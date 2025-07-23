import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params = {}) => {
    const response = await api.getAllMovies({
      ...params,
      sort: params.sort || 'year',
      order: params.order || 'DESC',
      limit: 100,
      offset: 0,
    });

    if (response.data.status !== 1 || !Array.isArray(response.data.data)) {
      throw new Error('Сервер повернув помилку або неправильні дані');
    }

    return response.data.data;
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, updatedData }) => {
    const response = await api.updateMovie(id, updatedData);
    return response.data;
  }
);

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  const response = await api.addMovie(movieData);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await api.deleteMovie(id);
  return id;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter((movie) => movie.id !== action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((movie) => movie.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      });
  },
});

export default moviesSlice.reducer;
