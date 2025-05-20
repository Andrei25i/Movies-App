import { ButtonBase } from "@mui/material";
import { useLocation } from "react-router-dom";

const Hero = ({ type, details, ageRating }) => {
  const location = useLocation();

  let title, releaseYear, runtime;
  if (type === "movie") {
    title = details.title;
    releaseYear = details.release_date && details.release_date.slice(0, 4);
    runtime = formatTime(details.runtime);
  } else {
    title = details.name;
    releaseYear = `${
      details.first_air_date && details.first_air_date.slice(0, 4)
    } ${details.last_air_date ? "-" + details.last_air_date.slice(0, 4) : ""}`;
    if (details.number_of_seasons === 1)
      if (runtime) runtime = `${details.number_of_seasons} season`;
      else runtime = `${details.number_of_seasons} seasons`;
  }

  return (
    <div className="hero">
      <ButtonBase className="ripple" disabled={location.pathname.includes("movies/") || location.pathname.includes("shows/")}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${details?.backdrop_path}`}
          alt="Backdrop"
        />

        <div className="title">
          <h1>{title}</h1>
          <div className="main-info">
            <p>{releaseYear}</p>
            <p>{runtime}</p>
            {ageRating ? (
              <div className="highlighted">
                <p>{ageRating}</p>
              </div>
            ) : undefined}
          </div>
        </div>  
      </ButtonBase>
    </div>
  );
};

const formatTime = (runtime) => {
  if (!runtime) return "";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

export default Hero;
