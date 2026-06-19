import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL + 'api';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
