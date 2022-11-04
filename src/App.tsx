import React from 'react';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { MainPage } from 'src/mainPage/MainPage';

export const App = () => {
  return (
    <main className={'mainContainer'}>
      <LoginForm />
      {/*<MainPage />*/}
    </main>
  );
};
