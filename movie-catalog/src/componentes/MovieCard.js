function MovieCard({ movie, onDetails, onToggleFavorite, isFavorite }) {
  return (
    <div className="card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270?text=Sem+Imagem'}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <div className="badge">{movie.Year}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="button" onClick={() => onDetails && onDetails(movie)}>Detalhes</button>
        <button className="button" onClick={() => onToggleFavorite && onToggleFavorite(movie)}>
          {isFavorite ? '★ Favorito' : '☆ Favoritar'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard