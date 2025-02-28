import NotFoundPage from '../pages/NotFound';
import adminRoutes from './admin.route';
import authRoutes from './auth.route';
import contactRoutes from './contact.route';
import mainRoutes from './main.route';
import productRoutes from './product.route';
import { createBrowserRouter } from 'react-router-dom';

const browserRoutes = createBrowserRouter(
  [
    {
      children: [
        ...mainRoutes,
        ...contactRoutes,
        ...adminRoutes,
        ...authRoutes,
        ...productRoutes,
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  { basename: '/' }
);

export default browserRoutes;
