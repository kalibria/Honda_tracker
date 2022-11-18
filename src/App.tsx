import React, { useEffect } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { welcomePath } from 'src/router/rootConstants';
import { myLocalStorage } from 'src/services/localStorage';

export const App = () => {
  const isAuth = myLocalStorage.isAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {}, [location]);

  useEffect(() => {
    if (isAuth) {
      // navigate(calendarPath);
    } else {
      redirect(welcomePath);
      // navigate(-1);
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      <div>
        <ButtonAppBar />
        <Outlet />
      </div>
    </React.Fragment>
  );
};
