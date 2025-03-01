const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Get role ID
    const [roleRows] = await pool.query('SELECT id FROM roles WHERE name = ?', [role]);
    if (roleRows.length === 0) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
    const roleId = roleRows[0].id;

    // Create user
    await pool.query('INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)', [username, hashedPassword, roleId]);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;