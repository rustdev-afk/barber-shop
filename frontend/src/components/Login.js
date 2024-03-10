import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authslice'; // Adjust this path as necessary

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = response.data.token;
      const userStatus = response.data.userStatus; // Assuming the server sends the user status in the response
      
      localStorage.setItem('token', token);
      localStorage.setItem('userStatus', userStatus); // Store userStatus in local storage
      localStorage.setItem('username', username); // Store the username in local storage
      dispatch(login({ token, userStatus })); // Dispatch the login action with token and userStatus

      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
