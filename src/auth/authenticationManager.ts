import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';
import { loginPath } from 'src/router/rootConstants';
import { useGetMeQuery } from 'src/services/hondaApi';
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

export const useIsAuthorized = () => {
  const { data, isSuccess } = useGetMeQuery({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [data, isAuth, isSuccess]);
  return isAuth;
};

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
