import { Dispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

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

export const useAppContext = () => {
  const isAuth = useSelector((state: RootState) => {
    return state.auth.isAuth;
  });
  return isAuth;
};
