import './Header.css';

function Header({ onNavigate }) {
  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Current Weather', id: 'current' },
    { label: 'Forecast', id: 'forecast' },
    { label: 'Alerts', id: 'alerts' },
    { label: 'News', id: 'news' },
  ];

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__brand" onClick={() => onNavigate('hero')}>
          <span className="header__icon">🌤️</span>
          <span>WeatherInfo</span>
        </div>
        <nav className="header__nav">
          {links.map((l) => (
            <button key={l.id} type="button" onClick={() => onNavigate(l.id)}>{l.label}</button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
