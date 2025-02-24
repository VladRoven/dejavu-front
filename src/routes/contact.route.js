import SuspenseWrapper from '../components/SuspenseWrapper';
import { Routes } from '../utils/constants';
import { lazy } from 'react';

const ContactPage = lazy(() => import('pages/contact'));

const contactRoutes = [
  {
    path: Routes.Contact,
    element: (
      <SuspenseWrapper>
        <ContactPage />
      </SuspenseWrapper>
    ),
  },
];

export default contactRoutes;
