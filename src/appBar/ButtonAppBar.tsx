import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { SignUpButton } from 'src/auth/components/signUpForm/SignUpButton';
import { useGetMeQuery } from 'src/services/hondaApi';
import { SettingsButton } from 'src/settings/SettingsButton';

interface IButtonAppBar {
  isUninitialized: boolean;
}

export default function ButtonAppBar({ isUninitialized }: IButtonAppBar) {
  const { isSuccess } = useGetMeQuery({});

  return (
    <div>
      <div className={'buttonAppContainer'}>
        {isUninitialized && isSuccess ? <SettingsButton /> : <SignUpButton />}
        <LogInLogOutButton isUninitialized={isUninitialized} />
      </div>
    </div>
  );
}
