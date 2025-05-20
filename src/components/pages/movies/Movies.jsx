import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchBar from '../../movies & shows/SearchBar';
import Category from '../../movies & shows/Category';
import Loading from '../../display/Loading';
import MovieIcon from '../../../assets/MovieIcon';
import { options } from '../../../options';

import "./Movies.css";
import TrendingCarousel from '../../movies & shows/TrendingCarousel';

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const Movies = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [trending, setTrending] = useState([]);
    const [action, setAction] = useState([]);
    const [adventure, setAdventure] = useState([]);
    const [animation, setAnimation] = useState([]);
    const [comedy, setComedy] = useState([]);
    const [drama, setDrama] = useState([]);
    const [family, setFamily] = useState([]);
    const [horror, setHorror] = useState([]);
    const [mystery, setMystery] = useState([]);
    const [sf, setSf] = useState([]);
    const [thriller, setThriller] = useState([]);
    const [war, setWar] = useState([]);
    const [top_rated, setTop_rated] = useState([]);

    const nowPlayingRef = useRef(null);
    const trendingRef = useRef(null);
    const actionRef = useRef(null);
    const adventureRef = useRef(null);
    const animationRef = useRef(null);
    const comedyRef = useRef(null);
    const dramaRef = useRef(null);
    const familyRef = useRef(null);
    const horrorRef = useRef(null);
    const mysteryRef = useRef(null);
    const sfRef = useRef(null);
    const thrillerRef = useRef(null);
    const warRef = useRef(null);
    const topRatedRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const location = useLocation();
      
    useEffect(() => {
        const savedState = JSON.parse(sessionStorage.getItem('moviesState'));
        if (savedState) {
            setNowPlaying(savedState.nowPlaying);
            setTrending(savedState.trending);
            setAction(savedState.action);
            setAdventure(savedState.adventure);
            setAnimation(savedState.animation);
            setComedy(savedState.comedy);
            setDrama(savedState.drama);
            setFamily(savedState.family);
            setHorror(savedState.horror);
            setMystery(savedState.mystery);
            setSf(savedState.sf);
            setThriller(savedState.thriller);
            setWar(savedState.war);
            setTop_rated(savedState.top_rated);

            setLoading(false);
            setTimeout(() => {
                window.scrollTo(0, savedState.scrollPosition);
                if (nowPlayingRef.current) nowPlayingRef.current.scrollLeft = savedState.nowPlayingScroll;
                if (trendingRef.current) trendingRef.current.scrollLeft = savedState.trendingScroll;
                if (actionRef.current) actionRef.current.scrollLeft = savedState.actionScroll;
                if (adventureRef.current) adventureRef.current.scrollLeft = savedState.adventureScroll;
                if (animationRef.current) animationRef.current.scrollLeft = savedState.animationScroll;
                if (comedyRef.current) comedyRef.current.scrollLeft = savedState.comedyScroll;
                if (dramaRef.current) dramaRef.current.scrollLeft = savedState.dramaScroll;
                if (familyRef.current) familyRef.current.scrollLeft = savedState.familyScroll;
                if (horrorRef.current) horrorRef.current.scrollLeft = savedState.horrorScroll;
                if (mysteryRef.current) mysteryRef.current.scrollLeft = savedState.mysteryScroll;
                if (sfRef.current) sfRef.current.scrollLeft = savedState.sfScroll;
                if (thrillerRef.current) thrillerRef.current.scrollLeft = savedState.thrillerScroll;
                if (warRef.current) warRef.current.scrollLeft = warRef.thrillerScroll;
                if (topRatedRef.current) topRatedRef.current.scrollLeft = savedState.topRatedScroll;
            }, 100);
        } else {
            setLoading(true);
            Promise.all([
                fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options).then(res => res.json()).then(data => setNowPlaying(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options).then(res => res.json()).then(data => setTrending(data.results)),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=28', options).then(res => res.json()).then(data => setAction(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=12', options).then(res => res.json()).then(data => setAdventure(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=16', options).then(res => res.json()).then(data => setAnimation(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=35', options).then(res => res.json()).then(data => setComedy(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=18', options).then(res => res.json()).then(data => setDrama(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=10751', options).then(res => res.json()).then(data => setFamily(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=27', options).then(res => res.json()).then(data => setHorror(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=9648', options).then(res => res.json()).then(data => setMystery(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=878', options).then(res => res.json()).then(data => setSf(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=53', options).then(res => res.json()).then(data => setThriller(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=10752', options).then(res => res.json()).then(data => setWar(shuffleArray(data.results))),
                fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then(res => res.json()).then(data => setTop_rated(data.results)),
            ])
            .then(() => setLoading(false))
            .catch(err => console.error(err));
        }
    }, [])

    const saveState = () => {
        if (!nowPlaying.length || !trending.length || !top_rated.length || !action.length || !adventure.length || !animation.length || !comedy.length || !drama.length || !family.length || !horror.length || !mystery.length || !sf.length || !thriller.length || !war.length) return;

        const state = {
            nowPlaying,
            trending,
            action,
            adventure,
            animation,
            comedy,
            drama,
            family,
            horror,
            mystery,
            sf,
            thriller,
            war,
            top_rated,
            scrollPosition: window.scrollY,
            nowPlayingScroll: nowPlayingRef.current ? nowPlayingRef.current.scrollLeft : 0,
            trendingScroll: trendingRef.current ? trendingRef.current.scrollLeft : 0,
            actionScroll: actionRef.current ? actionRef.current.scrollLeft : 0,
            adventureScroll: adventureRef.current ? adventureRef.current.scrollLeft : 0,
            animationScroll: animationRef.current ? animationRef.current.scrollLeft : 0,
            comedyScroll: comedyRef.current ? comedyRef.current.scrollLeft : 0,
            dramaScroll: dramaRef.current ? dramaRef.current.scrollLeft : 0,
            familyScroll: familyRef.current ? familyRef.current.scrollLeft : 0,
            horrorScroll: horrorRef.current ? horrorRef.current.scrollLeft : 0,
            mysteryScroll: mysteryRef.current ? mysteryRef.current.scrollLeft : 0,
            sfScroll: sfRef.current ? sfRef.current.scrollLeft : 0,
            thrillerScroll: thrillerRef.current ? thrillerRef.current.scrollLeft : 0,
            warScroll: warRef.current ? warRef.current.scrollLeft : 0,
            topRatedScroll: topRatedRef.current ? topRatedRef.current.scrollLeft : 0,
        };
        sessionStorage.setItem('moviesState', JSON.stringify(state));
    };

    useEffect(() => {
        const handleScroll = () => saveState();
        window?.addEventListener('scroll', handleScroll);
        nowPlayingRef.current?.addEventListener('scroll', handleScroll);
        trendingRef.current?.addEventListener('scroll', handleScroll);
        actionRef.current?.addEventListener('scroll', handleScroll);
        adventureRef.current?.addEventListener('scroll', handleScroll);
        animationRef.current?.addEventListener('scroll', handleScroll);
        comedyRef.current?.addEventListener('scroll', handleScroll);
        dramaRef.current?.addEventListener('scroll', handleScroll);
        familyRef.current?.addEventListener('scroll', handleScroll);
        horrorRef.current?.addEventListener('scroll', handleScroll);
        mysteryRef.current?.addEventListener('scroll', handleScroll);
        sfRef.current?.addEventListener('scroll', handleScroll);
        thrillerRef.current?.addEventListener('scroll', handleScroll);
        warRef.current?.addEventListener('scroll', handleScroll);
        topRatedRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            window?.removeEventListener('scroll', handleScroll);
            nowPlayingRef.current?.removeEventListener('scroll', handleScroll);
            trendingRef.current?.removeEventListener('scroll', handleScroll);
            actionRef.current?.removeEventListener('scroll', handleScroll);
            adventureRef.current?.removeEventListener('scroll', handleScroll);
            animationRef.current?.removeEventListener('scroll', handleScroll);
            comedyRef.current?.removeEventListener('scroll', handleScroll);
            dramaRef.current?.removeEventListener('scroll', handleScroll);
            familyRef.current?.removeEventListener('scroll', handleScroll);
            horrorRef.current?.removeEventListener('scroll', handleScroll);
            mysteryRef.current?.removeEventListener('scroll', handleScroll);
            sfRef.current?.removeEventListener('scroll', handleScroll);
            thrillerRef.current?.removeEventListener('scroll', handleScroll);
            warRef.current?.removeEventListener('scroll', handleScroll);
            topRatedRef.current?.removeEventListener('scroll', handleScroll);
    };
    }, [window, nowPlaying, trending, action, adventure, animation, comedy, drama, family, horror, mystery, sf, thriller, war, top_rated]);

    useEffect(() => {
        const handleBeforeUnload = () => saveState();

        window.addEventListener('beforeunload', handleBeforeUnload);
        nowPlayingRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        trendingRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        actionRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        adventureRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        animationRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        comedyRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        dramaRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        familyRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        horrorRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        mysteryRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        sfRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        thrillerRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        warRef.current?.addEventListener('beforeunload', handleBeforeUnload);
        topRatedRef.current?.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            nowPlayingRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            trendingRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            actionRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            adventureRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            animationRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            comedyRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            dramaRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            familyRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            horrorRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            mysteryRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            sfRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            thrillerRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            warRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
            topRatedRef.current?.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        saveState();
    }, [location.pathname]);

    if (loading) return <Loading/>

    return (
        <div className="movies-wrapper">
            <header>
                <div className="page-title">
                    <MovieIcon/>
                    <h1>Movies</h1>
                </div>
                    
                <SearchBar type={"Movie"}/>
            </header>
            
            <TrendingCarousel type={"movie"} movies={trending.slice(0, 5)} />

            <Category type={"movie"} ref={nowPlayingRef} title={"Now in Theaters"} category={nowPlaying}/>
            <Category type={"movie"} ref={trendingRef} title={"Trending"} category={trending}/>
            <Category type={"movie"} ref={actionRef} title={"Action"} category={action}/>
            <Category type={"movie"} ref={adventureRef} title={"Adventure"} category={adventure}/>
            <Category type={"movie"} ref={animationRef} title={"Animation"} category={animation}/>
            <Category type={"movie"} ref={comedyRef} title={"Comedy"} category={comedy}/>
            <Category type={"movie"} ref={dramaRef} title={"Drama"} category={drama}/>
            <Category type={"movie"} ref={familyRef} title={"Family"} category={family}/>
            <Category type={"movie"} ref={horrorRef} title={"Horror"} category={horror}/>
            <Category type={"movie"} ref={mysteryRef} title={"Mystery"} category={mystery}/>
            <Category type={"movie"} ref={sfRef} title={"Science Fiction"} category={sf}/>
            <Category type={"movie"} ref={thrillerRef} title={"Thriller"} category={thriller}/>
            <Category type={"movie"} ref={warRef} title={"War"} category={war}/>
            <Category type={"movie"} ref={topRatedRef} title={"Top Rated"} category={top_rated}/>
        </div>
  )
}

export default Movies