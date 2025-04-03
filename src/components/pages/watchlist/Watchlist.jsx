import React, { useEffect, useState } from 'react'
import Card from '../../movies & shows/Card';

import delete_icon from '../../../assets/delete.svg';

import './Watchlist.css';
import { ButtonBase } from '@mui/material';

const Watchlist = () => {

    const [watchlist, setWatchlist] = useState([]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(savedWatchlist);
    }, [])

    const clearWatchlist = () => {
        setFade(true);
        setTimeout(() => {
            setWatchlist([]);
            localStorage.setItem('watchlist', JSON.stringify([]))
            setFade(false);
        }, 200);
    };

    return (
        <div className="content-wrapper">
            <div className="header">
                <div className="buttons delete-button">
                    <ButtonBase onClick={clearWatchlist} className='button'>
                        <img src={delete_icon} alt="" />
                    </ButtonBase>
                </div>
            </div>
            <div className={`watchlist ${fade ? 'fade' : ''}`}>
                {watchlist.length > 0 ? (
                    <>
                        <h1>Watchlist</h1>
                        <div className="items-container">
                            {watchlist.map((item, index) => (
                                <div key={index} className="watchlist-item">
                                    <Card type={item.type} card={item} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1>No items in watchlist...</h1>
                )}
            </div>
        </div>
    );
}

export default Watchlist
