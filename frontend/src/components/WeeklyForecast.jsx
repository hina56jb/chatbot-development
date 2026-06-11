import './WeeklyForecast.css';

function WeeklyForecast({ daily }) {
  return (
    <section id="forecast" className="section">
      <div className="container">
        <h2 className="section-title">7-Day Forecast</h2>
        <div className="weekly">
          {daily.map((day) => (
            <div key={day.dayName + day.date} className="weekly__day card">
              <span className="weekly__name">{day.dayName}</span>
              <span className="weekly__icon">{day.icon}</span>
              <span className="weekly__condition">{day.condition}</span>
              <div className="weekly__temps">
                <span className="weekly__high">High: {day.high}°C</span>
                <span className="weekly__low">Low: {day.low}°C</span>
              </div>
              <span className="weekly__rain">Rain: {day.rainChance}%</span>
              <span className="weekly__wind">Wind: {day.windSpeed} km/h</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeeklyForecast;
