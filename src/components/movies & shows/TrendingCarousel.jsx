import { useEffect, useState } from "react";
import "./css/TrendingCarousel.css";
import Hero from "./Hero";
import { useNavigate } from "react-router-dom";

const TrendingCarousel = ({ movies, type }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [movies, current]);

  const handleClick = () => {
    setTimeout(() => {
      type === "movie" ? navigate(`../movies/${movies[current].id}`) : navigate(`../shows/${movies[current].id}`);
    }, 400);
  };
  
  if (!movies || movies.length === 0) return null;
  return (
    <div className="trending-carousel">
        <h2>Featured</h2>
        <div className="carousel" onClick={handleClick}>
            <Hero type={type} details={movies[current]}/>
        </div>
      
      <div className="carousel-dots">
        {movies.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => {setCurrent(index)}}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
