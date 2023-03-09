import React from 'react';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

export const ErrorComponent = () => {
  return (
    <div className={'errorWrapper'}>
      <img
        src={
          'https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png'
        }
        alt={'Oops, something went wrong....'}
      />
      <div className={'errorWrapperButton'}>
        <ButtonUI>{'Reload'}</ButtonUI>
      </div>
    </div>
  );
};
