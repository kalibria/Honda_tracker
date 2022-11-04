import React from 'react';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsAuthorized } from 'src/auth/authenticationManager';

export const MainPage = () => {
  useIsAuthorized();
  return (
    <div>
      <ButtonAppBar />
    </div>
  );
};
