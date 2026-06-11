import './CurrentWeather.css';

function CurrentWeather({ data }) {
  const { current, city, country } = data;

  const stats = [
    { label: 'Feels Like', value: `${current.feelsLike}°C` },
    { label: 'Humidity', value: `${current.humidity}%` },
    { label: 'Wind Speed', value: `${current.windSpeed} km/h` },
    { label: 'Visibility', value: `${current.visibility} km` },
    { label: 'Air Pressure', value: `${current.pressure} hPa` },
    { label: 'Sunrise', value: current.sunrise },
    { label: 'Sunset', value: current.sunset },
  ];

  return (
    <section id="current" className="section">
      <div className="container">
        <h2 className="section-title">Current Weather Conditions</h2>
        <div className="current card">
          <div className="current__main">
            <div className="current__location">
              <h3>{city}{country ? `, ${country}` : ''}</h3>
              <p className="current__condition">{current.condition}</p>
            </div>
            <div className="current__temp-block">
              <span className="current__icon">{current.icon}</span>
              <span className="current__temp">{current.temp}°C</span>
            </div>
          </div>
          <div className="current__stats grid-4">
            {stats.map((s) => (
              <div key={s.label} className="current__stat">
                <span className="current__stat-label">{s.label}</span>
                <span className="current__stat-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
