import React from 'react';

import './css/Cast.css';

const Cast = ({ cast }) => {

    if (cast.length === 0) return <></>

    return (
        <section>
            <div className="cast-container">
                <h2>Cast</h2>
                <div className="actors-container">
                    {
                        cast.map((actor, index) => {
                            return <div className="actor" key={index}>
                                <p>{actor.name}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Cast;