import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const LoginForm = React.lazy(
  () => import('./auth/components/loginForm/LoginForm'),
);
