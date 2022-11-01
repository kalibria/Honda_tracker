import { Dispatch } from '@reduxjs/toolkit';

import { isAuth, logOut } from 'src/redux/authSlice';
import { myLocalStorage } from 'src/services/localStorage';

class AuthenticationManager {
  setUnauthenticated(dispatch: Dispatch) {
    myLocalStorage.logOut();

    dispatch(logOut());
  }

  setAuthenticated(dispatch: Dispatch) {
    myLocalStorage.setItem('isAuthenticated', 'true');

    dispatch(isAuth());
  }
}

export const authenticationManager = new AuthenticationManager();
