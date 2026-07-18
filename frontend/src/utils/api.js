const getApiBase = () => {
  let url = import.meta.env.VITE_API_URL || (window.location.hostname.includes('localhost') ? 'http://localhost:5000/api' : '/api');
  
  // Replace localhost inside base URL if client accesses the app from a network IP
  if (url.includes('localhost') && window.location.hostname !== 'localhost') {
    url = url.replace('localhost', window.location.hostname);
  }
  return url;
};

export const API_BASE = getApiBase();
// If running on Vercel (where API_BASE defaults to '/api'), connect socket directly to VPS IP
// since Vercel's rewrite proxies do not support WebSocket connections.
export const SOCKET_URL = API_BASE === '/api'
  ? 'http://187.77.126.26:5000'
  : API_BASE.replace('/api', '');
