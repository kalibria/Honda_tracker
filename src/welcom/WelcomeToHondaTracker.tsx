import React from 'react';
import { Loading } from 'src/commonComponents/Loading';
import { useGetMeQuery } from 'src/services/hondaApi';

export const WelcomeToHondaTracker = () => {
  return (
    <div className={'mainContainer'}>
      <h1>Welcome to Honda tracker</h1>
    </div>
  );
};
