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
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    "Finanzas Economicas",
    "Sistemas de la Comunicacion",
    "Medicina y Salud"
  ]);
});

module.exports = router;