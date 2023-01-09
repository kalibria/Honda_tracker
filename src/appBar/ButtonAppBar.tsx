import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { SignUpButton } from 'src/auth/components/signUpForm/SignUpButton';
import { myLocalStorage } from 'src/services/localStorage';
import { SettingsButton } from 'src/settings/SettingsButton';

export default function ButtonAppBar() {
  // const isAuth = myLocalStorage.isAuth();
  const isRefreshAccessTokens = myLocalStorage.isRefreshToken();
  return (
    <div>
      {isRefreshAccessTokens ? (
        <div className={'buttonAppContainer'}>
          <SettingsButton />
          <LogInLogOutButton />
        </div>
      ) : (
        <div className={'buttonAppContainer'}>
          <SignUpButton />
          <LogInLogOutButton />
        </div>
      )}
    </div>
  );
}
