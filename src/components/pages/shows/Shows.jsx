import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchBar from '../../movies & shows/SearchBar';
import Category from '../../movies & shows/Category';
import Loading from '../../display/Loading';
import TvIcon from '../../../assets/TvIcon';
import { options } from '../../../options';
import TrendingCarousel from '../../movies & shows/TrendingCarousel';

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const Shows = () => {
    const [top_rated, setTop_rated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [action, setAction] = useState([]);
    const [animation, setAnimation] = useState([]);
    const [mystery, setMystery] = useState([]);

    const topRatedRef = useRef(null);
    const trendingRef = useRef(null);
    const actionRef = useRef(null);
    const animationRef = useRef(null);
    const mysteryRef = useRef(null);
    
    const [loading, setLoading] = useState(false);
    const location = useLocation();
      
    useEffect(() => {
        const savedState = JSON.parse(sessionStorage.getItem('showsState'));
        if (savedState) {
            setTop_rated(savedState.top_rated);
            setTrending(savedState.trending);
            setAction(savedState.action);
            setAnimation(savedState.animation);
            setMystery(savedState.mystery);
    
            setLoading(false);
            setTimeout(() => {
                window.scrollTo(0, savedState.scrollPosition);
                if (topRatedRef.current) topRatedRef.current.scrollLeft = savedState.topRatedScroll;
                if (trendingRef.current) trendingRef.current.scrollLeft = savedState.trendingScroll;
                if (actionRef.current) actionRef.current.scrollLeft = savedState.actionScroll;
                if (animationRef.current) animationRef.current.scrollLeft = savedState.animationScroll;
                if (mysteryRef.current) mysteryRef.current.scrollLeft = savedState.mysteryScroll;
            }, 100);
        } else {
            setLoading(true);
            Promise.all([
                fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options).then(res => res.json()).then(data => setTop_rated(data.results)),
                fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options).then(res => res.json()).then(data => setTrending(data.results)),
                fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759', options).then(res => res.json()).then(data => setAction(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16', options).then(res => res.json()).then(data => setAnimation(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648', options).then(res => res.json()).then(data => setMystery(shuffleArray(data.results))),
            ])
            .then(() => setLoading(false))
            .catch(err => console.error(err));
        }
    }, [])

    const saveState = () => {
        if (!top_rated.length || !trending.length || !action.length || !animation.length || !mystery.length) return;

        const state = {
            top_rated,
            trending,
            action,
            animation,
            mystery,
            
            scrollPosition: window.scrollY,
            topRatedScroll: topRatedRef.current ? topRatedRef.current.scrollLeft : 0,
            trendingScroll: trendingRef.current ? trendingRef.current.scrollLeft : 0,
            actionScroll: actionRef.current ? actionRef.current.scrollLeft : 0,
            animationScroll: animationRef.current ? animationRef.current.scrollLeft : 0,
            mysteryScroll: mysteryRef.current ? mysteryRef.current.scrollLeft : 0,
        };
        sessionStorage.setItem('showsState', JSON.stringify(state));
    };

    useEffect(() => {
        const handleScroll = () => saveState();

        window?.addEventListener('scroll', handleScroll);
        topRatedRef.current?.addEventListener('scroll', handleScroll);
        trendingRef.current?.addEventListener('scroll', handleScroll);
        actionRef.current?.addEventListener('scroll', handleScroll);
        animationRef.current?.addEventListener('scroll', handleScroll);
        mysteryRef.current?.addEventListener('scroll', handleScroll);
        
        return () => {
            window?.removeEventListener('scroll', handleScroll);
            topRatedRef.current?.removeEventListener('scroll', handleScroll);
            trendingRef.current?.removeEventListener('scroll', handleScroll);
            actionRef.current?.removeEventListener('scroll', handleScroll);
            animationRef.current?.removeEventListener('scroll', handleScroll);
            mysteryRef.current?.removeEventListener('scroll', handleScroll);
    };
    }, [window, top_rated, trending, action, animation, mystery]);

    useEffect(() => {
        const handleBeforeUnload = () => saveState();

        window.addEventListener('beforeunload', handleBeforeUnload);
        topRatedRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        trendingRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        actionRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        animationRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        mysteryRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            topRatedRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            trendingRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            actionRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            animationRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            mysteryRef.current?.removeEventListener('beforeunload', handleBeforeUnload); 
        };
    }, []);

    useEffect(() => {
        saveState();
    }, [location.pathname]);

    if (loading) return <Loading/>

    return (
        <div className="shows-wrapper">
            <header>
                <div className="page-title">
                    <TvIcon/>
                    <h1>Shows</h1>
                </div>

                <SearchBar type={"Show"}/>
            </header>

            <TrendingCarousel type={"show"} movies={trending.slice(0, 5)} />

            <Category type={"show"} ref={topRatedRef} title={"Top Rated"} category={top_rated}/>
            <Category type={"show"} ref={trendingRef} title={"Trending"} category={trending}/>
            <Category type={"show"} ref={actionRef} title={"Action & Adventure"} category={action}/>
            <Category type={"show"} ref={animationRef} title={"Animation"} category={animation}/>
            <Category type={"show"} ref={mysteryRef} title={"Mystery"} category={mystery}/>
        </div>
    )
}

export default Shows
