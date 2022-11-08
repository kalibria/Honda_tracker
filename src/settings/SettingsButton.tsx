import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsPath } from 'src/router/rootConstants';

export const SettingsButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(settingsPath);
  };

  return (
    <div>
      {/*className={'absolute top-5 left-5'}>*/}
      <Button
        variant="contained"
        type="submit"
        onClick={handleClick}
        size={'small'}>
        {'settings'}
      </Button>
    </div>
  );
};
