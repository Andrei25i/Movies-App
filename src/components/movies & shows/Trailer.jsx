import React from 'react';

import './css/Trailer.css';

const Trailer = ({ trailer }) => {

  if (!trailer) return <></>
  
  return (
    <section>
        <h2>Trailer</h2>
        <iframe src={trailer && `https://www.youtube.com/embed/${trailer.key}`} allowFullScreen></iframe>
    </section>
  )
}

export default Trailer;