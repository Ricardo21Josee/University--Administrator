/**
 * ============================
 * University--Administrator--React
 * Author: Ricardo Márquez
 * GitHub: https://github.com/Ricardo21Josee
 * LinkedIn: https://www.linkedin.com/in/ric21marquez
 * Instagram: @mar_quez_g
 * Threads: @mar_quez_g
 * Email: josemarquez21garcia@gmail.com
 * ============================
 */


const { Pool } = require('pg');

const pool = new Pool({
  user: 'ricardo',
  host: 'localhost',
  database: 'gestion_universitaria',
  password: 'ricgio921',
  port: 5432,
});

module.exports = pool;