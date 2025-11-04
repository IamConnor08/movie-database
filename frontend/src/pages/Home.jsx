import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';
import TopRatedMovies from '../components/TopRatedMovies';
import UpcomingFilms from '../components/UpcomingFilms'; 
import TrendingShows from '../components/TrendingShows';



function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
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
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <TopRatedMovies />
      <UpcomingFilms />
      <TrendingShows />  
    </div>
  );
}

export default Home;