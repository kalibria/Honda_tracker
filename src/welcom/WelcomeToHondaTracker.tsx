import React from 'react';
import { useDispatch } from 'react-redux';
import { hondaApi } from 'src/services/hondaApi';

export const WelcomeToHondaTracker = () => {
  const dispatch = useDispatch();
  dispatch(hondaApi.util.invalidateTags(['Me']));

  return (
    <div className={'mainContainer welcomeText'}>
      <h1>
        Welcome to the
        <br />
        <b> Honda Tracker app!</b>
      </h1>
    </div>
  );
};
