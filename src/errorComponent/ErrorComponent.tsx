import React from 'react';
import { useNavigate } from 'react-router-dom';
import { welcomePath } from 'src/router/rootConstants';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

export const ErrorComponent = () => {
  const navigate = useNavigate();
  const errorClickButton = () => {
    navigate(welcomePath);
  };

  return (
    <div className={'errorWrapper'}>
      <img
        src={
          'https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png'
        }
        alt={'Oops, something went wrong....'}
      />
      <div className={'errorWrapperButton'}>
        <ButtonUI onClick={errorClickButton}>{'Reload'}</ButtonUI>
      </div>
    </div>
  );
};
