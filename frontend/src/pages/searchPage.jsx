import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
    //gets title from url
    const { title } = useParams();
    //variable to hold movie data
    const [movie, setMovie] = useState(null);
    //variable for error msgs
    const [error, setError] = useState(null)

    //runs when url title changes
    useEffect(() => {
        //fetches movie data from Flask
        const fetchMovie = async () => {
            try {
                //sends request to flask with movie title parameter
                //encodeURIComponent allows for title with spaces
                const response = await fetch(`http://127.0.0.1:5000/movies?title=${encodeURIComponent(title)}`);
    
                //if Flask returns 404 no movie was found in either the db or OMDB api
                if (response.status == 404) {
                    setError("movie not found");
                    return;
                }
                //if movie found store it and display it
                if (response.status == 201 || response.status == 409 || response.ok) {
                    const data = await response.json();
                    setMovie(data)
                    //clear errors
                    setError(null)
                    return;
                }
                //error handle
                setError("error");
                setMovie(null)
                //network errors
            } catch (err) {
                setError("error")
                setMovie(null)
            }
        };
        //call when title changes
        fetchMovie();
    },  [title]);

        //render page
        return (
            <div style={{ padding: '1rem' }}>
                <h2>Search Results for "{title}"</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {movie && (
                    <div className="movie-result">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    {movie.poster && <img src={movie.poster} alt={movie.title} />}
                </div>
            )}
        </div>
    );
}
export default SearchResults;