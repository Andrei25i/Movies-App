import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../display/Loading';
import NoResults from './NoResults';

import Header from './Header';
import Overview from './Overview';
import Genres_Rating from './Genres_Rating';
import Trailer from './Trailer';
import Cast from './Cast';
import Status from './Status';
import Collection from './Collection';
import Category from './Category';
import { options } from '../../options';

import './css/Details.css';

const MovieDetails = () => {
    const { id } = useParams();

    const [success, setSuccess] = useState(true);
    const [details, setDetails] = useState({});
    const [ageRating, setAgeRating] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trailer, setTrailer] = useState({});
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const recommendationsRef = useRef();
      
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const fetchDetails = fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success === false) {
                    setSuccess(false);
                    setLoading(false);
                    return;
                }
                setDetails(res);
                fetchRecommendations(res.genres.map(genre => genre.id).join(','));
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchReleaseDates = fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, options)
            .then(res => res.json())
            .then(res => {
                const usRelease = res.results.find(release => release.iso_3166_1 === "US");
                if (usRelease) {
                    const certification = usRelease.release_dates.find(date => date.certification);
                    if (certification) {
                        setAgeRating(certification.certification);
                    } else {
                        setAgeRating("TBD");
                    }
                } else {
                    setAgeRating("TBD");
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchVideos = fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                const trailer = res.results.find(video => video.type === "Trailer" && video.official);
                setTrailer(trailer);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchCredits = fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(res => setCast(res.cast.slice(0, 20)))
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        const fetchRecommendations = (genreIds) => {
            fetch(`https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreIds}`, options)
                .then(res => res.json())
                .then(res => setRecommendations(res.results))
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        };

        Promise.all([fetchDetails, fetchReleaseDates, fetchVideos, fetchCredits])
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
            {details ? <Header type={"movie"} details={details} ageRating={ageRating} /> : ""}
            {details ? <Genres_Rating details={details} /> : ""}
            {details ? <Overview details={details} /> : ""}
            {cast.length !== 0 ? <Cast cast={cast} /> : ""}
            {trailer ? <Trailer trailer={trailer} /> : ""}
            
            {details ? <Status type={"movie"} details={details} /> : ""}
            {details.belongs_to_collection ? <Collection title={details.belongs_to_collection.name} id={details.belongs_to_collection.id} /> : ""}
            {recommendations.length !== 0 ? <Category type={"movie"} ref={recommendationsRef} title={"More Like This"} category={recommendations} /> : "" }
        </div>
  )
}

export default MovieDetails;