import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';

import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { Loading } from 'src/ui-kit/Loading';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { loginPath } from 'src/router/rootConstants';
import { useLazyLogOutQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { AlertForm } from 'src/ui-kit/components';

export const LogInLogOutButton = () => {
  const isAuth = myLocalStorage.isAuth();

  const [trigger, result] = useLazyLogOutQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    trigger({});
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
      navigate(loginPath);
    } else if (isError) {
      setError(errorMsg);
      myLocalStorage.logOut();
      navigate(loginPath);
    }
  }, [dispatch, error, navigate, result]);

  return (
    <div>
      {result.isLoading && <Loading />}
      <ButtonUI onClick={isAuth ? handleLogOutClick : handleLogInClick}>
        {isAuth ? 'Выйти' : 'Войти'}
      </ButtonUI>
      <div>{error && <AlertForm message={error} />}</div>
    </div>
  );
};
