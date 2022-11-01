import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { SettingsPage } from 'src/settings/SettingsPage';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

export const WrapperForSettingPage = () => {
  // const result = useGetUserQuery(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [errorCode, setErrorCode] = useState(0);

  useEffect(() => {
    if (result.isSuccess) {
      const userRole = result.data.user.roles;
    } else {
      myRtkQueryResultProcessor.handleErrorCode(result, dispatch);
      // setErrorCode(myRtkQueryResultProcessor.getErrorCode(result));
    }
  }, [dispatch, navigate, result]);

  return <div>{result.isLoading ? <h1>Loading...</h1> : <SettingsPage />}</div>;
};
