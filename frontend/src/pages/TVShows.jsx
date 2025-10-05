import { useState } from 'react';
import Filter from '../components/filter';


function TVShows() {
  const [query, setQuery] = useState('');
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
    return (

    <div className="tvshows-container">
      <h1>TV Shows</h1>

        <Filter />
        



    </div>
    );
}    
export default TVShows;