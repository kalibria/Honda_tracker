import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { Loading } from 'src/commonComponents/Loading';
import { calendarPath, welcomePath } from 'src/router/rootConstants';
import { useGetMeQuery } from 'src/services/hondaApi';

export const App = () => {
  const { isSuccess, isLoading, isError } = useGetMeQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(calendarPath);
    }
    if (isError) {
      navigate(welcomePath);
    }
  }, [isSuccess, isError, navigate]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ButtonAppBar />
          <Outlet />
        </div>
      )}
    </React.Fragment>
  );
};
