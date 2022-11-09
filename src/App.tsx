import React from 'react';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { calendarPath } from 'src/router/rootConstants';

export const App = () => {
  return (
    <React.Fragment>
      <ButtonAppBar />
      {/*<main className={'mainContainer'}>*/}
      {/*  <LoginForm />*/}
      {/*</main>*/}
    </React.Fragment>
  );
};
