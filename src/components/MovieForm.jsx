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

    const cleanedActors = actors.split(',').map((a) => a.trim()).filter(Boolean);

    const movieDataToValidate = {
      title,
      year,
      format,
      actors: cleanedActors, 
    };
    
    const validationError = validateMovie(movieDataToValidate);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch(addMovie({
      title,
      year: Number(year),
      format,
      actors: cleanedActors, 
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
      <div className="form-card">
        <h2>Додати фільм</h2>
        
        {error && (
          <div style={{ 
            backgroundColor: 'var(--error, #fee2e2)', 
            color: 'var(--error-dark, #991b1b)', 
            padding: 'var(--space-4)', 
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
            border: '1px solid var(--error, #fecaca)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Назва:</label>
            <input
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Введіть назву фільму"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Рік:</label>
            <input
              id="year"
              type="number"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              placeholder="Наприклад: 1999"
              min="1900"
              max="2021"
            />
          </div>

          <div className="form-group">
            <label htmlFor="format">Формат:</label>
            <select
              id="format"
              className="form-control"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              required
            >
              <option value="" disabled>--Оберіть тип формату--</option>
              {allowedFormats.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="actors">Актори (через кому):</label>
            <input
              id="actors"
              className="form-control"
              value={actors}
              onChange={(e) => setActors(e.target.value)}
              required
              placeholder="Наприклад: Том Хенкс, Мерил Стріп"
            />
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <button type="submit" className="btn btn-primary">
              Додати фільм
            </button>
          </div>
        </form>
      </div>
  );
};

export default MovieForm;