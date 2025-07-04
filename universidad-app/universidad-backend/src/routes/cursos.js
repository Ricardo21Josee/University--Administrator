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
  const { carrera, semestre } = req.query;
  try {
    const result = await pool.query(
      'SELECT id_curso, nombre FROM cursos WHERE id_carrera = (SELECT id_carrera FROM carreras WHERE nombre = $1) AND semestre = $2',
      [carrera, semestre]
    );
    res.json(result.rows); // Devuelve [{id_curso, nombre}, ...]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;