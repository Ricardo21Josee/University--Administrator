import { useState, useEffect } from 'react';
import { fetchStudents, updateStudent, fetchCursos } from '../services/api';
import { Student } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faUser, faIdCard, faCalendar, faGraduationCap,
  faLayerGroup, faListUl, faCheckCircle, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

type StudentWithCursos = Student & {
  cursos?: { id_curso: number; nombre: string }[];
  cursosSeleccionados?: number[];
};

const CambiarEstudiante = () => {
  const [carnet, setCarnet] = useState('');
  const [student, setStudent] = useState<StudentWithCursos | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cursos, setCursos] = useState<{ id_curso: number, nombre: string }[]>([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    if (student?.carrera && student?.semestre_actual) {
      fetchCursos(student.carrera, student.semestre_actual).then(setCursos);
    } else {
      setCursos([]);
    }
  }, [student?.carrera, student?.semestre_actual]);

  useEffect(() => {
    if (student && Array.isArray(student.cursos)) {
      setCursosSeleccionados(student.cursos.map((c: any) => c.id_curso));
    }
  }, [student]);

  const handleSearch = async () => {
    setSuccessMsg('');
    setErrorMsg('');
    const students = await fetchStudents();
    const found = students.find(s => s.carnet === carnet);
    if (found) {
      setStudent(found);
    } else {
      setStudent(null);
      setErrorMsg('Estudiante no encontrado');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (student) setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleCursoChange = (id: number) => {
    setCursosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleUpdate = async () => {
    if (student) {
      try {
        await updateStudent({
          ...student,
          cursosSeleccionados,
        } as any);
        setSuccessMsg('Datos actualizados correctamente');
        setErrorMsg('');
      } catch {
        setErrorMsg('Error al actualizar los datos');
        setSuccessMsg('');
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-10 bg-white rounded-3xl shadow-2xl border border-blue-200">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center flex items-center justify-center gap-3">
        <FontAwesomeIcon icon={faUser} className="text-blue-600" />
        Cambiar Datos de Estudiante
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="flex items-center flex-1 bg-white border border-blue-200 rounded-lg px-3">
          <FontAwesomeIcon icon={faIdCard} className="text-blue-400 text-lg" />
          <input
            className="flex-1 border-0 focus:ring-0 pl-2 bg-transparent py-2 text-blue-900 placeholder-blue-300"
            placeholder="Carnet"
            value={carnet}
            onChange={e => setCarnet(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-blue-800 hover:to-blue-600 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faSearch} />
          Buscar
        </button>
      </div>
      {errorMsg && (
        <p className="text-red-600 mb-4 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {errorMsg}
        </p>
      )}
      {successMsg && (
        <p className="text-green-600 mb-4 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          {successMsg}
        </p>
      )}
      {student && (
        <div className="bg-blue-50 p-8 rounded-2xl shadow border border-blue-100">
          <h3 className="text-xl font-semibold mb-6 text-blue-700 text-center flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Editar Información
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-400 text-lg" />
              <input
                name="primer_nombre"
                placeholder="Primer Nombre"
                value={student.primer_nombre}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-300 text-lg" />
              <input
                name="segundo_nombre"
                placeholder="Segundo Nombre"
                value={student.segundo_nombre}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-400 text-lg" />
              <input
                name="primer_apellido"
                placeholder="Primer Apellido"
                value={student.primer_apellido}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-300 text-lg" />
              <input
                name="segundo_apellido"
                placeholder="Segundo Apellido"
                value={student.segundo_apellido}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2 col-span-1 md:col-span-2 lg:col-span-1">
              <FontAwesomeIcon icon={faCalendar} className="text-blue-400 text-lg" />
              <input
                name="fecha_nacimiento"
                type="date"
                value={student.fecha_nacimiento?.slice(0, 10)}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faLayerGroup} className="text-blue-400 text-lg" />
              <input
                name="semestre_actual"
                type="number"
                min={1}
                max={12}
                value={student.semestre_actual}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
                placeholder="Semestre"
              />
            </div>
            <div className="flex items-center bg-white border border-blue-200 rounded-md px-2">
              <FontAwesomeIcon icon={faListUl} className="text-blue-400 text-lg" />
              <input
                name="seccion"
                placeholder="Sección"
                value={student.seccion}
                onChange={handleChange}
                className="input-blue border-0 focus:ring-0 pl-2 bg-transparent flex-1"
              />
            </div>
          </div>
          {/* Cursos asignados */}
          <div className="mb-6">
            <label className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faListUl} />
              Cursos asignados:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {cursos.map(curso => (
                <label key={curso.id_curso} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-blue-100">
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
          <button
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold py-3 rounded-lg shadow hover:from-blue-800 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 text-lg"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Actualizar
          </button>
        </div>
      )}
    </div>
  );
};

export default CambiarEstudiante;