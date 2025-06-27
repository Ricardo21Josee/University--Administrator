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


const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const { facultad } = req.query;
  try {
    // Buscar el id_facultad por nombre de facultad
    const facResult = await pool.query(
      'SELECT id_facultad FROM facultades WHERE LOWER(nombre) = LOWER($1)',
      [facultad]
    );
    if (facResult.rows.length === 0) {
      return res.json([]);
    }
    const idFacultad = facResult.rows[0].id_facultad;

    // Buscar carreras por id_facultad
    const result = await pool.query(
      'SELECT nombre FROM carreras WHERE id_facultad = $1',
      [idFacultad]
    );
    res.json(result.rows.map(row => row.nombre));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;