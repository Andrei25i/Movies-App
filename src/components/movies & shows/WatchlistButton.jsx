import React, { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';

import { useParams } from 'react-router-dom';

import bookmark_add from '../../assets/bookmark_add.svg'
import bookmark from '../../assets/bookmark.svg'

const WatchlistButton = ({ details, type }) => {
    const { id } = useParams();
    const [added, setAdded] = useState(false);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(savedWatchlist);
        setAdded(savedWatchlist.some(movie => movie.id === id));
    }, [id])

    const handleClick = () => {
        setTimeout(() => {
            if (!added) {
                const newWatchlist = [...watchlist, { 
                    id: id,
                    type: type,
                    title: details.title || details.name, 
                    poster_path: details.poster_path,
                }];
                setWatchlist(newWatchlist);
                localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
                setAdded(true);
            
            } else {
                const newWatchlist = watchlist.filter(movie => movie.id !== id);
                setWatchlist(newWatchlist);
                localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
                setAdded(false);
            }
        }, 200);
    };

  return (
    <ButtonBase onClick={handleClick} className='button'>
        <img src={!added ? bookmark_add : bookmark} alt=""/>
    </ButtonBase>
  )
}

export default WatchlistButton;