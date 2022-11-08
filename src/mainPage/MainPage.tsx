import React from 'react';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { calendarPath } from 'src/router/rootConstants';

export const MainPage = () => {
  useIsAuthorized(calendarPath);
  return (
    <div>
      <ButtonAppBar />
    </div>
  );
};
