import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthUsername, getAuthToken } from '../utils/auth';

const Profile = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const username = getAuthUsername();
        const token = getAuthToken();

        const response = await axios.get(`http://localhost:5000/api/bookings/user/${username}`, {
          headers: { Authorization: token },
        });

        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <h3>Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Barbershop: {booking.barbershop}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Time: {booking.time}</p>
              <p>Service: {booking.service}</p>
              <p>Professional: {booking.professional}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;