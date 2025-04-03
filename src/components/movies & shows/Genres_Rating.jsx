import React from 'react';

import star from '../../assets/star.svg';

import './css/Genres_Rating.css';

const Genres_Rating = ({ details }) => {
  return (
    <section>
        <div className="genres-rating">
            <div className="genres-container">
                <h2>Genres</h2>
                <div className="genres">
                {
                    details.genres && details.genres.map((genre, index) => {
                        return <div className="highlighted" key={index}>
                            <p>{genre.name}</p>
                        </div>
                    })
                }
                </div>
            </div>

            <div className="stars">
                <img src={star} alt="" />
                <p>
                    <span>{details.vote_average && details.vote_average.toFixed(1)}</span><span className='darker'>/10</span><br/>
                    <span className='darker'>{details.vote_count && details.vote_count} votes</span> 
                </p>
            </div>
        </div>                
    </section>
  )
}

export default Genres_Rating
