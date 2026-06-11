import './ClimateInsights.css';

const insights = [
  { title: 'Seasonal Patterns', desc: 'Track how temperatures shift across spring, summer, autumn, and winter in your region.', icon: '📊' },
  { title: 'Historical Data', desc: 'Access past weather records to compare current conditions with historical averages.', icon: '📈' },
  { title: 'Temperature Trends', desc: 'Monitor long-term temperature trends to plan outdoor activities with confidence.', icon: '🌡️' },
  { title: 'Rainfall Analysis', desc: 'Understand precipitation patterns and plan ahead for wet or dry seasons.', icon: '💧' },
];

function ClimateInsights() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Climate Trends and Insights</h2>
        <p className="section-subtitle">
          Discover seasonal weather patterns, historical climate data, and temperature trends to better plan your activities.
        </p>
        <div className="insights grid-2">
          {insights.map((item) => (
            <div key={item.title} className="insight card">
              <span className="insight__icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClimateInsights;
