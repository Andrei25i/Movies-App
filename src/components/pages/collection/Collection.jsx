import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Results from '../../movies & shows/Results';
import Loading from '../../display/Loading';
import NoResults from '../../movies & shows/NoResults';
import BackButton from '../../movies & shows/BackButton';
import { options } from '../../../options';

const Collection = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setLoading(true);
    
    const fetchCollection = fetch(`https://api.themoviedb.org/3/collection/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(res => setDetails(res))
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    
    Promise.all([fetchCollection])
      .then(() => setLoading(false))
      .catch(err => {
          console.error(err);
          setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading/>
  if (!details.parts) return <NoResults type={"results"}/>

  return (
    <>
      <div className="buttons">
          <BackButton/>
      </div>

      <Results type={"movie"} title={details.name} results={details.parts} />
    </>
  )

}
export default Collection;
