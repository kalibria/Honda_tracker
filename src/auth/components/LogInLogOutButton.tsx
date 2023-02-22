import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  // authenticationManager,
  useCheckIsLoggedIn,
} from 'src/auth/authenticationManager';
import loginForm from 'src/auth/components/loginForm/LoginForm';

import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { Loading } from 'src/ui-kit/Loading';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { loginPath, welcomePath } from 'src/router/rootConstants';
import { useLazyLogOutQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';

export const LogInLogOutButton = () => {
  const { isSuccess } = useCheckIsLoggedIn();
  const [logOutTrigger, logOutTriggerResult] = useLazyLogOutQuery();
  const [error, setError] = useState('');
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
    console.log('logOut', logOutTriggerResult);
  }, [logOutTriggerResult]);

  useEffect(() => {
    const { isSuccess, errorMsg, isError } =
      myRtkQueryResultProcessor.parseQueryResult(logOutTriggerResult);

    if (isSuccess) {
      // authenticationManager.setUnauthenticated(dispatch);
      localStorage.clear();
      sessionStorage.clear();
      setError('');
      navigate(loginPath);
    } else if (isError) {
      setError(errorMsg);
      // myLocalStorage.logOut();
      navigate(welcomePath);
    }
  }, [dispatch, error, navigate, logOutTriggerResult]);

  return (
    <div>
      {logOutTriggerResult.isLoading && <Loading />}
      <ButtonUI onClick={isSuccess ? handleLogOutClick : handleLogInClick}>
        {isSuccess ? 'Выйти' : 'Войти'}
      </ButtonUI>
      {/*<div>{error && <AlertForm message={error} />}</div>*/}
    </div>
  );
};
