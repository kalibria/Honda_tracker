import Button from '@mui/material/Button';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';
import { AlertForm } from 'src/auth/components/loginForm/componentsForLoginForm';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { calendarPath, initPath, loginPath } from 'src/router/rootConstants';
import { hondaApi, useLazyLogOutQuery } from 'src/services/hondaApi';

export const LogInLogOutButton = () => {
  const [usernameId] = useState<typeof skipToken | object>({});
  const selectUsername = useMemo(
    () => hondaApi.endpoints.getMe.select(usernameId),
    [usernameId],
  );
  const { isSuccess } = useSelector(selectUsername);

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
    const { isSuccess, errorMsg } =
      myRtkQueryResultProcessor.parseQueryResult(result);
    if (isSuccess) {
      console.log('isSuccess', isSuccess);
      authenticationManager.setUnauthenticated(dispatch);
      setError('');
      navigate(initPath);
    } else {
      setError(errorMsg);
    }
  }, [dispatch, error, navigate, result]);

  return (
    <div>
      <ButtonUI onClick={isSuccess ? handleLogOutClick : handleLogInClick}>
        {isSuccess ? 'Log out' : 'Log in'}
      </ButtonUI>

      {/*{isSuccess ? (*/}
      {/*  <div>*/}
      {/*    {error && <AlertForm message={error} />}*/}
      {/*    <ButtonUI onClick={handleLogOutClick}>*/}
      {/*      {'Log out'}*/}
      {/*      /!*<Link to={initPath}>Log out</Link>*!/*/}
      {/*    </ButtonUI>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <ButtonUI>*/}
      {/*    <Link to={loginPath}>Log in</Link>*/}
      {/*  </ButtonUI>*/}
      {/*)}*/}
    </div>
  );
};
