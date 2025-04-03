import React, { useState } from 'react';

import search_icon from '../../assets/search.svg';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ type }) => {

    const [searchQuery, setSearchQuery] = useState();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${type === "Movie" ? "movie" : "tv"}?query=${encodeURIComponent(searchQuery)}`);
        }
    };

  return (
    <form onSubmit={handleSearch}>
        <div className="search">
            <img className='search-icon' src={search_icon} alt="" />
            <input className='search-input' type="search" placeholder={`${type} name`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
    </form>
  )
}

export default SearchBar
