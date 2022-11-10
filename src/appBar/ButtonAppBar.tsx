import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { SettingsButton } from 'src/settings/SettingsButton';

export default function ButtonAppBar() {
  console.log('navbar');
  return (
    <div className={'buttonAppContainer'}>
      <SettingsButton />
      <LogInLogOutButton />
    </div>
  );
}
