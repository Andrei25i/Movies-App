import { forwardRef } from 'react';
import Card from './Card';

import scroll_left from '../../assets/scroll-left.svg';
import scroll_right from '../../assets/scroll-right.svg';

import './css/Category.css';
import { ButtonBase } from '@mui/material';

const Category = forwardRef(({ type, title, category }, ref) => {
  if (!category || category.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollLeft -= 1000;
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollLeft += 1000;
    }
  };

  return (
    <div className="category">
        <h2>{title}</h2>
        <div className="cards-wrapper">
          <div className="button">
            <ButtonBase onClick={scrollLeft} className='scroll-button'><img src={scroll_left} alt="" /></ButtonBase>
          </div>
        
          <div className="cards" ref={ref}>
            {category.map((item, index) => (
              <Card type={type} key={index} card={item} />
            ))}
          </div>

          <div className="button">
            <ButtonBase onClick={scrollRight} className='scroll-button'><img src={scroll_right} alt="" /></ButtonBase>
          </div>
          
        </div>
        
    </div>
  );
});

export default Category;