import React from 'react';
import MovieForm from '../components/MovieForm';
import FileUploader from '../components/FileUploader';
import { Link } from 'react-router-dom';

const AddMoviePage = () => {
  return (
    <div className="container">
      <MovieForm />
      <FileUploader />
      <Link to="/" className="btn btn-primary btn-primary-left">Назад до списку</Link>
    </div>
  );
};

export default AddMoviePage;
