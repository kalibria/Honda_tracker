import React from 'react';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { SettingsPage } from 'src/settings/SettingsPage';

export const CalendarPage = () => {
  return (
    <React.Fragment>
      <LogOutButton />
      <SettingsPage />
    </React.Fragment>
  );
};
