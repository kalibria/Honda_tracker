import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'src/commonComponents/Loading';
import { RootState } from 'src/redux/store';
import { setUserRole } from 'src/redux/userDataSlice';
import { useGetUserQuery } from 'src/services/hondaApi';
import { SettingsPage } from 'src/settings/SettingsPage';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

export const WrapperForSettingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.userData.username);

  const result = useGetUserQuery(username);

  useEffect(() => {
    if (result.isSuccess) {
      const userRole = result.data.user.roles;
      dispatch(setUserRole(userRole));
    } else {
      myRtkQueryResultProcessor.handleErrorCode(result, dispatch);
      navigate('/');
    }
  }, [dispatch, navigate, result]);

  return <div>{result.isLoading ? <Loading /> : <SettingsPage />}</div>;
};
