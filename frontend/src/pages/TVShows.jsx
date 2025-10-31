import { useState } from "react";
import Filter from "../components/tvFilter";

function TVShows() {
  const [shows, setShows] = useState([]);

  const handleFilteredShows = (filteredShows) => {
    setShows(filteredShows);
  };

  return (
    <div className="tvshows-container">
      <h1>TV Shows</h1>
      <Filter onFilter={handleFilteredShows} />  {/* <-- THIS is key */}

      <div className="tv-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {shows.length === 0 ? (
          <p>No TV shows found. Try selecting a genre and clicking Search.</p>
        ) : (
          shows.map((s) => (
            <div key={s.id} className="tv-card" style={{ width: "200px" }}>
              <img src={s.poster} alt={s.title} style={{ width: "100%", borderRadius: "10px" }} />
              <h4>{s.title}</h4>
              <p style={{ color: "gray" }}>{s.genre}</p>
              <p> {s.imdb_rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TVShows;
