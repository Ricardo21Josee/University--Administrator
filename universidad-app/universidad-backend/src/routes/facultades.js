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