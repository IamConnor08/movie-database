import "./UpcomingFilms.css"
import movieTrailers from "./movieTrailersData";

function UpcomingFilms() {
    return(
        <div className="upcoming-films">
            <h2>New Trailers</h2>
            <div className="scroller">
                {movieTrailers.map((trailer) => (
                    <div className="trailer-card" key={trailer.id}>
                        <iframe
                        width="300"
                        height="170"
                        src={trailer.src}
                        title={trailer.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        ></iframe>
                        <p>{trailer.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingFilms;