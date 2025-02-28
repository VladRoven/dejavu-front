import theme from './assets/mui.theme';
import ConfirmationModal from './components/ConfirmationModal';
import browserRoutes from './routes/browser.route';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

const App = observer(() => {
  return (
    <ThemeProvider theme={theme()}>
      <ConfirmationModal />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={browserRoutes} />
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export default App;
