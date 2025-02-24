import NotFoundPage from '../pages/NotFound';
import adminRoutes from './admin.route';
import authRoutes from './auth.route';
import contactRoutes from './contact.route';
import mainRoutes from './main.route';
import { createBrowserRouter } from 'react-router-dom';

const browserRoutes = createBrowserRouter(
  [
    {
      children: [
        ...mainRoutes,
        ...contactRoutes,
        ...adminRoutes,
        ...authRoutes,
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
