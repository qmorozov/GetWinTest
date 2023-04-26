import axios from 'axios';

const API_URL = 'https://api.prof.world';

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
