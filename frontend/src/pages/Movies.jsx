import { useState } from "react";
import Filter from "../components/movieFilter"; 

function Movies() {
  const [movies, setMovies] = useState([]);

  const handleFilteredMovies = (filteredMovies) => {
    setMovies(filteredMovies);
  };

  return (
    <div>
      <Filter onFilter={handleFilteredMovies} />

      <div className="movie-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {movies.length === 0 ? (
          <p>No movies found. Try selecting a genre and clicking Search.</p>
        ) : (
          movies.map((m) => (
            <div key={m.id} className="movie-card" style={{ width: "200px" }}>
              <img
                src={m.poster}
                alt={m.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h4>{m.title}</h4>
              <p style={{ color: "gray" }}>{m.genre}</p>
              <p> {m.imdb_rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
