
const config = {
  apiUrl: window.API_URL || import.meta.env.VITE_API_URL,
  authToken: window.AUTH_TOKEN || import.meta.env.VITE_AUTH_TOKEN
};

export default config;