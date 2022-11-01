import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processingNetworkRequests } from 'src/auth/authenticationManager';
import { AlertForm } from 'src/auth/components/loginForm/componentsForLoginForm';
import { logOut } from 'src/redux/authSlice';

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
      processingNetworkRequests.handleQueryResult(result);
    if (isSuccess) {
      navigate('/');
      setError('');
      dispatch(logOut());
      myLocalStorage.removeItem('username');
      myLocalStorage.removeItem('isAuthenticated');

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
