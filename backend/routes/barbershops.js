const express = require('express');
const router = express.Router();
const Barbershop = require('../models/Barbershop');

// GET all barbershops
router.get('/', async (req, res) => {
  try {
    const barbershops = await Barbershop.find();
    res.json(barbershops);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific barbershop by ID
router.get('/:id', async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET professionals for a specific barbershop
router.get('/:id/professionals', async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop.professionals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new barbershop
router.post('/', async (req, res) => {
  try {
    const { name, street, professionals } = req.body;
    const barbershop = new Barbershop({
      name,
      street,
      professionals,
    });
    await barbershop.save();
    res.status(201).json(barbershop);
  } catch (error) {
    res.status(400).json({ error: 'Invalid barbershop data' });
  }
});
module.exports = router;