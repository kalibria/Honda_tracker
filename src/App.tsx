import React from 'react';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import LoginForm from 'src/auth/components/loginForm/LoginForm';

export const App = () => {
  // useIsAuthorized();

  return (
    <main className={'mainContainer'}>
      {/*<p>Home page</p>*/}
      <LoginForm />
    </main>
  );
};
