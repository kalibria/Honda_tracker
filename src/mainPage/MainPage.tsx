import React from 'react';
import ButtonAppBar from 'src/appBar/ButtonAppBar';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { Calendar } from 'src/calendar/Calendar';
import { calendarPath } from 'src/router/rootConstants';

export const MainPage = () => {
  return (
    <div>
      <ButtonAppBar />
      <Calendar />
    </div>
  );
};
