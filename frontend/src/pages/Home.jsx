import { useState } from 'react';
import './Home.css';
import TrendingMovies from '../components/TrendingMovies';
import UpcomingFilms from '../components/UpcomingFilms'; 
import TrendingShows from '../components/TrendingShows';



function Home() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="home-container">
    
    

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies, TV shows, people..."
          value={query}
          onChange={handleChange}
          className="search-bar"
        />
        <button className="search-button">Search</button>
      </div>
      <TrendingMovies />
      <UpcomingFilms />
      <TrendingShows />
    
          
    </div>
  );
}

export default Home;
