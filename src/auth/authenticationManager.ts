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
  const { data } = useGetMeQuery({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (data) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [data, isAuth]);
  return isAuth;
};

// export const useGet = (path: string) => {
//   const navigate = useNavigate();
//   const { data } = useGetMeQuery({});
//   const [username, setUserName] = useState('');
//
//   useEffect(() => {
//     if (data) {
//       setUserName(data.username);
//       navigate(path);
//     } else {
//       navigate(loginPath);
//     }
//   }, [data, navigate, path]);
//
//   return username;
// };
