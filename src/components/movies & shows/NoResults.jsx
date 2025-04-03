import React from 'react';

const NoResults = ({ type }) => {

  let message;

  if (type === "results") 
    message = "No results were found..."
  else if (type === "page")
    message = "This page does not exist..."

  return (
    <div className='no-results' style={{textAlign: 'center', marginTop: '35vh'}}>
      <h1>{message}</h1>
    </div>
  )
}

export default NoResults; 