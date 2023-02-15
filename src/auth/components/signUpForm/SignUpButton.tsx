import Button from '@mui/material/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import { signUpFormPath } from 'src/router/rootConstants';

export const SignUpButton = () => {
  return (
    <div>
      <Button variant="contained" type="submit" size={'small'}>
        <Link to={signUpFormPath}>Зарегистрироваться</Link>
      </Button>
    </div>
  );
};
