import { useEffect, useMemo, useState } from 'react';
import SearchBar from './componentes/SearchBar';
import MovieCard from './componentes/MovieCard';
import MovieModal from './componentes/MovieModal';
import moviesData from './data/movies.json';
import './styles.css';


export default function App() {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    setMovies(moviesData); // carrega do JSON local
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filtered = useMemo(() => {
    if (!term) return movies;
    return movies.filter(m =>
      m.Title.toLowerCase().includes(term.toLowerCase())
    );
  }, [term, movies]);

  function handleSearch(t) {
    setTerm(t);
  }

  function toggleFavorite(movie) {
    setFavorites(prev => {
      const exists = prev.some(f => f.imdbID === movie.imdbID);
      if (exists) return prev.filter(f => f.imdbID !== movie.imdbID);
      return [...prev, movie];
    });
  }

  const isFavorite = (movie) => favorites.some(f => f.imdbID === movie.imdbID);

  return (
    <div className="container">
      <div className="topbar">
        <h1>🎬 Catálogo de Filmes</h1>
        <div className="favs">Favoritos: <strong>{favorites.length}</strong></div>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid">
        {filtered.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={setSelected}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(movie)}
          />
        ))}
      </div>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

