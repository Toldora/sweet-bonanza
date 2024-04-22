import axios from 'axios';

export const oneSignalApi = axios.create({
  baseURL: import.meta.env.VITE_ONE_SIGNAL_API_URL,
});
