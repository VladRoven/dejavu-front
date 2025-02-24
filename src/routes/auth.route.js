import SuspenseWrapper from '../components/SuspenseWrapper';
import { Routes } from '../utils/constants';
import { lazy } from 'react';

const SignInPage = lazy(() => import('pages/Login'));
const SignUpPage = lazy(() => import('pages/Signup'));

const authRoutes = [
  {
    path: Routes.SignIn,
    element: (
      <SuspenseWrapper>
        <SignInPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: Routes.SignUp,
    element: (
      <SuspenseWrapper>
        <SignUpPage />
      </SuspenseWrapper>
    ),
  },
];

export default authRoutes;
