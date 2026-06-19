import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: BASE_URL,
  withCredentials: true,
});
