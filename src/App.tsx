import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { WelcomeToHondaTracker } from 'src/WelcomeToHondaTracker';

export const App = () => {
  const isAuth = useIsAuthorized();

  return (
    <React.Fragment>
      <ButtonAppBar />
      {!isAuth && <WelcomeToHondaTracker />}
      <Outlet />
    </React.Fragment>
  );
};
