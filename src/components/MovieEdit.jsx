import { useDispatch } from 'react-redux';
import { updateMovie } from '../features/movies/moviesSlice';
import { useState, useEffect } from 'react';
import { validateMovie, allowedFormats } from '../utils/validateMovie';
import { useNavigate } from 'react-router-dom';

const MovieEdit = ({ movie }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actors, setActors] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setYear(movie.year || '');
      setFormat(movie.format || 'DVD');
      setActors(movie.actors?.map((a) => a.name).join(', ') || '');
    }
  }, [movie]);

  if (!movie) return <p className="loading-message">Завантаження фільму...</p>;

  const handleSave = () => {
    const movieData = { title, year, format, actors };

    const validationError = validateMovie(movieData);
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch(updateMovie({
      id: movie.id,
      updatedData: {
        title,
        year: Number(year),
        format,
        actors: actors.split(',').map((a) => a.trim()).filter(Boolean),
      },
    }));

    alert('Фільм оновлено успішно');
    navigate('/');
  };

  return (
    <form>
      <h3>Редагувати фільм</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Назва:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Рік:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>

      <div>
        <label>Формат:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          {allowedFormats.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Актори (через кому):</label>
        <input value={actors} onChange={(e) => setActors(e.target.value)} />
      </div>

      <button type="button" onClick={handleSave}>Зберегти</button>
    </form>
  );
};

export default MovieEdit;
