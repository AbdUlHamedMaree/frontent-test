import { RouteObject } from 'react-router-dom';
import { FeedsPage } from '$pages/feeds';
import { NotAuthGuard } from '$guards/not-auth';
import { LoginPage } from '$pages/auth/login';
import { SignUpPage } from '$pages/auth/sign-up';
import { MainLayout } from '$layouts/main';
import { AuthGuard } from '$guards/auth';
import { UserProfilePage } from '$pages/user/profile';
import { NotFoundPage } from '$pages/404';
import { NewPostPage } from '$pages/posts/new';

export const routes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <MainLayout>
        <NotAuthGuard />
      </MainLayout>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: 'user',
    element: (
      <MainLayout>
        <AuthGuard />
      </MainLayout>
    ),
    children: [
      {
        path: 'profile',
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <FeedsPage />,
      },
      {
        path: 'posts',
        children: [
          {
            path: 'new',
            element: (
              <AuthGuard>
                <NewPostPage />
              </AuthGuard>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
