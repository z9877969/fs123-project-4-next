// import axios from 'axios';

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

import axios from 'axios';

// Базовий ЮРЛ бека
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';

export const nextServer = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Перехватчик для автоматичного додавання /апи
nextServer.interceptors.request.use((config) => {
  // Якщо аус роути - апі не додаєм, іншим додаєм
  if (config.url && !config.url.startsWith('/auth/')) {
    // Перетворення
    if (!config.url.startsWith('/api')) {
      config.url = `/api${config.url}`;
    }
  }
  return config;
});
