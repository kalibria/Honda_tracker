import React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';

export const App = () => {
  useCheckIsLoggedIn();

  return (
    <React.Fragment>
      <div>
        <ButtonAppBar />
        <Outlet />
      </div>
    </React.Fragment>
  );
};
