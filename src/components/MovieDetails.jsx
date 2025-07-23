import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieById(id)
      .then((res) => {
        if (res.data.status === 1) {
          setMovie(res.data.data);
        } else {
          setError('Фільм не знайдено');
        }
      })
      .catch(() => setError('Помилка завантаження'));
  }, [id]);

  if (error) return <p className="error-message">❌ {error}</p>;
  if (!movie) return <p className="loading-message">⏳ Завантаження...</p>;

  return (
    <div className="container">
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p><strong>Рік:</strong> {movie.year}</p>
        <p><strong>Формат:</strong> {movie.format}</p>

        <div>
          <p><strong>Актори:</strong></p>
          <ul>
            {movie.actors.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <Link to={`/movies/${movie.id}/edit`}>
            <button>Редагувати</button>
          </Link>
          <Link to="/">
            <button>Назад</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
