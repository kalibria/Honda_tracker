import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { SettingsPage } from 'src/settings/SettingsPage';

export const WrapperForSettingPage = () => {
  const user = myLocalStorage.getItem('username');
  const { data, error, isLoading } = useGetUserQuery(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const userRole = data.user.roles;
      myLocalStorage.setItem('userRole', userRole);
    } else if (error) {
      navigate('/');
    }
  }, [data, error, navigate]);

  return <div>{isLoading ? <h1>Loading...</h1> : <SettingsPage />}</div>;
};
