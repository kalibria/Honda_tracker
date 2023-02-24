import * as React from 'react';
import { LogInLogOutButton } from 'src/auth/components/LogInLogOutButton';
import { SignUpButton } from 'src/auth/components/signUpForm/SignUpButton';
import { useGetMeQuery } from 'src/services/hondaApi';
import { SettingsButton } from 'src/settings/SettingsButton';

// interface IButtonAppBar {
//   isSuccess: boolean;
// }

export default function ButtonAppBar() {
  const { isSuccess } = useGetMeQuery({});

  return (
    <div>
      <div className={'buttonAppContainer'}>
        {isSuccess ? <SettingsButton /> : <SignUpButton />}
        <LogInLogOutButton />
      </div>
    </div>
  );
}
