import tempDataBase from "./tempDataBase.json";
import MoviePoster from "./MoviePoster";

function TrendingMovies({}) {
    return (
        <div className="trending-movies">
            <h2>Trending Movies</h2>
            <div className="scroller">
                {tempDataBase.map((movie) => (
                    <MoviePoster key={movie.id} movie={movie} />
                ))}
            </div>
        </div>   
    );
}

export default TrendingMovies;