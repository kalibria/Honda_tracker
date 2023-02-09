import React from 'react';
import Button from '@mui/material/Button';
import { IButtonEL } from 'src/ui-kit/types';

export const ButtonUI: React.FC<IButtonEL> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      size={'small'}
      disabled={disabled}>
      {children}
    </Button>
  );
};
