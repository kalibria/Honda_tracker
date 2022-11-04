import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAppBar from 'src/appBar/ButtonAppBar';

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/calendar');
    } else {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div>
      <ButtonAppBar />
    </div>
  );
};
