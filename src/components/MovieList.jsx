import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../features/movies/moviesSlice';
import { Link } from 'react-router-dom';
import { showModal } from '../features/modal/modalSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.movies);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchActor, setSearchActor] = useState('');
  const [sortAlpha, setSortAlpha] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


  const handleDelete = (id) => {
    dispatch(showModal({
      title: 'Видалити фільм?',
      message: 'Ви впевнені, що хочете видалити цей фільм?',
      targetId: id,
    }));
  };

  const handleFilter = () => {
    dispatch(
      fetchMovies({
        sort: sortAlpha ? 'title' : 'year',
        order: 'ASC',
        ...(searchTitle && { title: searchTitle }),
        ...(searchActor && { actor: searchActor }),
      })
    );
  };

  const handleReset = () => {
    setSearchTitle('');
    setSearchActor('');
    setSortAlpha(false);
    dispatch(fetchMovies());
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <Link to="/add">
          <button>Додати фільм</button>
        </Link>
      </div>

      <h2>Пошук</h2>

      <div className="search-bar">
        <input
          placeholder="Пошук за назвою"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          placeholder="Пошук за актором"
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={sortAlpha}
            onChange={(e) => setSortAlpha(e.target.checked)}
          />{' '}
          Сортувати за назвою
        </label>
        <button onClick={handleFilter}>Застосувати</button>
        <button onClick={handleReset}>Скинути</button>
      </div>

      {loading && <p>Завантаження...</p>}
      {error && <p>Помилка: {error}</p>}

      <h2>Список фільмів</h2>

      <div className="movie-grid">
        {list && list.length > 0 ? (
          list.map((movie, index) => {
            const key = movie.id ?? `temp-${index}`;
            return (
              <div className="movie-card" key={key}>
                <h3>{movie.title}</h3>
                <p className="meta">
                  {movie.year} • {movie.format}
                </p>
                <div className="actions">
                  <Link to={`/movies/${movie.id}`} className="button-link small">Деталі</Link>
                  <button onClick={() => handleDelete(movie.id)} className="small">Видалити</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Немає фільмів для відображення</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
