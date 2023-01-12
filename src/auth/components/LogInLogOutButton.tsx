import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authenticationManager,
  useCheckIsLoggedIn,
} from 'src/auth/authenticationManager';

import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { Loading } from 'src/ui-kit/Loading';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { loginPath, welcomePath } from 'src/router/rootConstants';
import { useLazyLogOutQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';

export const LogInLogOutButton = () => {
  const { isSuccess } = useCheckIsLoggedIn();
  const [trigger, result] = useLazyLogOutQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    const accessToken = sessionStorage.getItem('AccessToken');

    trigger({ accessToken: accessToken });
  };
  const handleLogInClick = () => {
    navigate(loginPath);
  };

  useEffect(() => {
    const { isSuccess, errorMsg, isError } =
      myRtkQueryResultProcessor.parseQueryResult(result);

    if (isSuccess) {
      authenticationManager.setUnauthenticated(dispatch);
      setError('');
      navigate(welcomePath);
    } else if (isError) {
      setError(errorMsg);
      myLocalStorage.logOut();
      navigate(welcomePath);
    }
  }, [dispatch, error, navigate, result]);

  return (
    <div>
      {result.isLoading && <Loading />}
      <ButtonUI onClick={isSuccess ? handleLogOutClick : handleLogInClick}>
        {isSuccess ? 'Выйти' : 'Войти'}
      </ButtonUI>
      {/*<div>{error && <AlertForm message={error} />}</div>*/}
    </div>
  );
};
