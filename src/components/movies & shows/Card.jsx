import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';

import no_image from "../../assets/no-image.jpg";

import './css/Card.css';

const Card = ({ type, card }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      type === "movie" ? navigate(`../movies/${card.id}`) : navigate(`../shows/${card.id}`)
    }, 400);
  };

  return (
    <ButtonBase onClick={handleClick} className='card' >  
      {
        card.poster_path
        ? <img src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`} alt="" />
        : <img src={no_image} alt="" />
      }
    </ButtonBase>
  );
};

export default Card;