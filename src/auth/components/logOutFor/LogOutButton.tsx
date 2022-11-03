import React, { useEffect, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { processingNetworkRequests } from 'src/auth/authenticationManager';
import { AlertForm, ButtonEl } from 'src/ui-kit/components';

import { useLazyLogOutQuery } from 'src/services/hondaApi';

export const LogOutButton = () => {
  const navigate = useNavigate();
  const [trigger, result] = useLazyLogOutQuery();
  const [error, setError] = useState('');

  const handleClick = () => {
    trigger({});
  };

  useEffect(() => {
    const { isSuccess, errorMsg, errorCode } =
      processingNetworkRequests.handleQueryResult(result);
    if (isSuccess) {
      navigate('/');
      setError('');
      return;
    } else {
      setError(errorMsg);
      console.error(errorMsg);
    }
  }, [error, navigate, result]);

  return (
    <React.Fragment>
      {error && <AlertForm message={error} />}

      <ButtonEl text={'log out'} onClick={handleClick} />
    </React.Fragment>
  );
};
