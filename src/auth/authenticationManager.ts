import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';
import { loginPath, welcomePath } from 'src/router/rootConstants';
import {
  useGetMeQuery,
  useLazyGetIdAccessTokenQuery,
  useLazyLogOutQuery,
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
  const [refreshTokenTrigger, refreshTokenTriggerResult] =
    useLazyGetIdAccessTokenQuery();
  const [triggerLogOut, logoutResult] = useLazyLogOutQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isRefreshToken) {
      setIsLoading(true);
      refreshTokenTrigger({});
      if (refreshTokenTriggerResult.isSuccess) {
        setIsLoading(false);
        setIsSuccess(true);
        sessionStorage.setItem(
          'idToken',
          refreshTokenTriggerResult.currentData.IdToken,
        );
        sessionStorage.setItem(
          'AccessToken',
          refreshTokenTriggerResult.currentData.AccessToken,
        );
      } else if (refreshTokenTriggerResult.isError) {
        setIsLoading(false);
        setIsSuccess(false);
      }
    } else {
      setIsLoading(false);
      setIsSuccess(false);

      navigate(welcomePath, { state: pathname });
    }
  }, [
    isRefreshToken,
    navigate,
    pathname,
    refreshTokenTriggerResult.isError,
    refreshTokenTriggerResult.isSuccess,
    refreshTokenTrigger,
  ]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('AccessToken');
    if (!isRefreshToken && accessToken) {
      setIsLoading(false);
      setIsSuccess(false);

      triggerLogOut({ accessToken: accessToken });
    }
  }, [isRefreshToken, triggerLogOut]);

  return { isLoading, isSuccess };
};

export function decodeToken(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  const { exp } = JSON.parse(jsonPayload);
  console.log('exp', exp);
  return exp;
}

export const isTokenExpired = (decodeToken: number) => {
  const timeMsUntilTokenExpires = 5 * 60 * 1000;
  const isTimeUp = decodeToken * 1000 - timeMsUntilTokenExpires;
  const expired = Date.now() >= decodeToken * 1000 || Date.now() === isTimeUp;

  return expired;
};

export function useIsIdTokenExpired() {
  let currentIdToken = sessionStorage.getItem('idToken');
  const [refreshTokenTrigger, refreshTokenTriggerResult] =
    useLazyGetIdAccessTokenQuery();

  useEffect(() => {
    if (currentIdToken) {
      let isIdTokenExpired = isTokenExpired(decodeToken(currentIdToken));

      if (isIdTokenExpired) {
        refreshTokenTrigger({});
        if (refreshTokenTriggerResult.isSuccess) {
          sessionStorage.setItem(
            'idToken',
            refreshTokenTriggerResult.currentData.IdToken,
          );
          sessionStorage.setItem(
            'AccessToken',
            refreshTokenTriggerResult.currentData.AccessToken,
          );
        }
      }
    }
  }, [
    currentIdToken,
    refreshTokenTriggerResult.currentData,
    refreshTokenTriggerResult.isSuccess,
  ]);
}
