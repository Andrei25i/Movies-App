import { useEffect, useState } from "react";
import "./css/TrendingCarousel.css";
import Hero from "./Hero";
import { useNavigate } from "react-router-dom";

const TrendingCarousel = ({ movies, type }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 350); // durata fade-out
    }, 10000);
    return () => clearInterval(interval);
  }, [movies, current]);

  const handleClick = () => {
    setTimeout(() => {
      type === "movie"
        ? navigate(`../movies/${movies[current].id}`)
        : navigate(`../shows/${movies[current].id}`);
    }, 400);
  };

  const handleDotClick = (index) => {
    if (index === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 500);
  };

  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 350);
    } else if (diff < -50) {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
        setFade(true);
      }, 350);
    }
    setTouchStartX(null);
  };

  if (!movies || movies.length === 0) return null;
  return (
    <div className="trending-carousel">
      <h2>Featured</h2>
      <div
        className={`carousel fade-slide${fade ? " visible" : ""}`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Hero type={type} details={movies[current]} />
      </div>
      <div className="carousel-dots">
        {movies.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
