import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movies/moviesSlice';
import { Link } from 'react-router-dom';
import { showModal } from '../features/modal/modalSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.movies);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchActor, setSearchActor] = useState('');
  const [sortAlpha, setSortAlpha] = useState(false);

  const [searchErrors, setSearchErrors] = useState({ title: '', actor: '' });

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(showModal({
      title: 'Видалити фільм?',
      message: 'Ви впевнені, що хочете видалити цей фільм? Цю дію не можна буде скасувати.',
      targetId: id,
      confirmText: 'Так, видалити',
      cancelText: 'Ні, залишити'
    }));
  };

  const handleFilter = () => {
    const errors = {};
    if (searchTitle && searchTitle.length < 2) {
      errors.title = 'Пошук за назвою вимагає мінімум 2 символи.';
    }
    if (searchActor && searchActor.length < 2) {
      errors.actor = 'Пошук за актором вимагає мінімум 2 символи.';
    }

    setSearchErrors(errors);

    if (Object.keys(errors).length > 0) return;

    dispatch(
      fetchMovies({
        sort: sortAlpha ? 'title' : undefined,
        order: sortAlpha ? 'ASC' : undefined,
        ...(searchTitle && { title: searchTitle }),
        ...(searchActor && { actor: searchActor }),
      })
    );
  };

  const handleReset = () => {
    setSearchTitle('');
    setSearchActor('');
    setSortAlpha(false);
    setSearchErrors({ title: '', actor: '' });
    dispatch(fetchMovies());
  };

  return (
    <div className="container">
      <div className="page-actions-header">
        <Link to="/add" className="btn btn-primary">Додати фільм</Link>
      </div>

      <div className="search-section">
        <h2>Пошук та фільтрація</h2>
        <div className="search-bar">
          <div className="search-input">
            <input
              className="form-control" 
              placeholder="Пошук за назвою"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              style={searchErrors.title ? { borderColor: 'var(--error)' } : {}}
            />
            {searchErrors.title && <p style={{color: 'var(--error)', fontSize: '0.8rem', marginTop: 'var(--space-1)', marginBottom: 0}}>{searchErrors.title}</p>}
          </div>
          <div className="search-input">
            <input
              className="form-control"
              placeholder="Пошук за актором"
              value={searchActor}
              onChange={(e) => setSearchActor(e.target.value)}
              style={searchErrors.actor ? { borderColor: 'var(--error)' } : {}}
            />
            {searchErrors.actor && <p style={{color: 'var(--error)', fontSize: '0.8rem', marginTop: 'var(--space-1)', marginBottom: 0}}>{searchErrors.actor}</p>}
          </div>
          <button className="btn btn-primary" onClick={handleFilter}>Застосувати</button>
          <button className="btn btn-secondary" onClick={handleReset}>Скинути</button>
        </div>
        
        <div className="search-filters">
          <div className="form-group" style={{ marginBottom: 0, display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="sortAlphaCheckbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              style={{ marginRight: 'var(--space-2)' }}
            />
            <label htmlFor="sortAlphaCheckbox" style={{ marginBottom: 0, fontWeight: 'normal' }}>
              Сортувати за назвою (A-Z)
            </label>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center" style={{ padding: 'var(--space-8)' }}>
          <div className="loading-spinner"></div>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-secondary)' }}>Завантаження фільмів...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="text-center" style={{ color: 'var(--error)', padding: 'var(--space-8)' }}>
          <p>Помилка завантаження: {typeof error === 'string' ? error : 'Невідома помилка'}</p>
        </div>
      )}

      <h2 style={{ marginTop: 'var(--space-8)' }}>Список фільмів</h2>
      
      <div className="movie-grid">
        {!loading && list && list.length > 0 ? (
          list.map((movie, index) => {
            const key = movie.id ?? `temp-${index}`;
            return (
              <div className="movie-card" key={key}>
                <h3 className="movie-title">{movie.title}</h3>
                
                <div className="movie-meta">
                  {movie.year && <span className="meta-item">{movie.year}</span>}
                  {movie.format && <span className="meta-item">{movie.format}</span>}
                </div>
                
                {movie.actors && movie.actors.length > 0 && (
                  <p className="movie-description">
                    <strong>Актори:</strong> {movie.actors.map(actor => actor.name).join(', ')}
                  </p>
                )}
                
                <div className="movie-actions">
                  <Link 
                    to={`/movies/${movie.id}`} 
                    className="btn btn-secondary btn-small"
                  >
                    Деталі
                  </Link>
                  <button 
                    onClick={() => handleDelete(movie.id)} 
                    className="btn btn-primary btn-small"
                    style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          !loading && !error && (
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: 'var(--space-8)' }}>
              <p>Фільмів не знайдено. Спробуйте змінити критерії пошуку або додати новий фільм.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;