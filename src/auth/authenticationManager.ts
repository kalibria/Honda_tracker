import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';
import { RootState } from 'src/redux/store';
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

export const useIsAuthorized = (path: string) => {
  const navigate = useNavigate();
  const { data } = useGetMeQuery({});
  console.log('data', data);

  useEffect(() => {
    if (data) {
      navigate(path);
    } else {
      navigate('/login');
    }
  }, [data, navigate]);
};
