import BackButton from './BackButton';

import './css/Header.css';
import Hero from './Hero';
import WatchlistButton from './WatchlistButton';

const Header = ({type, details, ageRating }) => {
  return (
    <div className="header">
        <div className="buttons">
            <BackButton/>
            <WatchlistButton details={details} type={type}/>
        </div>

        <Hero type={type} details={details} ageRating={ageRating}/>
    </div>
  )
}



export default Header
