import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, setAuthUsername } from '../utils/auth';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(null);
    setAuthUsername(null);
    navigate('/');
  }, [navigate]);

  return null;
};

export default LogOut;