import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logOut, setIsAuthenticated } from 'src/redux/authSlice';
import { RootState } from 'src/redux/store';
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
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/calendar');
    } else {
      navigate('/login');
    }
  }, [navigate]);
};
