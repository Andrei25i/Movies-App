import React from 'react';

import './css/Status.css';

const Status = ({ type, details }) => {
    let release_date;
    if (type === "movie") {
        if (details.release_date) release_date = details.release_date
        else release_date = "TBD"
    }
    else {
        if (details.first_air_date) release_date = details.first_air_date
        else release_date = "TBD"
    }
  return (
    <section>
        <div className="status-container">
            <div>
                <h2>Status</h2>
                <div className="highlighted">
                    <p>{details.status}</p>
                </div>
            </div>

            <div>
                <h2>Release Date</h2>
                <div className="highlighted">
                    <p>{release_date}</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Status
