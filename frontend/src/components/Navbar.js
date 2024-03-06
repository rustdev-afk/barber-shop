import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = !!getAuthToken();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/barbershops">Barbershops</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;