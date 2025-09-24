import { useState } from 'react';
import Filter from '../components/filter';


function TVShows() {
  const [query, setQuery] = useState('');
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
    return (
    <div className="tvshows-container">

        <Filter />
        



    </div>
    );
}    
export default TVShows;