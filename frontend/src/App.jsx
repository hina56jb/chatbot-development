import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from './services/api';
import Header from './components/Header';
import Hero from './components/Hero';
import CurrentWeather from './components/CurrentWeather';
import TodayHighlights from './components/TodayHighlights';
import WeeklyForecast from './components/WeeklyForecast';
import HourlyForecast from './components/HourlyForecast';
import AirQuality from './components/AirQuality';
import WeatherMap from './components/WeatherMap';
import PopularCities from './components/PopularCities';
import WeatherAlerts from './components/WeatherAlerts';
import ClimateInsights from './components/ClimateInsights';
import NewsSection from './components/NewsSection';
import AppPromotion from './components/AppPromotion';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = useCallback(async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await weatherApi.getWeather(cityName);
      setWeather(res.data);
      setCity(res.data.city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather('London');
    weatherApi.getPopular().then((res) => setPopular(res.cities)).catch(() => {});
  }, [fetchWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) fetchWeather(searchInput.trim());
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="app">
      <Header onNavigate={scrollTo} />
      <Hero
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <div className="error-banner">{error}</div>}

      {weather && !loading && (
        <>
          <CurrentWeather data={weather} />
          <TodayHighlights highlights={weather.highlights} />
          <WeeklyForecast daily={weather.daily} />
          <HourlyForecast hourly={weather.hourly} />
          <AirQuality airQuality={weather.airQuality} />
          <WeatherMap coords={weather.coords} city={weather.city} />
        </>
      )}

      {loading && <div className="loading-state">Loading weather data...</div>}

      <PopularCities cities={popular} onSelect={fetchWeather} />
      {weather && <WeatherAlerts alerts={weather.alerts} />}
      <ClimateInsights />
      <NewsSection />
      <AppPromotion />
      <Testimonials />
      <FAQ />
      <Footer onNavigate={scrollTo} />
    </div>
  );
}

export default App;
