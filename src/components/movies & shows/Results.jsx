import React, { useEffect, useState } from 'react';
import Card from '../movies & shows/Card';

import "./css/Results.css";
import SearchBar from './SearchBar';
import Loading from '../display/Loading';

const Results = ({type, title, results, searchBar }) => {

  const [fade, setFade] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(title);
  const [displayedResults, setDisplayedResults] = useState(results);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFade(true);
    setLoading(true)
    const timeout = setTimeout(() => {
      setDisplayedTitle(title);
      setDisplayedResults(results);
      setFade(false);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [results]);

  return (
    <div className={`content-wrapper`}>
      {searchBar ? <SearchBar type={searchBar}/> : ""}

      {loading ? (
        <Loading/>
      ) : (
        <div className={`results-wrapper ${fade ? 'fade' : ''}`}>
          <div className="results-title">
            <h2>{displayedTitle ? displayedTitle : ""}</h2>
          </div>
          
          <div className="results">
            {
              displayedResults && displayedResults.map((result, index) => {
                  if (result.poster_path)
                    return <Card type={type} key={index} card={result} />
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
