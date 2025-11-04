import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './searchPage.css'

function SearchMulti() {
    const { title } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:5000/movies/search?title=${encodeURIComponent(title)}`);
    
                if (response.status === 404) {
                    setError("No movies found");
                    setMovies([]);
                    setLoading(false);
                    return;
                }
                
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data);
                    setError(null);
                }
            } catch (err) {
                setError("Error fetching movies");
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [title]);

    return (
        <div className="search-results-page">
            <h2>Search Results for "{title}"</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="search-results-grid">
                {movies.map((movie) => (
                    <Link
                        key={movie.imdb_id}
                        to={`/movie/${encodeURIComponent(movie.title)}`}
                        className="search-result-card"
                    >
                        <img 
                            src={movie.poster !== 'N/A' ? movie.poster : '/placeholder.png'} 
                            alt={movie.title}
                            className="search-poster"
                        />
                        <div className="search-info">
                            <h3>{movie.title}</h3>
                            <p>{movie.year}</p>
                            <p className="movie-type">{movie.type}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SearchMulti;