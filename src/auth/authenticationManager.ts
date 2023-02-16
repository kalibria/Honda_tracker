import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';

import { welcomePath } from 'src/router/rootConstants';
import {
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

export const useCheckIsLoggedIn = () => {
  const isRefreshToken = myLocalStorage.isRefreshToken();
  const [refreshTokenTrigger, refreshTokenTriggerResult] =
    useLazyGetIdAccessTokenQuery();
  const [triggerLogOut] = useLazyLogOutQuery();
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
          'IdToken',
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
  return exp;
}

export const isTokenExpired = (tokenExpirationTimestamp: number) => {
  const timeMsUntilTokenExpires = 5 * 60 * 1000;
  const isTimeUp = tokenExpirationTimestamp * 1000 - timeMsUntilTokenExpires;
  const expired =
    Date.now() >= tokenExpirationTimestamp * 1000 || Date.now() >= isTimeUp;

  return expired;
};

export function useIsIdTokenExpired() {
  const currentIdToken = sessionStorage.getItem('IdToken');
  const [refreshTokenTrigger, refreshTokenTriggerResult] =
    useLazyGetIdAccessTokenQuery();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentIdToken) {
      let isIdTokenExpired = isTokenExpired(decodeToken(currentIdToken));

      if (isIdTokenExpired) {
        refreshTokenTrigger({});
        if (refreshTokenTriggerResult.isSuccess) {
          sessionStorage.setItem(
            'IdToken',
            refreshTokenTriggerResult.currentData.IdToken,
          );
          sessionStorage.setItem(
            'AccessToken',
            refreshTokenTriggerResult.currentData.AccessToken,
          );

          // navigate(bookingListPath, { state: pathname });
        }
      }
    }
  }, [
    currentIdToken,
    pathname,
    refreshTokenTriggerResult.currentData?.IdToken,
    refreshTokenTriggerResult.currentData?.AccessToken,
    refreshTokenTriggerResult.isSuccess,
  ]);
}
