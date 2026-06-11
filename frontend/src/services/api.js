const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const weatherApi = {
  getWeather: (city) => request(`/weather/${encodeURIComponent(city)}`),
  getPopular: () => request('/weather/popular'),
};
