import { UserModel } from './user';

export type PostModel = {
  id: string;
  content: string;
  image: string;
  category: string;
  userId: string;
  user?: UserModel;
};
