import { useState } from 'react';
import './Filter.css';

function Filter({ onFilter }) {
  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "History", "Mystery", "Horror", "Music",
    "Fantasy", "Romance", "Science Fiction", "TV Movie", "War", "Western", "Thriller"
  ];

  const ratings = ["NR", "G", "PG", "PG-13", "R", "NC-17"];

  const [clickedGenres, setClickedGenres] = useState([]);
  const [clickedRatings, setClickedRatings] = useState([]);

  const genreClick = (genre) => {
    if (clickedGenres.includes(genre)) {
      setClickedGenres(clickedGenres.filter((g) => g !== genre));
    } else {
      setClickedGenres([...clickedGenres, genre]);
    }
  };

  const ratingClick = (rating) => {
    if (clickedRatings.includes(rating)) {
      setClickedRatings(clickedRatings.filter((r) => r !== rating));
    } else {
      setClickedRatings([...clickedRatings, rating]);
    }
  };

  const [checkboxOptions, setCheckboxOptions] = useState({
    streaming: false,
    free: false,
    rent: false,
    buy: false,
    ads: false
  });

  const handleCheckboxChange = (optionName) => {
    setCheckboxOptions((prev) => ({
      ...prev,
      [optionName]: !prev[optionName],
    }));
  };

  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

const handleSearch = async () => {
  if (clickedGenres.length === 0) {
    alert("Please select at least one genre");
    return;
  }

  // Build URL with all selected genres
  const queryString = clickedGenres.map(g => `genre=${encodeURIComponent(g)}`).join("&");

  try {
    const response = await fetch(`http://127.0.0.1:5000/filter?${queryString}`);
    const data = await response.json();
    console.log("Filtered movies:", data);
    if (onFilter) {
      onFilter(data);
    }
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
  }
};

  return (
    <div className="filter_panel card">
      <div className="filter">
        <h3>Filters</h3>
      </div>

      {/* Genres */}
      <div className="filter">
        <h3>Genres</h3>
        <div className="options-grid">
          {genres.map((genre) => (
            <button
              key={genre}
              className={clickedGenres.includes(genre) ? 'option-box selected' : 'option-box'}
              onClick={() => genreClick(genre)}
              type="button"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="filter">
        <h3>Rating</h3>
        <div className="options-grid">
          {ratings.map((rating) => (
            <button
              key={rating}
              className={clickedRatings.includes(rating) ? 'option-box selected' : 'option-box'}
              onClick={() => ratingClick(rating)}
              type="button"
            >
              {rating}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="filter">
        <h3>Availability</h3>
        {Object.keys(checkboxOptions).map((option) => (
          <div className="Checkbox" key={option}>
            <input
              type="checkbox"
              id={option}
              checked={checkboxOptions[option]}
              onChange={() => handleCheckboxChange(option)}
            />
            <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
          </div>
        ))}
      </div>

      {/* Sort */}
      <div className="filter">
        <h3>Sort</h3>
        <select name="sort" id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="trending">Trending</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="air-date">Release Date</option>
        </select>
      </div>

      {/* Search */}
      <div className="filter">
        <h3>Search</h3>
        <button
          onClick={handleSearch}
          className={
            clickedGenres.length > 0 ||
            clickedRatings.length > 0 ||
            Object.values(checkboxOptions).some((val) => val === true) ||
            sortBy !== ''
              ? 'search-active'
              : ''
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Filter;
