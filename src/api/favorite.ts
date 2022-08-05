import { request } from '$config/axios';

export const favoritesApi = {
  getMyFavorites: () => request.get<string[]>('favorites'),
  isFavorite: (id: string) => request.get<boolean>(`favorites/${id}`),
  toggleFavorite: (id: string) => request.put(`favorites/${id}`),
};
