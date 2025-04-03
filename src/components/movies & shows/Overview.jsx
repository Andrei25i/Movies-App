import React from 'react';

import no_image from "../../assets/no-image.jpg";

import './css/Overview.css';

const Overview = ({ details }) => {
  return (
    <section>
        <h2>Overview</h2>
        <div className="overview">
          {
            details.poster_path
            ? <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt="" />
            : <img src={no_image} alt="" />
          }
            
          <div className="text-container">
              <p>{details.overview}</p>
          </div>
        </div>
    </section>
  )
}

export default Overview;
