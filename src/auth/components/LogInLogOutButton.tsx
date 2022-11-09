import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { loginPath } from 'src/router/rootConstants';

export const LogInLogOutButton = () => {
  const isAuth = useIsAuthorized();

  const navigate = useNavigate();
  const handleLogOutClick = () => {
    console.log('logOut');
  };
  const handleLogInClick = () => {
    console.log('hey');
    // navigate(loginPath);
  };

  return (
    <ButtonUI
      onClick={isAuth ? handleLogOutClick : handleLogInClick}
      text={isAuth ? 'log out' : 'log in'}
    />
  );
};
