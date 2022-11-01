import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationManager } from 'src/auth/authenticationManager';

import { useLazyLogOutQuery } from 'src/services/hondaApi';

export const SettingsButton = () => {
  const navigate = useNavigate();

  // const [trigger, result] = useLazyLogOutQuery();
  // const [error, setError] = useState('');

  const handleClick = () => {
    navigate('/settings');
    // trigger({});
  };

  // useEffect(() => {
  //   const { isSuccess, errorMsg, errorCode } =
  //     processingNetworkRequests.handleQueryResult(result);
  //   if (isSuccess) {
  //     navigate('/');
  //     setError('');
  //     return;
  //   } else {
  //     setError(errorMsg);
  //   }
  // }, [error, navigate, result]);

  return (
    <div className={'absolute top-5 left-5'}>
      <Button
        variant="contained"
        type="submit"
        onClick={handleClick}
        size={'small'}>
        {'settings'}
      </Button>
    </div>
  );
};
