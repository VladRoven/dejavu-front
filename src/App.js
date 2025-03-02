import theme from './assets/mui.theme';
import ConfirmationModal from './components/ConfirmationModal';
import browserRoutes from './routes/browser.route';
import CatalogStore from './stores/catalog.store';
import PageStore from './stores/page.store';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = observer(() => {
  useEffect(() => {
    CatalogStore.getCategories();
  }, []);

  useEffect(() => {
    if (PageStore.popupMessage) {
      toast[PageStore.popupMessage.type](PageStore.popupMessage?.message);
    }
  }, [PageStore.popupMessage]);

  return (
    <ThemeProvider theme={theme()}>
      <ConfirmationModal />
      <ToastContainer limit={3} draggable />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={browserRoutes} />
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export default App;
