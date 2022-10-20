import React from 'react';
import TextField from '@mui/material/TextField';

export const LoginForm = () => {
  return (
    <div>
      <form className="flex-col">
        <TextField
          id="filled-login-input"
          label="Login"
          type="login"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
      </form>
    </div>
  );
};
