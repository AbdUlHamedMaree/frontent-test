import { request } from '$config/axios';
import { PostModel } from '$models/post';

export type CreatePostRequestBody = Omit<PostModel, 'id' | 'user' | 'userId'>;
export type CreatePostResponse = PostModel;

export const postsApi = {
  getPosts: () => request.get<PostModel[]>('posts'),
  createPost: (data: CreatePostRequestBody) => request.post<CreatePostResponse>('posts', data),
};
