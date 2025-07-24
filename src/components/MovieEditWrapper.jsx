import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/api';
import MovieEdit from '../pages/MovieEdit';

const MovieEditWrapper = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieById(id)
      .then((res) => {
        console.log('Movie edit load response:', res);
        if (res.data.status === 1) {
          setMovie(res.data.data);
        } else {
          console.warn('Помилка завантаження фільму:', res.data);
          setError('Фільм не знайдено');
        }
      })
      .catch((err) => {
        console.error('Запит з помилкою:', err);
        setError('Помилка завантаження');
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Завантаження...</p>;

  return <MovieEdit movie={movie} />;
};

export default MovieEditWrapper;
