import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { calendarPath, welcomePath } from 'src/router/rootConstants';
import { myLocalStorage } from 'src/services/localStorage';

export const App = () => {
  const isAuth = myLocalStorage.isAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      // navigate(calendarPath);
    } else {
      navigate(welcomePath);
    }
  }, [isAuth, navigate]);

  return (
    <React.Fragment>
      <ButtonAppBar />
      <Outlet />
    </React.Fragment>
  );
};
