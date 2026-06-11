import './WeatherMap.css';

function WeatherMap({ coords, city }) {
  const mapUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.5}%2C${coords.lat - 0.3}%2C${coords.lon + 0.5}%2C${coords.lat + 0.3}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`
    : null;

  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title">Interactive Weather Map</h2>
        <p className="section-subtitle">
          Explore live weather conditions including cloud coverage, precipitation, temperature, and wind patterns across different regions.
        </p>
        <div className="map card">
          {mapUrl ? (
            <iframe
              title={`Weather map for ${city}`}
              src={mapUrl}
              className="map__iframe"
              loading="lazy"
            />
          ) : (
            <div className="map__placeholder">
              <span>🗺️</span>
              <p>Search a city to view the weather map</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WeatherMap;
