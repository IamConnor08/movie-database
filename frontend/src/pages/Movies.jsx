import { useState } from 'react';
import Filter from '../components/movieFilter';


function Movies() {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
    setQuery(e.target.value);
    };
    return (

    <div className="movies-container">
        <h1>TV Shows</h1>

        <Filter />
        



    </div>
    );
}    
export default Movies;