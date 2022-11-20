import React from 'react';
import Button from '@mui/material/Button';
import { IButtonEL } from 'src/commonComponents/types';

export const ButtonUI: React.FC<IButtonEL> = ({ onClick, children }) => {
  return (
    <Button variant="contained" onClick={onClick} size={'small'}>
      {children}
    </Button>
  );
};
