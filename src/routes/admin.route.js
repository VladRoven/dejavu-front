import SuspenseWrapper from '../components/SuspenseWrapper';
import { Routes } from '../utils/constants';
import { lazy } from 'react';

const AdminProductsPage = lazy(() => import('pages/AdminProducts'));

const adminRoutes = [
  {
    path: Routes.Admin,
    element: (
      <SuspenseWrapper>
        <AdminProductsPage />
      </SuspenseWrapper>
    ),
  },
];

export default adminRoutes;
