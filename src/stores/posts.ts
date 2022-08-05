import { createStore } from '$config/zustand';
import type { PostModel } from '$models/post';

export type PostsStoreModel = {
  posts: PostModel[] | null;
  setPosts: (posts: PostModel[]) => void;
};

export const usePostsStore = createStore<PostsStoreModel>((set) => ({
  posts: null,
  setPosts: (posts) => set((s) => void (s.posts = posts)),
}));
