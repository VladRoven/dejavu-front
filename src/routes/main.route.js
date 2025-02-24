import SuspenseWrapper from '../components/SuspenseWrapper';
import { Routes } from '../utils/constants';
import { lazy } from 'react';

const HomePage = lazy(() => import('pages/Home'));

const mainRoutes = [
  {
    path: Routes.Main,
    element: (
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    ),
  },
];

export default mainRoutes;
