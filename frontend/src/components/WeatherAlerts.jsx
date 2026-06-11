import './WeatherAlerts.css';

const ALERT_TYPES = [
  { type: 'Thunderstorms', icon: '⛈️' },
  { type: 'Heavy Rainfall', icon: '🌧️' },
  { type: 'Flood Warnings', icon: '🌊' },
  { type: 'Heat Waves', icon: '🔥' },
  { type: 'Strong Winds', icon: '💨' },
  { type: 'Snow Storms', icon: '❄️' },
];

function WeatherAlerts({ alerts }) {
  return (
    <section id="alerts" className="section section--alt">
      <div className="container">
        <h2 className="section-title">Weather Alerts and Warnings</h2>
        <p className="section-subtitle">
          Stay informed about severe weather events including thunderstorms, heavy rainfall, flood warnings, heat waves, strong winds, and snow storms.
        </p>

        <div className="alert-types grid-3">
          {ALERT_TYPES.map((a) => (
            <div key={a.type} className="alert-type card">
              <span>{a.icon}</span>
              <span>{a.type}</span>
            </div>
          ))}
        </div>

        <div className="active-alerts">
          <h3>Active Alerts</h3>
          {alerts.map((alert, i) => (
            <div key={i} className={`active-alert active-alert--${alert.severity.toLowerCase()}`}>
              <strong>{alert.type}</strong>
              <span className="active-alert__severity">{alert.severity}</span>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeatherAlerts;
