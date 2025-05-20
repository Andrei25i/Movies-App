import './css/Overview.css';

const Overview = ({ details }) => {
  return (
    <section>
        <h2>Overview</h2>
        <div className="overview">  
          <div className="text-container">
              <p>{details.overview}</p>
          </div>
        </div>
    </section>
  )
}

export default Overview;
