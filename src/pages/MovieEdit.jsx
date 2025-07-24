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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setYear(movie.year || '');
      setFormat(movie.format || 'DVD');
      setActors(movie.actors?.map((a) => a.name).join(', ') || '');
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="container">
        <div className="text-center" style={{ marginTop: 'var(--space-12)' }}>
          <div className="loading-spinner" style={{ margin: '0 auto var(--space-4) auto' }}></div>
          <p>Завантаження фільму...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    const movieData = { title, year, format, actors };
    const validationError = validateMovie(movieData);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await dispatch(updateMovie({
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
    } catch (err) {
      setError('Помилка при оновленні фільму');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-2)' }}>
            Редагувати фільм
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Оновіть інформацію про фільм "{movie.title}"
          </p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            padding: 'var(--space-4)', 
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form>
          <div className="form-group">
            <label htmlFor="edit-title">Назва:</label>
            <input
              id="edit-title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введіть назву фільму"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-year">Рік:</label>
            <input
              id="edit-year"
              type="number"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Наприклад: 2023"
              min="1900"
              max="2030"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-format">Формат:</label>
            <select
              id="edit-format"
              className="form-control"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              disabled={loading}
            >
              {allowedFormats.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-actors">Актори (через кому):</label>
            <input
              id="edit-actors"
              className="form-control"
              value={actors}
              onChange={(e) => setActors(e.target.value)}
              placeholder="Наприклад: Том Хенкс, Мерил Стріп, Роберт Де Ніро"
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading}
              style={{ minWidth: '120px' }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" style={{ marginRight: 'var(--space-2)' }}></span>
                  Збереження...
                </>
              ) : (
                'Зберегти'
              )}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/movies/${movie.id}`)}
              disabled={loading}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieEdit;