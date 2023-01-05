import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { WelcomeToHondaTracker } from 'src/welcom/WelcomeToHondaTracker';

export const App = () => {
  useCheckIsLoggedIn();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <ButtonAppBar />
        <Outlet />
      </div>
    </LocalizationProvider>
  );
};
