import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';
import { AlertForm } from 'src/auth/components/loginForm/componentsForLoginForm';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { Loading } from 'src/commonComponents/Loading';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { initPath, loginPath } from 'src/router/rootConstants';
import { useLazyLogOutQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';

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
      navigate(initPath);
    } else if (isError) {
      setError(errorMsg);
      myLocalStorage.logOut();
    }
  }, [dispatch, error, navigate, result]);

  return (
    <div>
      {result.isLoading && <Loading />}
      <ButtonUI onClick={isAuth ? handleLogOutClick : handleLogInClick}>
        {isAuth ? 'Log out' : 'Log in'}
      </ButtonUI>
      <div>{error && <AlertForm message={error} />}</div>
    </div>
  );
};
