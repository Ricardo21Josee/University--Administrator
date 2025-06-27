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

// Obtener todos los estudiantes (mejorada)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.carnet, e.primer_nombre, e.segundo_nombre, e.primer_apellido, e.segundo_apellido,
             TO_CHAR(e.fecha_nacimiento, 'DD-MM-YYYY') as fecha_nacimiento,
             c.nombre as carrera, e.semestre_actual, e.seccion
      FROM estudiantes e
      JOIN carreras c ON e.id_carrera = c.id_carrera
      ORDER BY e.primer_apellido, e.primer_nombre
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar estudiante por carnet
router.get('/:carnet', async (req, res) => {
  const { carnet } = req.params;
  try {
    // Obtener datos del estudiante
    const result = await pool.query(
      'SELECT * FROM estudiantes WHERE carnet = $1',
      [carnet]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    const estudiante = result.rows[0];

    // Obtener cursos del semestre actual
    const cursosResult = await pool.query(
      `SELECT c.id_curso, c.nombre, c.descripcion, c.creditos
       FROM matriculacion m
       JOIN cursos c ON m.id_curso = c.id_curso
       WHERE m.id_estudiante = $1 AND m.semestre = $2`,
      [estudiante.id_estudiante, estudiante.semestre_actual]
    );
    estudiante.cursos = cursosResult.rows;

    res.json(estudiante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registrar estudiante (debes portar la lógica de generación de carnet y matrícula)
router.post('/', async (req, res) => {
  try {
    // LOGS PARA DEPURAR
    console.log('Body recibido:', req.body);

    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento,
      carrera,
      semestre_actual,
      seccion,
      cursosSeleccionados
    } = req.body;

    // Asegúrate de que cursosSeleccionados sea un array
    const cursos = Array.isArray(cursosSeleccionados) ? cursosSeleccionados : [];

    // Mapeo y generación de carnet
    const codigosCarrera = {
      "Administracion de Empresas": "1010",
      "Auditoria": "1020",
      "Ingenieria en Sistemas": "1030",
      "Arquitectura de Redes": "1040",
      "Medicina General": "1050",
      "Traumatologia": "1060",
      "Pediatria": "1070"
    };

    if (!codigosCarrera[carrera]) {
      return res.status(400).json({ error: 'Carrera no reconocida' });
    }
    const codigoCarrera = codigosCarrera[carrera];
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `${codigoCarrera}-${year}-`;
    const lastCarnetResult = await pool.query(
      `SELECT carnet FROM estudiantes WHERE carnet LIKE $1 ORDER BY carnet DESC LIMIT 1`,
      [`${prefix}%`]
    );
    let consecutivo = 1;
    if (lastCarnetResult.rows.length > 0) {
      const lastCarnet = lastCarnetResult.rows[0].carnet;
      const lastConsecutivo = parseInt(lastCarnet.slice(-5), 10);
      consecutivo = lastConsecutivo + 1;
    }
    const consecutivoStr = consecutivo.toString().padStart(5, '0');
    const carnet = `${codigoCarrera}-${year}-${consecutivoStr}`;

    // BUSCAR id_carrera EN LA BASE DE DATOS
    const carreraResult = await pool.query(
      'SELECT id_carrera FROM carreras WHERE nombre = $1',
      [carrera]
    );
    if (carreraResult.rows.length === 0) {
      return res.status(400).json({ error: 'Carrera no encontrada en la base de datos' });
    }
    const id_carrera = carreraResult.rows[0].id_carrera;

    // Insertar estudiante
    await pool.query(
      `INSERT INTO estudiantes
        (carnet, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, id_carrera, semestre_actual, seccion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        carnet,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        id_carrera,
        semestre_actual,
        seccion
      ]
    );

    // Obtener id_estudiante
    const estudianteResult = await pool.query(
      'SELECT id_estudiante FROM estudiantes WHERE carnet = $1',
      [carnet]
    );
    const id_estudiante = estudianteResult.rows[0].id_estudiante;

    // Insertar matrícula y obtener id_matricula
    const matriculaResult = await pool.query(
      `INSERT INTO matriculacion (id_estudiante, semestre, fecha_matricula, estado)
       VALUES ($1, $2, NOW(), 'Activo') RETURNING id_matricula`,
      [id_estudiante, semestre_actual]
    );
    const id_matricula = matriculaResult.rows[0].id_matricula;

    // Insertar una fila en matriculacion por cada curso seleccionado
    for (const id_curso of cursos) {
      await pool.query(
        `INSERT INTO matriculacion (id_estudiante, id_curso, semestre, fecha_matricula, estado)
         VALUES ($1, $2, $3, NOW(), 'Activo')`,
        [id_estudiante, id_curso, semestre_actual]
      );
    }

    res.status(201).json({ message: 'Estudiante registrado y matriculado correctamente', carnet });
  } catch (err) {
    console.error('Error en registro:', err); // <-- Esto mostrará el error real en consola
    res.status(500).json({ error: 'Error al registrar estudiante' });
  }
});

// Eliminar estudiante
router.delete('/:carnet', async (req, res) => {
  try {
    const { carnet } = req.params;
    const result = await pool.query('DELETE FROM estudiantes WHERE carnet = $1 RETURNING carnet', [carnet]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar datos y cursos de un estudiante
router.put('/:carnet', async (req, res) => {
  const { carnet } = req.params;
  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    semestre_actual,
    seccion,
    cursosSeleccionados
  } = req.body;

  try {
    // Actualizar datos del estudiante
    await pool.query(
      `UPDATE estudiantes SET
        primer_nombre = $1,
        segundo_nombre = $2,
        primer_apellido = $3,
        segundo_apellido = $4,
        fecha_nacimiento = $5,
        semestre_actual = $6,
        seccion = $7
      WHERE carnet = $8`,
      [
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        semestre_actual,
        seccion,
        carnet
      ]
    );

    // Obtener id_estudiante
    const estudianteResult = await pool.query(
      'SELECT id_estudiante FROM estudiantes WHERE carnet = $1',
      [carnet]
    );
    if (estudianteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    const id_estudiante = estudianteResult.rows[0].id_estudiante;

    // Eliminar cursos anteriores del semestre actual
    await pool.query(
      'DELETE FROM matriculacion WHERE id_estudiante = $1 AND semestre = $2 AND id_curso IS NOT NULL',
      [id_estudiante, semestre_actual]
    );

    // Insertar nuevos cursos seleccionados
    if (Array.isArray(cursosSeleccionados)) {
      for (const id_curso of cursosSeleccionados) {
        await pool.query(
          `INSERT INTO matriculacion (id_estudiante, id_curso, semestre, fecha_matricula, estado)
           VALUES ($1, $2, $3, NOW(), 'Activo')`,
          [id_estudiante, id_curso, semestre_actual]
        );
      }
    }

    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar estudiante:', err);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

module.exports = router;