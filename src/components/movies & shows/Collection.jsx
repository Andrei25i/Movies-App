import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';

import collection from '../../assets/collection.svg';

import './css/Collection.css';

const Collection = ({ title, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => {
        navigate(`/collection/${id}`);
        }, 400);
    };

  return (
    <section>
        <div className="collection-container">
            <ButtonBase onClick={handleClick}>
                <p>Check The Entire {title}</p>
                <img src={collection} alt="" />
            </ButtonBase>
        </div>
    </section>
  )
}

export default Collection
