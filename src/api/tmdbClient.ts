import axios from 'axios';

const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    language: 'ko-KR', // Default to Korean
  },
});

tmdbClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (apiKey) {
    config.params = { ...config.params, api_key: apiKey };
  }
  return config;
});

export default tmdbClient;
