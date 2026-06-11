import './TodayHighlights.css';

function TodayHighlights({ highlights }) {
  const items = [
    { label: 'Highest Temperature', value: `${highlights.high}°C`, icon: '🔺' },
    { label: 'Lowest Temperature', value: `${highlights.low}°C`, icon: '🔻' },
    { label: 'UV Index', value: highlights.uvIndex, icon: '☀️' },
    { label: 'Air Quality Index', value: highlights.aqiLabel, icon: '🌬️' },
    { label: 'Chance of Rain', value: `${highlights.rainChance}%`, icon: '🌧️' },
    { label: 'Visibility Level', value: `${highlights.visibility} km`, icon: '👁️' },
  ];

  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title">Today&apos;s Weather Highlights</h2>
        <div className="highlights grid-3">
          {items.map((item) => (
            <div key={item.label} className="highlight card">
              <span className="highlight__icon">{item.icon}</span>
              <span className="highlight__label">{item.label}</span>
              <span className="highlight__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TodayHighlights;
