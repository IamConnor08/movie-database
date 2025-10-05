import movieTrailers from "./movieTrailersData";


function MovieTrailers() {
    return (
        <div className="trailers-container">
            {movieTrailers.map((trailer) => (
                <div className="movie-trailer" key={trailer.id}>
                    <iframe
                        src={trailer.src}
                        title={trailer.title}
                        allowFullScreen
                    />
                    <p>{trailer.title}</p>
                </div>
            ))}
        </div>
    );
}

export default MovieTrailers;