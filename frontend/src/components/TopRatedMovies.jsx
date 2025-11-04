import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./TopRated.css"

function TopRatedMovies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/movies/top")
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error("Failed", err));
    }, [])
    return (
        <div className="movies">
            <h2>Top Rated IMDb</h2>
            <div className="scroller">
                {movies.map((movie) => (
                    <Link
                        key = {movie.id}
                        to = {`/movie/${encodeURIComponent(movie.title)}`}
                        className="movie-card-link"
                    >
                        <div className="movie-card">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <p className="movie-title">{movie.title}</p>
                                <p className="movie-rating">⭐ {movie.rating}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopRatedMovies;