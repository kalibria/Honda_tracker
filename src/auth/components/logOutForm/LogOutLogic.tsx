import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';
import { AlertForm } from 'src/auth/components/loginForm/componentsForLoginForm';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { initPath } from 'src/router/rootConstants';

import { useLazyLogOutQuery } from 'src/services/hondaApi';

export const LogOutLogic = () => {
  const navigate = useNavigate();
  const [trigger, result] = useLazyLogOutQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    trigger({});
  };

  useEffect(() => {
    const { isSuccess, errorMsg } =
      myRtkQueryResultProcessor.parseQueryResult(result);
    if (isSuccess) {
      authenticationManager.setUnauthenticated(dispatch);
      setError('');
      navigate(initPath);
      return;
    } else {
      setError(errorMsg);
    }
  }, [dispatch, error, navigate, result]);

  return <div>{error && <AlertForm message={error} />}</div>;
};
