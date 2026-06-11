import './NewsSection.css';

const articles = [
  { title: 'Upcoming Weather Changes', category: 'Forecast', date: 'Mar 11, 2026', excerpt: 'Meteorologists predict a significant shift in weather patterns across Europe this week.' },
  { title: 'Regional Forecast Updates', category: 'Regional', date: 'Mar 10, 2026', excerpt: 'South Asia expected to experience above-average temperatures over the next fortnight.' },
  { title: 'Climate Change Reports', category: 'Climate', date: 'Mar 9, 2026', excerpt: 'New study highlights accelerating global temperature trends and their regional impact.' },
  { title: 'Extreme Weather Events', category: 'Alerts', date: 'Mar 8, 2026', excerpt: 'Record-breaking rainfall recorded in multiple regions; authorities issue flood advisories.' },
];

function NewsSection() {
  return (
    <section id="news" className="section section--alt">
      <div className="container">
        <h2 className="section-title">Latest Weather News</h2>
        <div className="news grid-2">
          {articles.map((a) => (
            <article key={a.title} className="news__article card">
              <span className="news__category">{a.category}</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <time>{a.date}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
