import { storage } from '$libs/storage';
import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    const accessToken = storage.accessToken.get();
    if (accessToken)
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    return config;
  },
  (err) => Promise.reject(err),
);
