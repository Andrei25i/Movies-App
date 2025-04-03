import React from 'react';
import { ButtonBase } from '@mui/material';

import back_arrow from '../../assets/back_arrow.svg';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    const prev = () => {
        setTimeout(() => {
          navigate(-1);
        }, 300);
    };

  return (
    <ButtonBase onClick={prev} className='button'>
        <img src={back_arrow} alt="" />
    </ButtonBase>
  )
}

export default BackButton;