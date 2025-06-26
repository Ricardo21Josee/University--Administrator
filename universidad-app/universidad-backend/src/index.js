const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes');
const facultadesRoutes = require('./routes/facultades');
const carrerasRoutes = require('./routes/carreras');
const cursosRoutes = require('./routes/cursos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/facultades', facultadesRoutes);
app.use('/api/carreras', carrerasRoutes);
app.use('/api/cursos', cursosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});