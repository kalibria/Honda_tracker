import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const LoginForm = () => {
  return (
    <div>
      <div>
        <img src="#" alt="sighIn" />
        <h1>Sigh in</h1>
      </div>
      <form className="flex flex-col gap-1">
        <TextField
          id="outlined-password-input"
          label="Login"
          type="login"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <div>
          <label>
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <span> </span>
            Remember Me
          </label>
        </div>
        <Button variant="contained">Sigh in</Button>
      </form>
    </div>
  );
};
