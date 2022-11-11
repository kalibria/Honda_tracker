import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { myLocalStorage } from 'src/services/localStorage';
import { SettingsButton } from 'src/settings/SettingsButton';

export default function ButtonAppBar() {
  const isAuth = myLocalStorage.isAuth();
  return (
    <div className={'buttonAppContainer'}>
      {isAuth && <SettingsButton />}
      <LogInLogOutButton />
    </div>
  );
}
