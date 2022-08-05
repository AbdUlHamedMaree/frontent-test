import { UserModel } from '$models/user';

export const createStorage = <T>(key: string) => ({
  get: () => {
    const json = window.localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json) as T;
  },
  set: (item: T) => window.localStorage.setItem(key, JSON.stringify(item)),
  remove: () => window.localStorage.removeItem(key),
});

export const storage = {
  user: createStorage<UserModel>('app-user'),
  accessToken: createStorage<string>('app-access-token'),
};
