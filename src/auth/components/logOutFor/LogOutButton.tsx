import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonEl } from 'src/auth/components/loginForm/componentsForLoginForm';

export const LogOutButton = () => {
  const navigate = useNavigate();

  return <ButtonEl text={'log out'} onClick={() => navigate('/')} />;
};
