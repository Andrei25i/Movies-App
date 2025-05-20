import "./css/Cast.css";
import { ButtonBase } from '@mui/material';
import scroll_left from '../../assets/scroll-left.svg';
import scroll_right from '../../assets/scroll-right.svg';
import { act, useRef } from "react";
import no_image from "../../assets/no-image.jpg";

const Cast = ({ cast }) => {
    if (cast.length === 0) return <></>;

    const ref = useRef();
  
    const scrollLeft = () => {
        if (ref.current) {
        ref.current.scrollLeft -= 400;
        }
    };

    const scrollRight = () => {
        if (ref.current) {
        ref.current.scrollLeft += 400;
        }
    };

  return (
    <section>
      <h2>Cast</h2>
        

        <div className="cast-container">
            <div className="button">
                <ButtonBase onClick={scrollLeft} className='scroll-button'><img src={scroll_left} alt="Scroll Left" /></ButtonBase>
            </div>

            <div className="actors-container" ref={ref}>
                {cast.map((actor, index) => {
                    return (
                    <div className="actor" key={index}>
                        { actor.profile_path 
                            ? <img src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`} alt="" />
                            : <img src={no_image} alt="" /> }
                        <p className="name">{actor.name}</p>
                        <p className="character">{actor.character}</p>
                    </div>
                    );
                })}
            </div>

            <div className="button">
                <ButtonBase onClick={scrollRight} className='scroll-button'><img src={scroll_right} alt="Scroll Right" /></ButtonBase>
            </div>
        </div>

        
    </section>
  );
};

export default Cast;
