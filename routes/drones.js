const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

router.get('/drones', async (req, res) => {
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones });
  } catch (error) {
    console.error('Error fetching drones:', error);
    res.render('error');
  }
});

router.get('/drones/create', (req, res) => {
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drone.create({ name, propellers, maxSpeed });
    res.redirect('/drones');
  } catch (error) {
    console.error('Error creating drone:', error);
    res.render('drones/create-form', { errorMessage: 'Failed to create drone.' });
  }
});

router.get('/drones/:id/edit', async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id);
    res.render('drones/update-form', { drone });
  } catch (error) {
    console.error('Error fetching drone for editing:', error);
    res.render('error');
  }
});

router.post('/drones/:id/edit', async (req, res) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed });
    res.redirect('/drones');
  } catch (error) {
    console.error('Error updating drone:', error);
    res.render('drones/update-form', { errorMessage: 'Failed to update drone.' });
  }
});

router.post('/drones/:id/delete', async (req, res) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones');
  } catch (error) {
    console.error('Error deleting drone:', error);
    res.redirect('/drones');
  }
});


module.exports = router;