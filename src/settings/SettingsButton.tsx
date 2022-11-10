import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsPath } from 'src/router/rootConstants';

export const SettingsButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(settingsPath);
  };

  return (
    <div>
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
