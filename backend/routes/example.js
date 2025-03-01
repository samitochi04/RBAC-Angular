const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

router.get(
  '/admin',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: 'Admin-only content.' });
  }
);

router.get(
  '/user',
  authenticateToken,
  authorizeRoles('user'),
  (req, res) => {
    res.json({ message: 'User-only content.' });
  }
);

module.exports = router;