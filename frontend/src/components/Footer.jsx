import './Footer.css';

function Footer({ onNavigate }) {
  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Current Weather', id: 'current' },
    { label: 'Forecast', id: 'forecast' },
    { label: 'Weather Alerts', id: 'alerts' },
    { label: 'News', id: 'news' },
    { label: 'About Us', id: 'hero' },
    { label: 'Contact Us', id: 'hero' },
  ];

  const socials = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">🌤️ WeatherInfo</span>
          <p>Accurate weather forecasts and climate insights for cities around the world.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <button type="button" onClick={() => onNavigate(l.id)}>{l.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact Information</h4>
          <p><a href="mailto:support@weatherwebsite.com">support@weatherwebsite.com</a></p>
          <p>+1 234 567 890</p>
        </div>
        <div>
          <h4>Social Media</h4>
          <ul className="footer__social">
            {socials.map((s) => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© 2026 Weather Information Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
