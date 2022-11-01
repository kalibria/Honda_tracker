import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import { setUseRole } from 'src/redux/userDataSlice';
import { useGetUserQuery } from 'src/services/hondaApi';
import { SettingsPage } from 'src/settings/SettingsPage';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

export const WrapperForSettingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  const result = useGetUserQuery(username);

  useEffect(() => {
    if (result.isSuccess) {
      const userRole = result.data.user.roles;
      dispatch(setUseRole(userRole));
    } else {
      myRtkQueryResultProcessor.handleErrorCode(result, dispatch);
    }
  }, [dispatch, navigate, result]);

  return <div>{result.isLoading ? <h1>Loading...</h1> : <SettingsPage />}</div>;
};
