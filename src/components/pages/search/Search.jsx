import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import BackButton from '../../movies & shows/BackButton';
import Results from '../../movies & shows/Results';
import { options } from '../../../options';

const Search = () => {

    const { type } = useParams();
    const query = new URLSearchParams(location.search).get('query');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]); 

    useEffect(() => {
      setLoading(true);
      const searchResults = fetch(`https://api.themoviedb.org/3/search/${type === "movie" ? type : "tv"}?query=${query}&include_adult=false&language=en-US&page=1`, options)
          .then(res => res.json())
          .then(res => setResults(res.results))
          .catch(err => {
              console.error(err)
              setLoading(false);
          });

      Promise.all([searchResults])
          .then(() => setLoading(false))
          .catch(err => {
              console.error(err);
              setLoading(false);
          });
    }, [query])
  
  let message = "";
  if (results.length !== 0 && query) message = `Results for "${query}"`
  else if (results.length == 0 && query) message = `No results for"${query}"`
  else if (results.length == 0 && !query) message = `No results. Try Again...`
  else message `No results. Try Again...`
  
  return (
    <>
        <div className="buttons">
            <BackButton/>
        </div>
        
        <Results type={type} title={message} results={results} searchBar={type === "movie" ? "Movie" : "Show"} />
    </>
  )
}

export default Search;