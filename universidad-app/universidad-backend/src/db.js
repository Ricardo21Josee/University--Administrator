const { Pool } = require('pg');

const pool = new Pool({
  user: 'ricardo',
  host: 'localhost',
  database: 'gestion_universitaria',
  password: 'ricgio921',
  port: 5432,
});

module.exports = pool;