import React, { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';

export const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/calendar');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <main className={'mainContainer'}>
      <ScrollRestoration
        getKey={(location, matches) => {
          // default behavior
          console.log('locationKey', location.pathname);
          return location.key;
        }}
      />
      <LoginForm />
    </main>
  );
};
