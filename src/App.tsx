import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import {
  useCheckIsLoggedIn,
  useIsIdTokenExpired,
} from 'src/auth/authenticationManager';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Loading } from 'src/ui-kit/Loading';

export const App = () => {
  const { isLoading, isSuccess } = useCheckIsLoggedIn();
  // useIsIdTokenExpired();

  return isLoading ? (
    <Loading />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <ButtonAppBar isSuccess={isSuccess} />
        <Outlet />
      </div>
    </LocalizationProvider>
  );
};
