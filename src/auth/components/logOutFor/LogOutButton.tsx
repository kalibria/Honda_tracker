import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';
import { AlertForm } from 'src/auth/components/loginForm/componentsForLoginForm';
import { logOut } from 'src/redux/authSlice';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

import { useLazyLogOutQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';

export const LogOutButton = () => {
  const navigate = useNavigate();
  const [trigger, result] = useLazyLogOutQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    trigger({});
  };

  useEffect(() => {
    const { isSuccess, errorMsg, errorCode } =
      myRtkQueryResultProcessor.parseQueryResult(result);
    if (isSuccess) {
      authenticationManager.setUnauthenticated(dispatch);
      setError('');
      navigate('/');
      return;
    } else {
      setError(errorMsg);
    }
  }, [dispatch, error, navigate, result]);

  return (
    <div className={'absolute top-5 right-5'}>
      {error && <AlertForm message={error} />}

      <Button
        variant="contained"
        type="submit"
        onClick={handleClick}
        size={'small'}>
        {'log out'}
      </Button>
    </div>
  );
};
