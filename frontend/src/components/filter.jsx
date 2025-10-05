import './filter.css';

function Filter ({  }) {  
   
    return (
        
        <div className="filter_panel card">
            <div className="filter">
                <h3>Filters</h3>
            </div>
            <div className="filter">
                <h3>Genres</h3>
                <div className='options-grid'>
                    {["Action & Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Kids", "Mystery", "News", "Reality", "Sci-Fi & Fantasy", "Soap", "Talk", "War & Politics", "Western"].map(genre => (
                    <button
                        key={genre}
                        className='option-box'
                        data-value={genre}
                        type="button"
                    >
                        {genre}
                    </button>
                    ))}
                </div>
                <div className="filter">
                    <h3>Rating</h3>
                    <div className="options-grid">
                        {["NR","TV-Y","TV-Y7","TV-G","TV-PG","TV-14","TV-MA"].map(rating => (
                        <button 
                            key={rating} 
                            className="option-box" 
                            data-value={rating}
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
                        <input type='checkbox' id='streaming' name="Streaming"></input>
                        <label for="streaming">Streaming</label>  
                    </div>
                    <div className='Checkbox'>
                        <input type='checkbox' id='free' name="Free"></input>
                        <label for="streaming">Free</label>  
                    </div>
                    <div className='Checkbox'>
                        <input type='checkbox' id='rent' name="Rent"></input>
                        <label for="streaming">Rent</label>  
                    </div>
                    <div className='Checkbox'>
                        <input type='checkbox' id='buy' name="Buy"></input>
                        <label for="streaming">Buy</label>  
                    </div>
                    <div className='Checkbox'>
                        <input type='checkbox' id='ads' name="Ads"></input>
                        <label for="streaming">Ads</label>  
                    </div>

                </div>
                <div className='Sort'>
                    <h3>Sort</h3>
                    <div className='filter'>
                        <select name="sort" id="sort-select">
                            <option value="">Sort By</option>
                            <option value="trending">Trending</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="air-date">Air Date</option>
                        </select>

                <div className='Search'>
                    <h3>Search</h3>
                    <div className='filter'>
                        <button></button>
                    </div>
                </div>

                    </div>
                </div>
            </div>


            



        </div>
    );
}

export default Filter;
