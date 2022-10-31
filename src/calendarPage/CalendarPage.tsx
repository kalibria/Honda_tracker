import React from 'react';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { SettingsButton } from 'src/settings/SettingsButton';

export const CalendarPage = () => {
  return (
    <main className={'mainContainer'}>
      <div>
        <LogOutButton />
        <SettingsButton />
      </div>
    </main>
  );
};
