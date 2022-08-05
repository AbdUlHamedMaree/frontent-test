import { createStore } from '$config/zustand';
import { storage } from '$libs/storage';
import type { UserModel } from '$models/user';

export type AuthStoreModel = {
  isAuth: boolean;
  user: null | UserModel;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: UserModel | null) => void;
};

const user = storage.user.get();
export const useAuthStore = createStore<AuthStoreModel>((set) => ({
  isAuth: !!user,
  user,
  setIsAuth: (isAuth) => set((s) => void (s.isAuth = isAuth)),
  setUser: (user) => {
    if (user) storage.user.set(user);
    else storage.user.remove();
    set((s) => void (s.user = user));
  },
}));
