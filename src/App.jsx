import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieEditWrapper from './components/MovieEditWrapper';
import AddMoviePage from './pages/AddMoviePage';
import UniversalModal from './components/UniversalModal'; 

function App() {
  return (
    <>
      <Router>
        <UniversalModal />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<AddMoviePage />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/edit" element={<MovieEditWrapper />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
