import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../display/Loading';
import NoResults from './NoResults';
import Header from './Header';
import Overview from './Overview';
import Genres_Rating from './Genres_Rating';
import Trailer from './Trailer';
import Cast from './Cast';
import { options } from '../../options';
import Status from './Status';

import './css/Details.css';

const MovieDetails = () => {
    const { id } = useParams();

    const [success, setSuccess] = useState(true);
    const [details, setDetails] = useState({});
    const [ageRating, setAgeRating] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trailer, setTrailer] = useState({});
    const [cast, setCast] = useState([]);
      
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const fetchDetails = fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success === false) {
                    setSuccess(false);
                    setLoading(false);
                    return;
                }
                setDetails(res);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchContentRatings = fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings`, options)
            .then(res => res.json())
            .then(res => {
                const usRating = res.results.find(rating => rating.iso_3166_1 === "US");
                if (usRating) 
                    setAgeRating(usRating.rating);
                else 
                    setAgeRating("TBD");
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchVideos = fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                const trailer = res.results.find(video => video.type === "Trailer" && video.official);
                setTrailer(trailer);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchCredits = fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(res => setCast(res.cast.slice(0, 10)))
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        Promise.all([fetchDetails, fetchContentRatings, fetchVideos, fetchCredits])
            .then(() => setLoading(false))
            .catch(err => {
                console.error(err);
                setLoading(fase);
            });
    }, [id]);

    if (loading) return <Loading/>
    if (!success) return <NoResults type={"results"}/>

    return (
        <div className='content-wrapper'>
            {details ? <Header type={"show"} details={details} ageRating={ageRating} /> : ""}
            {details ? <Overview details={details} /> : ""}
            {details ? <Genres_Rating details={details} /> : ""}
            {trailer ? <Trailer trailer={trailer} /> : ""}
            {cast.length !== 0 ? <Cast cast={cast} /> : ""}
            {details ? <Status type={"show"} details={details} /> : ""}
        </div>
  )
}

export default MovieDetails;