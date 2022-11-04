import * as React from 'react';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { SettingsButton } from 'src/settings/SettingsButton';

export default function ButtonAppBar() {
  return (
    <div className={'buttonAppContainer'}>
      <SettingsButton />
      <LogOutButton />
    </div>
  );
}
