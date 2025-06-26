-- Creación de la tabla facultades
CREATE TABLE facultades (
    id_facultad INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Creación de la tabla carreras
CREATE TABLE carreras (
    id_carrera INTEGER PRIMARY KEY,
    id_facultad INTEGER,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    duracion_semestres INTEGER,
    descripcion TEXT,
    FOREIGN KEY (id_facultad) REFERENCES facultades(id_facultad)
);

-- Creación de la tabla estudiantes
CREATE TABLE estudiantes (
    id_estudiante INTEGER PRIMARY KEY,
    carnet VARCHAR(20) NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    fecha_nacimiento DATE NOT NULL,
    edad INTEGER,
    id_carrera INTEGER NOT NULL,
    semestre_actual INTEGER NOT NULL,
    seccion CHAR(1) NOT NULL,
    fecha_registro TIMESTAMP,
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

-- Creación de la tabla cursos
CREATE TABLE cursos (
    id_curso INTEGER PRIMARY KEY,
    id_carrera INTEGER,
    semestre INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creditos INTEGER,
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

-- Creación de la tabla matriculacion
CREATE TABLE matriculacion (
    id_matricula INTEGER PRIMARY KEY,
    id_estudiante INTEGER,
    id_curso INTEGER,
    semestre INTEGER NOT NULL,
    fecha_matricula TIMESTAMP,
    estado VARCHAR(20),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
);