import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { SettingsPage } from 'src/settings/SettingsPage';

export const WrapperForSettingPage = () => {
  const user = myLocalStorage.getItem('username');
  const { data, error, isLoading } = useGetUserQuery(user);

  useEffect(() => {
    if (data) {
      const userRole = data.user.roles;
      myLocalStorage.setItem('userRole', userRole);
    }
  }, [data]);

  return <div>{isLoading ? <h1>Loading...</h1> : <SettingsPage />}</div>;
};
