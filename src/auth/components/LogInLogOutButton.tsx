import Button from '@mui/material/Button';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { loginPath } from 'src/router/rootConstants';
import { hondaApi } from 'src/services/hondaApi';

export const LogInLogOutButton = () => {
  const [usernameId, setUsernameId] = useState<typeof skipToken | object>({});

  const selectUsername = useMemo(
    () => hondaApi.endpoints.getMe.select(usernameId),
    [usernameId],
  );

  const { isSuccess } = useSelector(selectUsername);

  const handleLogOutClick = () => {
    console.log('logOut');
  };
  const handleLogInClick = () => {
    console.log('hey');
  };

  return (
    <ButtonUI
      onClick={isSuccess ? handleLogOutClick : handleLogInClick}
      text={isSuccess ? 'log out' : 'log in'}
    />
  );
};
