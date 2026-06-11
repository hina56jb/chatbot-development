import './HourlyForecast.css';

function HourlyForecast({ hourly }) {
  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title">24-Hour Weather Forecast</h2>
        <div className="hourly">
          {hourly.map((h, i) => (
            <div key={i} className="hourly__item card">
              <span className="hourly__time">{h.time}</span>
              <span className="hourly__icon">{h.icon}</span>
              <span className="hourly__temp">{h.temp}°C</span>
              <span className="hourly__condition">{h.condition}</span>
              <span className="hourly__rain">{h.rainChance}% rain</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HourlyForecast;
