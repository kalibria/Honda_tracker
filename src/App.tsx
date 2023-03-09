import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsIdTokenExpired } from 'src/auth/authenticationManager';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { welcomePath } from 'src/router/rootConstants';

export const App = () => {
  useIsIdTokenExpired();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(welcomePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ButtonAppBar />
        <Outlet />
      </LocalizationProvider>
    </div>
  );
};
