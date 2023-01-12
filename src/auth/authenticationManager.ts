import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';
import { loginPath, welcomePath } from 'src/router/rootConstants';
import {
  useGetMeQuery,
  useLazyGetIdAccessTokenQuery,
} from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';

class AuthenticationManager {
  setUnauthenticated(dispatch: Dispatch) {
    myLocalStorage.logOut();

    dispatch(logOut());
  }

  setAuthenticated(dispatch: Dispatch, username: string) {
    myLocalStorage.setItem('isAuthenticated', 'true');

    dispatch(setIsAuthenticated(username));
  }
}

export const authenticationManager = new AuthenticationManager();

export const useCheckMe = (path: string) => {
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useGetMeQuery({});
  const [username, setUserName] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setUserName(data.username);
      navigate(path);
    } else if (isError) {
      navigate(loginPath);
    }
  }, [data, isError, isSuccess, navigate, path]);

  return username;
};

export const useCheckIsLoggedIn = () => {
  const isRefreshToken = myLocalStorage.isRefreshToken();
  const [trigger, result] = useLazyGetIdAccessTokenQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isRefreshToken) {
      setIsLoading(true);
      trigger({});
      if (result.isSuccess) {
        setIsLoading(false);
        setIsSuccess(true);
        sessionStorage.setItem('idToken', result.currentData.IdToken);
        sessionStorage.setItem('AccessToken', result.currentData.AccessToken);
      } else if (result.isError) {
        setIsLoading(false);
        setIsSuccess(false);
      }
    } else {
      navigate(welcomePath, { state: pathname });
    }
  }, [
    isRefreshToken,
    navigate,
    pathname,
    result.isError,
    result.isSuccess,
    trigger,
  ]);

  return { isLoading, isSuccess };
};
