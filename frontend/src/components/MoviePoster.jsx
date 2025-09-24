function MoviePoster({ movie }) {
    return(
        <div className="movie-poster">
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.title}</p>
        </div>
    );
}

export default MoviePoster