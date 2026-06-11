import './AirQuality.css';

function AirQuality({ airQuality }) {
  const pollutants = [
    { name: 'PM2.5', value: airQuality.pollutants.pm25, unit: 'µg/m³' },
    { name: 'PM10', value: airQuality.pollutants.pm10, unit: 'µg/m³' },
    { name: 'Carbon Monoxide', value: airQuality.pollutants.co, unit: 'mg/m³' },
    { name: 'Ozone', value: airQuality.pollutants.o3, unit: 'µg/m³' },
    { name: 'Nitrogen Dioxide', value: airQuality.pollutants.no2, unit: 'µg/m³' },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Air Quality Report</h2>
        <div className="aqi card">
          <div className="aqi__main">
            <div className="aqi__score">
              <span className="aqi__label">Current AQI</span>
              <span className="aqi__value">{airQuality.label}</span>
            </div>
            <p className="aqi__recommendation">{airQuality.recommendation}</p>
          </div>
          <div className="aqi__pollutants">
            <h4>Pollutants</h4>
            <div className="aqi__grid">
              {pollutants.map((p) => (
                <div key={p.name} className="aqi__pollutant">
                  <span>{p.name}</span>
                  <strong>{p.value} {p.unit}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AirQuality;
