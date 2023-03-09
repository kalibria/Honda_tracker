import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { Loading } from 'src/ui-kit/Loading';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import {
  errorPath,
  initPath,
  loginPath,
  welcomePath,
} from 'src/router/rootConstants';
import { useGetMeQuery, useLogOutMutation } from 'src/services/hondaApi';

export const LogInLogOutButton = () => {
  const { isSuccess } = useGetMeQuery({});
  const [logOutTrigger, logOutTriggerResult] = useLogOutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    const accessToken = sessionStorage.getItem('AccessToken');

    logOutTrigger({ accessToken: accessToken });
  };

  const handleLogInClick = () => {
    navigate(loginPath);
  };

  useEffect(() => {
    const { isSuccess, isError } =
      myRtkQueryResultProcessor.parseQueryResult(logOutTriggerResult);

    if (isSuccess) {
      localStorage.clear();
      sessionStorage.clear();
      // navigate(welcomePath);
      navigate(initPath);
    } else if (isError) {
      navigate(errorPath);
    }
  }, [dispatch, navigate, logOutTriggerResult]);

  return (
    <div>
      {logOutTriggerResult.isLoading && <Loading />}
      <ButtonUI onClick={isSuccess ? handleLogOutClick : handleLogInClick}>
        {isSuccess ? 'Sign out' : 'Sign in'}
      </ButtonUI>
    </div>
  );
};
