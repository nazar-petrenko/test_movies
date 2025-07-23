import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/moviesSlice';
import { validateMovie, allowedFormats } from '../utils/validateMovie';
import { useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actors, setActors] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = { title, year, format, actors };

    const validationError = validateMovie(movieData);
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch(addMovie({
      ...movieData,
      year: Number(year),
      actors: actors.split(',').map((a) => a.trim()).filter(Boolean),
    }));

    alert('Фільм додано успішно');

    setTitle('');
    setYear('');
    setFormat('');
    setActors('');
    setError('');

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Додати фільм</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Назва:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Рік:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>Формат:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} required>
          <option value="" disabled>--Оберіть тип формату--</option> 
          {allowedFormats.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Актори (через кому):</label>
        <input value={actors} onChange={(e) => setActors(e.target.value)} required />
      </div>
      <button type="submit">Додати фільм</button>
    </form>
  );
};

export default MovieForm;
