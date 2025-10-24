import { useState } from 'react';
import './Filter.css';

function Filter () {  
    const genres = [
    "Action & Adventure", "Animation", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Kids", "Mystery", "News", "Reality",
    "Sci-Fi & Fantasy", "Soap", "Talk", "War & Politics", "Western"
    ];


    const ratings = ["NR", "TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];

    const [clickedGenres, setClickedGenres] = useState([]);
    const [clickedRatings, setClickedRatings] = useState([]);

    const genreClick = (genre) => {
        const currentGenres = clickedGenres;
        const clickedAlready = currentGenres.includes(genre)

        if (clickedAlready) {
            const newGenres = currentGenres.filter((i) => i !== genre); 
            setClickedGenres(newGenres);
        } else {
            const newGenres = currentGenres.concat(genre);
            setClickedGenres(newGenres);
        }
    };

    const ratingClick = (rating) => {
        const currentRating = clickedRatings;
        const clickedAlready = currentRating.includes(rating)

        if (clickedAlready) {
            const newRating = currentRating.filter((i) => i !== rating);
            setClickedRatings(newRating);
        } else {
            const newRating = currentRating.concat(rating);
            setClickedRatings(newRating);
        }
    }

    const [checkboxOptions, setCheckboxOptions] = useState({
        streaming: false,
        free: false,
        rent: false,
        buy: false,
        ads: false
    });

    const handleCheckboxChange = (optionName) => {
    
        const currentOptions = checkboxOptions;
    
    
        const newOptions = {
            streaming: currentOptions.streaming,
            free: currentOptions.free,
            rent: currentOptions.rent,
            buy: currentOptions.buy,
            ads: currentOptions.ads
        };
    
        if (optionName === 'streaming') {
            newOptions.streaming = !currentOptions.streaming;
        } else if (optionName === 'free') {
            newOptions.free = !currentOptions.free;
        } else if (optionName === 'rent') {
            newOptions.rent = !currentOptions.rent;
        } else if (optionName === 'buy') {
            newOptions.buy = !currentOptions.buy;
        } else if (optionName === 'ads') {
            newOptions.ads = !currentOptions.ads;
        }
        
        
        setCheckboxOptions(newOptions);
    };

    const [sortBy, setSortBy] = useState('');

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };
    
    return (
        
        <div className="filter_panel card">
            <div className="filter">
                <h3>Filters</h3>
            </div>
            <div className="filter">
                <h3>Genres</h3>
                <div className='options-grid'>
                    {genres.map(genre => (
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
                <div className="filter">
                    <h3>Rating</h3>
                    <div className="options-grid">
                        {ratings.map(rating => (
                        <button 
                            key={rating} 
                            className={clickedRatings.includes(rating) ? "option-box selected" : "option-box"} 
                            onClick={() => ratingClick(rating)}
                            type="button"
                        >
                            {rating}
                        </button>
                        ))}
                    </div>
                </div>

                <div className='filter'>
                    <h3>Availability</h3>
                    <div className='Checkbox'>
                        <input
                            type='checkbox'
                            id='streaming'
                            checked={checkboxOptions.streaming}
                            onChange={() => handleCheckboxChange('streaming')}
                        />
                        <label htmlFor="streaming">Streaming</label>
                    </div>
                    <div className='Checkbox'>
                        <input
                            type='checkbox'
                            id='free'
                            checked={checkboxOptions.free}
                            onChange={() => handleCheckboxChange('free')}
                        />
                        <label htmlFor="free">Free</label>
                    </div>
                    <div className='Checkbox'>
                        <input
                            type='checkbox'
                            id='rent'
                            checked={checkboxOptions.rent}
                            onChange={() => handleCheckboxChange('rent')}
                        />
                        <label htmlFor="rent">Rent</label>
                    </div>
                    <div className='Checkbox'>
                        <input
                            type='checkbox'
                            id='buy'
                            checked={checkboxOptions.buy}
                            onChange={() => handleCheckboxChange('buy')}
                        />
                        <label htmlFor="buy">Buy</label>
                    </div>
                    <div className='Checkbox'>
                        <input
                            type='checkbox'
                            id='ads'
                            checked={checkboxOptions.ads}
                            onChange={() => handleCheckboxChange('ads')}
                        />
                        <label htmlFor="ads">Ads</label>
                    </div>
                </div>
                <div className='Sort'>
                    <h3>Sort</h3>
                    <div className='filter'>
                        <select name="sort" id="sort-select" value={sortBy} onChange={handleSortChange}>
                            <option value="">Sort By</option>
                            <option value="trending">Trending</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="air-date">Air Date</option>
                        </select>

                <div className='Search'>
                    <h3>Search</h3>
                    <div className='filter'>
                        <button
                        className={clickedGenres.length > 0 || clickedRatings.length > 0 || Object.values(checkboxOptions).some(val => val === true) || sortBy !== '' ? 'search-active' : ''}
                        >
                            Search
                        </button>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Filter;
