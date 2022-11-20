import React, { useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';
import { welcomePath } from 'src/router/rootConstants';
import { myLocalStorage } from 'src/services/localStorage';

export const App = () => {
  const isAuth = myLocalStorage.isAuth();
  useCheckIsLoggedIn();

  // useEffect(() => {
  //   if (isAuth) {
  //   } else {
  //     redirect(welcomePath);
  //   }
  // }, [isAuth]);

  return (
    <React.Fragment>
      <div>
        <ButtonAppBar />
        <Outlet />
      </div>
    </React.Fragment>
  );
};
