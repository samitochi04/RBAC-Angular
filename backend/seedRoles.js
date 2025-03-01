const pool = require('./db');

async function seedRoles() {
  try {
    const [rows] = await pool.query('SELECT * FROM roles');
    if (rows.length === 0) {
      await pool.query('INSERT INTO roles (name) VALUES ?', [['admin'], ['user']]);
      console.log('Roles seeded successfully.');
    } else {
      console.log('Roles already exist.');
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

seedRoles();