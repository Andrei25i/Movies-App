import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import MovieIcon from '../../assets/MovieIcon';
import TvIcon from '../../assets/TvIcon';
import BookmarkIcon from '../../assets/BookmarkIcon';

import "./Navbar.css";
import { ButtonBase } from '@mui/material';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav>
      <ButtonBase onClick={() => navigate('/movies')} className={`tab ${location.pathname.includes("movie") || location.pathname.includes("collection")  ? 'active' : ''}`}>
        <MovieIcon/>
        <span>Movies</span>
      </ButtonBase>

      <ButtonBase onClick={() => navigate('/shows')} className={`tab ${location.pathname.includes("show") || location.pathname.includes("tv") ? 'active' : ''}`}>
        <TvIcon/>
        <span>Shows</span>
      </ButtonBase>

      <ButtonBase onClick={() => navigate('/watchlist')} className={`tab ${location.pathname.includes("watchlist") ? 'active' : ''}`}>
        <BookmarkIcon/>
        <span>Watchlist</span>
      </ButtonBase>
    </nav>
  )
}

export default Navbar
