import { getWeatherByCity, getPopularCitiesWeather } from '../services/weatherService.js';

export async function getWeather(req, res) {
  try {
    const city = req.params.city || req.query.city;
    if (!city?.trim()) return res.status(400).json({ success: false, message: 'City name is required' });
    const data = await getWeatherByCity(city.trim());
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message || 'City not found' });
  }
}

export async function getPopular(req, res) {
  try {
    const cities = await getPopularCitiesWeather();
    res.json({ success: true, cities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
