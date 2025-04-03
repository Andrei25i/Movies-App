import React from 'react';
import BackButton from './BackButton';

import './css/Header.css';
import WatchlistButton from './WatchlistButton';

const Header = ({type, details, ageRating }) => {

    let title, releaseYear, runtime;
    if (type === "movie") {
        title = details.title;
        releaseYear = details.release_date && details.release_date.slice(0, 4);
        runtime = formatTime(details.runtime);
    }
    else {
        title = details.name;
        releaseYear = `${details.first_air_date && details.first_air_date.slice(0, 4)} - ${details.last_air_date && details.last_air_date.slice(0, 4)}`;
        if (details.number_of_seasons === 1)
            runtime = `${details.number_of_seasons} season`;
        else
            runtime = `${details.number_of_seasons} seasons`;
    }

  return (
    <div className="header">
        <div className="buttons">
            <BackButton/>
            <WatchlistButton details={details} type={type}/>
        </div>

        <div className="title">
            <h1>{title}</h1>
            <div className="main-info">
                <p>{releaseYear}</p>
                <p>{runtime}</p>
                <div className="highlighted">
                    <p>{ageRating}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

const formatTime = (runtime) => {
    if (runtime === 0) return '0h 0m';

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export default Header
