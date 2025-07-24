import { useState, useRef } from 'react';
import { importMovies } from '../services/api';
import { fetchMovies } from '../features/movies/moviesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
    } else {
      alert('Будь ласка, оберіть файл у форматі .txt');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const text = await file.text();
      const cleaned = text.split('\n').map(line => line.trimEnd()).filter(Boolean).join('\n\n');
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
        alert('Помилка імпорту: неправильний тип або формат файлу');
      }
    } catch (err) {
      alert('Не вдалося імпортувати файл.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="form-card">
        <div className="uploader-header">
          <h3>Імпорт фільмів з файлу</h3>
          <p>Завантажте TXT файл для масового додавання</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} onDragEnter={handleDrag}>
          <input
            ref={inputRef}
            type="file"
            id="file-input"
            accept=".txt"
            className="hidden"
            onChange={handleChange}
          />
          <div
            className={`drop-zone ${isDragActive ? 'active' : ''}`}
            onClick={() => inputRef.current.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="drop-zone-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="icon icon-tabler icons-tabler-outline icon-tabler-download"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 11l5 5l5 -5" />
                <path d="M12 4l0 12" />
              </svg>
            </div>
            <p className="drop-zone-text">
              <strong>Натисніть щоб обрати файл</strong> або перетягніть його сюди
            </p>
          </div>
        </form>

        {file && (
          <div className="file-info">
            <span>Обраний файл:</span>
            <strong>{file.name}</strong>
          </div>
        )}

        <div className="format-info">
          <strong>Формат файлу:</strong>
          <p>Кожен фільм та його властивості мають бути на окремих рядках, а фільми розділені порожнім рядком.</p>
          <code>
            Title: Назва фільму<br />
            Release Year: Рік<br />
            Format: Формат<br />
            Stars: Актор1, Актор2
          </code>
        </div>

        <div className="uploader-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={!file || loading}
            style={{ minWidth: '180px' }}
          >
            {loading ? (
              <>
                <span className="loading-spinner" style={{ marginRight: '8px' }}></span>
                Завантаження...
              </>
            ) : (
              'Імпортувати фільми'
            )}
          </button>
        </div>
      </div>
  );
};

export default FileUploader;