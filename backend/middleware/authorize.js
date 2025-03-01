const pool = require('../db');

async function authorizeRoles(...allowedRoles) {
  return async (req, res, next) => {
    const userId = req.user.id;

    try {
      const [rows] = await pool.query('SELECT r.name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?', [userId]);
      const userRole = rows[0]?.name;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  };
}

module.exports = authorizeRoles;