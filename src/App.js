import theme from './assets/mui.theme';
import browserRoutes from './routes/browser.route';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

const App = observer(() => {
  return (
    <ThemeProvider theme={theme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={browserRoutes} />
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export default App;
