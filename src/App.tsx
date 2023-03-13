import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsIdTokenExpired } from 'src/auth/authenticationManager';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { myLocalStorage } from 'src/services/localStorage';
import { WelcomeToHondaTracker } from 'src/welcom/WelcomeToHondaTracker';

export const App = () => {
  useIsIdTokenExpired();

  const isRefreshToken = myLocalStorage.getItem('RefreshToken');

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ButtonAppBar />
        {!isRefreshToken && <WelcomeToHondaTracker />}
        <Outlet />
      </LocalizationProvider>
    </div>
  );
};
