import Button from '@mui/material/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import { settingsPath } from 'src/router/rootConstants';

export const SettingsButton = () => {
  return (
    <div>
      <Button variant="contained" type="submit" size={'small'}>
        <Link to={settingsPath}>Settings</Link>
      </Button>
    </div>
  );
};
