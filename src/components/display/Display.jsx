import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Movies from '../pages/movies/Movies';
import MovieDetails from '../movies & shows/MovieDetails';
import ShowDetails from '../movies & shows/ShowDetails';
import NoResults from '../movies & shows/NoResults';
import Collection from '../pages/collection/Collection';
import Search from '../pages/search/Search';
import Shows from '../pages/shows/Shows';
import Watchlist from '../pages/watchlist/Watchlist';

const Display = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/movies"/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>

        <Route path="/search/:type" element={<Search/>}/>

        <Route path="/collection" element={<NoResults type={"results"}/>}/>
        <Route path="/collection/:id" element={<Collection/>}/>

        <Route path="/shows" element={<Shows/>}/>
        <Route path="/shows/:id" element={<ShowDetails/>}/>

        <Route path="/watchlist" element={<Watchlist/>}/>

        <Route path="*" element={<NoResults type={"page"}/>}/>
      </Routes>
    </>
  )
}

export default Display;