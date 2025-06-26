import { useEffect, useState } from 'react';
import { createStudent, fetchFacultades, fetchCarreras } from '../services/api';
import { Student } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faUser, faIdCard, faCalendar, faBuilding,
  faGraduationCap, faLayerGroup, faListUl, faCheckCircle, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const initialState = {
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fecha_nacimiento: '',
  carrera: '',
  semestre_actual: 1,
  seccion: '',
};

const IngresarEstudiante = () => {
  const [form, setForm] = useState<Omit<Student, 'carnet'>>(initialState);
  const [facultades, setFacultades] = useState<string[]>([]);
  const [carreras, setCarreras] = useState<string[]>([]);
  const [facultad, setFacultad] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cursos, setCursos] = useState<{ id_curso: number, nombre: string }[]>([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    fetchFacultades()
      .then(setFacultades)
      .catch(() => setFacultades([]));
  }, []);

  useEffect(() => {
    if (facultad) {
      fetchCarreras(facultad)
        .then(data => setCarreras(data))
        .catch(() => setCarreras([]));
      setForm(f => ({ ...f, carrera: '' }));
    } else {
      setCarreras([]);
      setForm(f => ({ ...f, carrera: '' }));
    }
  }, [facultad]);

  useEffect(() => {
    if (form.carrera && form.semestre_actual) {
      fetch(`http://localhost:4000/api/cursos?carrera=${encodeURIComponent(form.carrera)}&semestre=${form.semestre_actual}`)
        .then(res => res.json())
        .then(data => setCursos(data));
    } else {
      setCursos([]);
    }
    setCursosSeleccionados([]);
  }, [form.carrera, form.semestre_actual]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFacultadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFacultad(e.target.value);
  };

  const handleCursoChange = (id: number) => {
    setCursosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await createStudent({ ...form, cursosSeleccionados });
      setForm(initialState);
      setFacultad('');
      setCursosSeleccionados([]);
      setSuccessMsg('¡Estudiante registrado exitosamente!');
    } catch (err) {
      setErrorMsg('Ocurrió un error al registrar el estudiante.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-10 bg-white rounded-3xl shadow-2xl border border-blue-200">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <FontAwesomeIcon icon={faUserPlus} className="text-blue-700 text-3xl" />
        <h2 className="text-3xl font-bold text-blue-800 text-center">Registrar Nuevo Estudiante</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Datos personales */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Datos Personales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-400 text-lg" />
              <input
                name="primer_nombre"
                placeholder="Primer Nombre"
                value={form.primer_nombre}
                onChange={handleChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-300 text-lg" />
              <input
                name="segundo_nombre"
                placeholder="Segundo Nombre"
                value={form.segundo_nombre}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-400 text-lg" />
              <input
                name="primer_apellido"
                placeholder="Primer Apellido"
                value={form.primer_apellido}
                onChange={handleChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-300 text-lg" />
              <input
                name="segundo_apellido"
                placeholder="Segundo Apellido"
                value={form.segundo_apellido}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2 col-span-1 md:col-span-2 lg:col-span-1">
              <FontAwesomeIcon icon={faCalendar} className="text-blue-400 text-lg" />
              <input
                name="fecha_nacimiento"
                type="date"
                value={form.fecha_nacimiento}
                onChange={handleChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
          </div>
        </div>
        {/* Datos académicos */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} />
            Datos Académicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-400 text-lg" />
              <select
                value={facultad}
                onChange={handleFacultadChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              >
                <option value="">Selecciona Facultad</option>
                {facultades.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faGraduationCap} className="text-blue-400 text-lg" />
              <select
                name="carrera"
                value={form.carrera}
                onChange={handleChange}
                required
                disabled={!facultad}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              >
                <option value="">Selecciona Carrera</option>
                {Array.isArray(carreras) && carreras.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faLayerGroup} className="text-blue-400 text-lg" />
              <input
                name="semestre_actual"
                type="number"
                min={1}
                max={12}
                value={form.semestre_actual}
                onChange={handleChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
                placeholder="Semestre"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faListUl} className="text-blue-400 text-lg" />
              <input
                name="seccion"
                placeholder="Sección"
                value={form.seccion}
                onChange={handleChange}
                required
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
          </div>
        </div>
        {/* Cursos */}
        {facultad && carreras.length === 0 && (
          <div className="text-red-600 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faExclamationCircle} />
            No hay carreras para esta facultad.
          </div>
        )}
        {cursos.length > 0 && (
          <div>
            <label className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faListUl} />
              Selecciona cursos:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {cursos.map(curso => (
                <label key={curso.id_curso} className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 shadow-sm">
                  <input
                    type="checkbox"
                    checked={cursosSeleccionados.includes(curso.id_curso)}
                    onChange={() => handleCursoChange(curso.id_curso)}
                  />
                  {curso.nombre}
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Botón y mensajes */}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold py-3 rounded-lg shadow hover:from-blue-800 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 text-lg"
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          Registrar
        </button>
        {successMsg && (
          <p className="text-green-600 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} />
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faExclamationCircle} />
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default IngresarEstudiante;