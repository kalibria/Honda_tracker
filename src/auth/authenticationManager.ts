import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { bookingListPath, welcomePath } from 'src/router/rootConstants';
import { useLazyGetIdAccessTokenQuery } from 'src/services/hondaApi';

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
      }
    }
  }, [currentIdToken, refreshTokenTrigger]);

  useEffect(() => {
    if (!currentIdToken && pathname !== welcomePath) {
      refreshTokenTrigger({});
    }
  }, [currentIdToken, refreshTokenTrigger, pathname]);

  useEffect(() => {
    if (refreshTokenTriggerResult.isSuccess) {
      sessionStorage.setItem(
        'IdToken',
        refreshTokenTriggerResult.data?.IdToken,
      );
      sessionStorage.setItem(
        'AccessToken',
        refreshTokenTriggerResult.data?.AccessToken,
      );

      navigate(bookingListPath, { state: pathname });
    }
  }, [
    navigate,
    pathname,
    refreshTokenTriggerResult.data?.AccessToken,
    refreshTokenTriggerResult.data?.IdToken,
    refreshTokenTriggerResult.isSuccess,
  ]);
}
