import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ barbershopId, selectedServices, selectedProfessional, username, selectedTime, onBookingConfirmed }) => {
    const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const bookingData = {
          barbershop: barbershopId,
          username: username,
          date: new Date(date),
          time: selectedTime,
          service: selectedServices.join(', '),
          professional: selectedProfessional,
        };
      console.log('Booking data:', bookingData);

      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      const reservationCode = response.data.reservationCode;
      console.log('Booking created successfully. Reservation Code:', reservationCode);
      onBookingConfirmed(reservationCode);
    } catch (error) {
        console.error('Error creating booking:', error.response.data);
    }
  };

  return (
    <div>
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;