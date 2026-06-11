import './PopularCities.css';

function PopularCities({ cities, onSelect }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Weather in Popular Cities</h2>
        <div className="cities grid-3">
          {cities.map((c) => (
            <div key={c.city} className="city card">
              <div className="city__header">
                <span className="city__icon">{c.icon}</span>
                <div>
                  <h3>{c.city}</h3>
                  <p>{c.condition}</p>
                </div>
              </div>
              <span className="city__temp">{c.temp}°C</span>
              <button type="button" className="city__btn" onClick={() => onSelect(c.city)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCities;
