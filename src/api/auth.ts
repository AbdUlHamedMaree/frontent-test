import { request } from '$config/axios';
import { UserModel } from '$models/user';

export type loginRequestBody = {
  username: string;
  password: string;
};

export type loginResponse = {
  user: UserModel;
  accessToken: string;
};

export type signUpRequestBody = {
  username: string;
  name: string;
  password: string;
  picture?: string;
};

export type signUpResponse = {
  user: UserModel;
  accessToken: string;
};

export type meResponse = {
  user: UserModel;
};

export const authApi = {
  login: (body: loginRequestBody) => request.post<loginResponse>('auth/login', body),
  signUp: (body: signUpRequestBody) => request.post<signUpResponse>('auth/sign-up', body),
  me: () => request.get<meResponse>('auth/me'),
};
