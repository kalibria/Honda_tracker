import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { SignUpButton } from 'src/auth/components/signUpForm/SignUpButton';
import { SettingsButton } from 'src/settings/SettingsButton';

interface IButtonAppBar {
  isSuccess: boolean;
}

export default function ButtonAppBar({ isSuccess }: IButtonAppBar) {
  return (
    <div>
      {isSuccess ? (
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
