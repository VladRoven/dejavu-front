import SuspenseWrapper from '../components/SuspenseWrapper';
import { Routes } from '../utils/constants';
import { lazy } from 'react';

const ProductPage = lazy(() => import('pages/Product'));

const productRoutes = [
  {
    path: Routes.Product + '/:id',
    element: (
      <SuspenseWrapper>
        <ProductPage />
      </SuspenseWrapper>
    ),
  },
];

export default productRoutes;
