import './Hero.css';

function Hero({ searchInput, setSearchInput, onSearch, loading }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="container hero__content">
        <h1>Accurate Weather Forecasts at Your Fingertips</h1>
        <p className="hero__subtitle">
          Stay informed with real-time weather updates, detailed forecasts, and climate insights for cities around the world.
        </p>
        <form className="hero__search" onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Check Weather'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
