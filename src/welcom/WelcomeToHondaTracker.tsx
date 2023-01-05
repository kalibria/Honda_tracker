import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPath, signUpForm } from 'src/router/rootConstants';
import { myLocalStorage } from 'src/services/localStorage';

export const WelcomeToHondaTracker = () => {
  const isRefreshToken = myLocalStorage.getItem('RefreshToken');
  const isAccessToken = sessionStorage.getItem('AccessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (isRefreshToken && isAccessToken) {
      console.log('isRefreshToken', isRefreshToken);
      console.log('isAccessToken', isAccessToken);
      navigate(loginPath);
    } else navigate(signUpForm);
  }, [isRefreshToken, isAccessToken, navigate]);

  return <div className={'mainContainer'}></div>;
};
