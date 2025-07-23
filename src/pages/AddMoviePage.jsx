import React from 'react';
import MovieForm from './MovieForm';
import FileUploader from '../components/FileUploader';
import { Link } from 'react-router-dom';

const AddMoviePage = () => {
  return (
    <div className="container">
      <h2>Додати фільм</h2>
      <MovieForm />
      <FileUploader />
      <Link to="/" className="button-link">Назад до списку</Link>
    </div>
  );
};

export default AddMoviePage;
