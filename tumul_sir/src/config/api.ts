// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:3001';

// Helper function to get full API endpoint
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl,
};
