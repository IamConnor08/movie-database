import MoviePoster from './MoviePoster';
import './TrendingShows.css';
import tempShows from './tempShows.json';

function TrendingShows() {
    return(
        <div className="trending-shows">
            <h2>Trending TV Shows</h2>
            <div className="scroller">
                {tempShows.map((show) => (
                    <MoviePoster key={show.id} movie={show} />
                ))}
            </div>
        </div>
    );
}

export default TrendingShows;