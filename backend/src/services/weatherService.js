const BASE = 'https://api.openweathermap.org';
const GEO = 'https://api.openweathermap.org/geo/1.0';

const POPULAR_CITIES = [
  'London', 'New York', 'Dubai', 'Tokyo', 'Paris',
  'Sydney', 'Islamabad', 'Lahore', 'Karachi', 'Faisalabad',
];

function hasApiKey() {
  return process.env.OPENWEATHER_API_KEY && process.env.OPENWEATHER_API_KEY !== 'your-openweather-api-key-here';
}

async function owFetch(path, params = {}) {
  if (!hasApiKey()) return null;
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('appid', process.env.OPENWEATHER_API_KEY);
  url.searchParams.set('units', 'metric');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

async function geocode(city) {
  if (!hasApiKey()) return null;
  const url = new URL(`${GEO}/direct`);
  url.searchParams.set('q', city);
  url.searchParams.set('limit', '1');
  url.searchParams.set('appid', process.env.OPENWEATHER_API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error('City not found');
  const data = await res.json();
  if (!data.length) throw new Error('City not found');
  return data[0];
}

function getWeatherIcon(condition) {
  const map = {
    Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
    Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️', Haze: '🌫️',
  };
  return map[condition] || '🌤️';
}

function getAqiLabel(aqi) {
  const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return labels[aqi - 1] || 'Moderate';
}

function getAqiRecommendation(aqi) {
  if (aqi <= 2) return 'Air quality is good. Enjoy outdoor activities.';
  if (aqi === 3) return 'Air quality is acceptable for most individuals.';
  if (aqi === 4) return 'Sensitive groups should reduce outdoor exertion.';
  return 'Health alert: everyone may experience health effects.';
}

function groupForecastByDay(list) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  return Object.entries(days).slice(0, 7).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const highs = items.map((i) => i.main.temp_max);
    const lows = items.map((i) => i.main.temp_min);
    const rainItems = items.filter((i) => i.pop > 0);
    const main = items[Math.floor(items.length / 2)];

    return {
      date,
      dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
      icon: getWeatherIcon(main.weather[0].main),
      condition: main.weather[0].description,
      high: Math.round(Math.max(...highs)),
      low: Math.round(Math.min(...lows)),
      rainChance: Math.round(Math.max(...items.map((i) => i.pop)) * 100),
      windSpeed: Math.round(items[0].wind.speed * 3.6),
    };
  });
}

function buildDemoWeather(city) {
  const base = city.charCodeAt(0) % 10;
  return {
    city,
    country: 'Demo',
    demo: true,
    current: {
      temp: 22 + base,
      feelsLike: 24 + base,
      condition: 'Partly Cloudy',
      icon: '🌤️',
      humidity: 55 + base * 2,
      windSpeed: 10 + base,
      visibility: 10,
      pressure: 1013,
      sunrise: '06:15 AM',
      sunset: '07:45 PM',
    },
    highlights: {
      high: 30 + base,
      low: 18 + base,
      uvIndex: 6,
      aqi: 3,
      aqiLabel: 'Moderate',
      rainChance: 15 + base * 3,
      visibility: 10,
    },
    hourly: Array.from({ length: 8 }, (_, i) => ({
      time: `${9 + i * 3}:00 ${i < 4 ? 'AM' : 'PM'}`.replace(/^(\d+)/, (m) => {
        const h = 9 + i * 3;
        return h > 12 ? `${h - 12}` : `${h}`;
      }),
      temp: 24 + base + i,
      condition: i % 2 === 0 ? 'Sunny' : 'Partly Cloudy',
      icon: i % 2 === 0 ? '☀️' : '🌤️',
      rainChance: 5 + i * 2,
    })),
    daily: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => ({
      dayName: day,
      icon: ['☀️', '🌤️', '🌧️', '⛅', '☀️', '🌦️', '☁️'][i],
      condition: ['Sunny', 'Partly Cloudy', 'Light Rain', 'Cloudy', 'Sunny', 'Showers', 'Overcast'][i],
      high: 32 + base - i,
      low: 22 + base - i,
      rainChance: [5, 10, 40, 20, 5, 35, 15][i],
      windSpeed: 12 + i,
    })),
    airQuality: {
      aqi: 3,
      label: 'Moderate',
      recommendation: 'Air quality is acceptable for most individuals.',
      pollutants: { pm25: 18, pm10: 32, co: 0.4, o3: 45, no2: 22 },
    },
    alerts: [
      { type: 'Heat Wave', severity: 'Moderate', message: 'High temperatures expected this afternoon.' },
    ],
    coords: { lat: 33.6844 + base * 0.1, lon: 73.0479 + base * 0.1 },
  };
}

export async function getWeatherByCity(city) {
  if (!hasApiKey()) return buildDemoWeather(city);

  const geo = await geocode(city);
  const [current, forecast, airPollution] = await Promise.all([
    owFetch('/data/2.5/weather', { lat: geo.lat, lon: geo.lon }),
    owFetch('/data/2.5/forecast', { lat: geo.lat, lon: geo.lon }),
    owFetch('/data/2.5/air_pollution', { lat: geo.lat, lon: geo.lon }),
  ]);

  const aqi = airPollution?.list?.[0]?.main?.aqi || 3;
  const components = airPollution?.list?.[0]?.components || {};

  const todayItems = forecast.list.filter((item) => {
    const d = new Date(item.dt * 1000).toDateString();
    return d === new Date().toDateString();
  });

  const todayHighs = todayItems.length ? todayItems.map((i) => i.main.temp_max) : [current.main.temp_max];
  const todayLows = todayItems.length ? todayItems.map((i) => i.main.temp_min) : [current.main.temp_min];

  const hourly = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].description,
    icon: getWeatherIcon(item.weather[0].main),
    rainChance: Math.round(item.pop * 100),
  }));

  return {
    city: geo.name,
    country: geo.country,
    demo: false,
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      condition: current.weather[0].description,
      icon: getWeatherIcon(current.weather[0].main),
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6),
      visibility: Math.round((current.visibility || 10000) / 1000),
      pressure: current.main.pressure,
      sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
    highlights: {
      high: Math.round(Math.max(...todayHighs)),
      low: Math.round(Math.min(...todayLows)),
      uvIndex: Math.min(11, Math.round((current.main.temp - 10) / 3)),
      aqi,
      aqiLabel: getAqiLabel(aqi),
      rainChance: Math.round(Math.max(...forecast.list.slice(0, 8).map((i) => i.pop)) * 100),
      visibility: Math.round((current.visibility || 10000) / 1000),
    },
    hourly,
    daily: groupForecastByDay(forecast.list),
    airQuality: {
      aqi,
      label: getAqiLabel(aqi),
      recommendation: getAqiRecommendation(aqi),
      pollutants: {
        pm25: Math.round(components.pm2_5 || 0),
        pm10: Math.round(components.pm10 || 0),
        co: Number((components.co / 1000 || 0).toFixed(2)),
        o3: Math.round(components.o3 || 0),
        no2: Math.round(components.no2 || 0),
      },
    },
    alerts: buildAlerts(current, forecast),
    coords: { lat: geo.lat, lon: geo.lon },
  };
}

function buildAlerts(current, forecast) {
  const alerts = [];
  const temp = current.main.temp;
  const wind = current.wind.speed * 3.6;
  const rain = forecast.list.slice(0, 8).some((i) => i.pop > 0.7);

  if (temp > 35) alerts.push({ type: 'Heat Wave', severity: 'High', message: 'Extreme heat expected. Stay hydrated and avoid prolonged sun exposure.' });
  if (wind > 50) alerts.push({ type: 'Strong Winds', severity: 'Moderate', message: 'Strong wind gusts expected. Secure loose outdoor items.' });
  if (rain) alerts.push({ type: 'Heavy Rainfall', severity: 'Moderate', message: 'Heavy rainfall expected in the next 24 hours.' });
  if (current.weather[0].main === 'Thunderstorm') alerts.push({ type: 'Thunderstorms', severity: 'High', message: 'Thunderstorm activity detected. Seek shelter indoors.' });

  return alerts.length ? alerts : [{ type: 'No Active Alerts', severity: 'Low', message: 'No severe weather warnings for your area at this time.' }];
}

export async function getPopularCitiesWeather() {
  const results = await Promise.all(
    POPULAR_CITIES.map(async (city) => {
      try {
        const data = await getWeatherByCity(city);
        return {
          city: data.city,
          country: data.country,
          temp: data.current.temp,
          condition: data.current.condition,
          icon: data.current.icon,
        };
      } catch {
        const demo = buildDemoWeather(city);
        return { city, country: demo.country, temp: demo.current.temp, condition: demo.current.condition, icon: demo.current.icon };
      }
    }),
  );
  return results;
}

export { POPULAR_CITIES };
