import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate import
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authslice';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userStatus = useSelector((state) => state.auth.userStatus); // Assuming you have userStatus in your Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate hook

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/'); // Navigate to the home page after logout
  };

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
            {(userStatus === 2 || userStatus === 3) && (
              <li>
                <Link to="/admin">Admin Menu</Link>
              </li>
              )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;