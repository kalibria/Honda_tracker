import React from 'react';
import Button from '@mui/material/Button';
import { IButtonEL } from 'src/commonComponents/types';

export const ButtonUI: React.FC<IButtonEL> = ({ onClick, text }) => {
  return (
    <Button variant="contained" onClick={onClick} size={'small'}>
      {text}
    </Button>
  );
};
