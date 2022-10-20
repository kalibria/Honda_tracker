import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../App.css';

export const LoginForm = () => {
  return (
    <div className="loginForm">
      <main className="flex flex-col justify-center items-center">
        <div className="w-24">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="logIn"
          />
          <h1 className="text-center">Sigh in</h1>
        </div>
        <form className="flex flex-col gap-1">
          <TextField
            id="outlined-login-input"
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
      </main>
    </div>
  );
};
