import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsIdTokenExpired } from 'src/auth/authenticationManager';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const App = () => {
  // const isUninitialized = useIsIdTokenExpired();
  useIsIdTokenExpired();
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ButtonAppBar />
        {/*<ButtonAppBar isUninitialized={isUninitialized} />*/}
        <Outlet />
      </LocalizationProvider>
    </div>
  );
};
