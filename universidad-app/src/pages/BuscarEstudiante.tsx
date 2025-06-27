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


import { useState } from 'react';
import { fetchStudentByCarnet } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faIdCard, faUser, faGraduationCap, faLayerGroup, faListUl, faBookOpen, faCheckCircle, faExclamationCircle, faCalendar } from '@fortawesome/free-solid-svg-icons';

const FIELD_LABELS: Record<string, string> = {
  carnet: 'Carnet',
  primer_nombre: 'Primer Nombre',
  segundo_nombre: 'Segundo Nombre',
  primer_apellido: 'Primer Apellido',
  segundo_apellido: 'Segundo Apellido',
  fecha_nacimiento: 'Fecha de Nacimiento',
  carrera: 'Carrera',
  semestre_actual: 'Semestre Actual',
  seccion: 'Sección',
  estado: 'Estado',
};

const FIELD_ICONS: Record<string, any> = {
  carnet: faIdCard,
  primer_nombre: faUser,
  segundo_nombre: faUser,
  primer_apellido: faUser,
  segundo_apellido: faUser,
  fecha_nacimiento: faCalendar,
  carrera: faGraduationCap,
  semestre_actual: faLayerGroup,
  seccion: faListUl,
  estado: faCheckCircle,
};

const BuscarEstudiante = () => {
  const [carnet, setCarnet] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setStudent(null);
    try {
      const data = await fetchStudentByCarnet(carnet);
      setStudent(data);
    } catch (e) {
      setError('Estudiante no encontrado');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center flex items-center justify-center gap-3">
        <FontAwesomeIcon icon={faSearch} className="text-blue-600" />
        Buscar Estudiante
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
      {error && (
        <p className="text-red-600 mb-4 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {error}
        </p>
      )}
      {student && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow border border-blue-200">
          <h3 className="text-2xl font-semibold mb-6 text-blue-700 text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Información del Estudiante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 mb-6">
            {Object.entries(student)
              .filter(([key]) => key !== 'cursos')
              .map(([key, value]) => {
                let displayValue = value;
                if (
                  (key === 'fecha_nacimiento' || key === 'fecha_registro' || key === 'fecha_matricula') &&
                  typeof value === 'string'
                ) {
                  displayValue = value.slice(0, 10);
                }
                return (
                  <div key={key} className="flex items-center gap-3 bg-white border border-blue-100 rounded-lg px-4 py-2 shadow-sm">
                    <FontAwesomeIcon icon={FIELD_ICONS[key] || faBookOpen} className="text-blue-400 text-lg" />
                    <div>
                      <span className="text-xs text-blue-500 font-semibold">{FIELD_LABELS[key] || key}</span>
                      <div className="text-base text-blue-900 font-medium">{String(displayValue)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Mostrar cursos si existen */}
          {student.cursos && Array.isArray(student.cursos) && student.cursos.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-blue-700 mb-2 text-center flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faListUl} />
                Cursos inscritos en el semestre {student.semestre_actual}
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow border border-blue-100">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left text-blue-700">Nombre</th>
                      <th className="py-2 px-4 text-left text-blue-700">Descripción</th>
                      <th className="py-2 px-4 text-left text-blue-700">Créditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.cursos.map((curso: any, idx: number) => (
                      <tr key={curso.id_curso || idx} className="border-t">
                        <td className="py-2 px-4">{curso.nombre}</td>
                        <td className="py-2 px-4">{curso.descripcion}</td>
                        <td className="py-2 px-4">{curso.creditos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {student.cursos && Array.isArray(student.cursos) && student.cursos.length === 0 && (
            <div className="mt-8 text-center text-gray-500">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              No tiene cursos asignados en este semestre.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuscarEstudiante;