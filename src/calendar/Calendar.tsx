import React from 'react';
import { useIsAuthorized } from 'src/auth/authenticationManager';
import { calendarPath } from 'src/router/rootConstants';

export const Calendar = () => {
  // useIsAuthorized(calendarPath);
  return <div>Calendar</div>;
};
