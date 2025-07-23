import { useState } from 'react';
import { importMovies } from '../services/api';
import { fetchMovies } from '../features/movies/moviesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;

    try {
      const text = await file.text();

      const cleaned = text
        .split('\n')
        .map((line) => line.trimEnd())
        .filter((line, idx, arr) => {
          const isEmpty = line.trim() === '';
          const prevEmpty = idx > 0 && arr[idx - 1].trim() === '';
          return !isEmpty || !prevEmpty;
        })
        .join('\n');

      const cleanedBlob = new Blob([cleaned], { type: 'text/plain' });
      const cleanedFile = new File([cleanedBlob], file.name, { type: 'text/plain' });

      const formData = new FormData();
      formData.append('movies', cleanedFile);

      const res = await importMovies(formData);

      if (res.data.status === 1) {
        alert('Імпорт успішний');
        dispatch(fetchMovies());
        navigate('/');
      } else {
        alert('Помилка імпорту: ' + JSON.stringify(res.data));
      }
    } catch (err) {
      alert('Не вдалося імпортувати');
      console.error(err);
    }
  };

  return (
    <form>
      <h3>Імпорт з файлу</h3>

      <div>
        <label>Оберіть TXT файл з фільмами:</label>
        <input type="file" accept=".txt" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button type="button" onClick={handleUpload} disabled={!file}>
        Завантажити
      </button>
    </form>
  );
};

export default FileUploader;
