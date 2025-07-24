import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieById(id)
      .then((res) => {
        if (res.data.status === 1) {
          setMovie(res.data.data);
        } else {
          setError('Фільм не знайдено');
        }
      })
      .catch(() => setError('Помилка завантаження'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center" style={{ marginTop: 'var(--space-12)' }}>
          <div className="loading-spinner" style={{ margin: '0 auto var(--space-4) auto' }}></div>
          <p>Завантаження...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-center" style={{ marginTop: 'var(--space-12)' }}>
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            padding: 'var(--space-6)', 
            borderRadius: 'var(--radius-xl)',
            display: 'inline-block',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/" className="btn btn-primary">
              Повернутися до списку
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movie-details">
        <div className="movie-hero">
          <h1 className="movie-title">{movie.title}</h1>
        </div>

        <div className="movie-content">
          <div className="movie-stats">
            <div className="stat-item">
              <span className="stat-value">{movie.year}</span>
              <span className="stat-label">Рік випуску</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-value">{movie.format}</span>
              <span className="stat-label">Формат</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-value">{movie.actors?.length || 0}</span>
              <span className="stat-label">Акторів</span>
            </div>
          </div>
          
          {movie.actors && movie.actors.length > 0 && (
            <div>
              <h3 style={{ 
                marginBottom: 'var(--space-4)', 
                color: 'var(--primary)',
                borderBottom: '2px solid var(--border-color)',
                paddingBottom: 'var(--space-2)'
              }}>
                В головних ролях
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-8)'
              }}>
                {movie.actors.map((actor) => (
                  <div
                    key={actor.id}
                    style={{
                      background: 'var(--bg-tertiary)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      textAlign: 'center',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {actor.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-4)', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 'var(--space-8)'
          }}>
            <Link 
              to={`/movies/${movie.id}/edit`}
              className="btn btn-primary"
            >
              Редагувати
            </Link>
            
            <Link 
              to="/"
              className="btn btn-secondary"
            >
              Назад до списку
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;