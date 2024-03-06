import React, { useState } from 'react';
import axios from 'axios';

const InsertBarbershop = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [professionals, setProfessionals] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const barbershopData = {
        name,
        street,
        professionals: professionals.split(',').map((professional) => professional.trim()),
      };

      await axios.post('http://localhost:5000/api/barbershops', barbershopData);
      console.log('Barbershop inserted successfully');
      // Reset form fields
      setName('');
      setStreet('');
      setProfessionals('');
    } catch (error) {
      console.error('Error inserting barbershop:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Insert Barbershop</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          Professionals (comma-separated):
          <input
            type="text"
            value={professionals}
            onChange={(e) => setProfessionals(e.target.value)}
          />
        </label>
        <button type="submit">Insert Barbershop</button>
      </form>
    </div>
  );
};

export default InsertBarbershop;