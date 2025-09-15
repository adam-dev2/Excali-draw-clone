const express = require('express');
const Drawing = require('../models/Drawing');
const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
};

// Get all drawings for user
router.get('/', requireAuth, async (req, res) => {
  try {
    const drawings = await Drawing.find({ owner: req.user._id });
    res.json(drawings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new drawing
router.post('/', requireAuth, async (req, res) => {
  try {
    const drawing = new Drawing({
      ...req.body,
      owner: req.user._id
    });
    await drawing.save();
    res.status(201).json(drawing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update drawing
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const drawing = await Drawing.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    res.json(drawing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete drawing
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const drawing = await Drawing.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    res.json({ message: 'Drawing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;