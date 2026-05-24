const API_BASE_URL = "https://interim-assessment-22047836-1.onrender.com/api";

export const API = {
  // Auth
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  profile: `${API_BASE_URL}/auth/profile`,

  // Crypto
  cryptos: `${API_BASE_URL}/crypto`,
  gainers: `${API_BASE_URL}/crypto/gainers`,
  newListings: `${API_BASE_URL}/crypto/new`,
};