import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api.prof.world/v2.0/profile',
  headers: {
    'Content-type': 'application/json',
  },
});
