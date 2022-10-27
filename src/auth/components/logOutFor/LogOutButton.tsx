import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonEl } from 'src/auth/components/loginForm/componentsForLoginForm';
import { useLazyLogOutQuery } from 'src/services/hondaApi';

export const LogOutButton = () => {
  const navigate = useNavigate();
  const [trigger, result] = useLazyLogOutQuery();

  const handleClick = () => {
    trigger({});
    navigate('/');
  };

  return <ButtonEl text={'log out'} onClick={handleClick} />;
};
