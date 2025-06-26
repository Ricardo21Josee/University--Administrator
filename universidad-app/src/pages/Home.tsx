import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserPlus, faSearch, faEdit, faBell, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => (
  <div className="max-w-5xl mx-auto mt-16 p-10 bg-white/95 rounded-3xl shadow-2xl border border-blue-200 flex flex-col gap-10">
    {/* Bienvenida y seguridad */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faUserShield} className="text-blue-700 text-5xl" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-1">Bienvenido, Empleado</h1>
          <p className="text-blue-700 font-medium">Sistema Interno de Gestión Universitaria</p>
        </div>
      </div>
      <div className="bg-blue-100 text-blue-700 px-6 py-2 rounded-xl font-semibold flex items-center gap-2 shadow">
        <FontAwesomeIcon icon={faUserShield} className="text-lg" />
        Acceso restringido solo para personal autorizado
      </div>
    </div>

    {/* Accesos rápidos */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl p-7 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col items-center">
        <FontAwesomeIcon icon={faUserPlus} className="text-3xl text-blue-700 mb-2" />
        <span className="text-blue-800 font-bold text-lg mb-1">Ingresar Estudiante</span>
        <span className="text-blue-500 text-sm text-center">Registra nuevos estudiantes en el sistema.</span>
      </div>
      <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl p-7 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col items-center">
        <FontAwesomeIcon icon={faSearch} className="text-3xl text-blue-700 mb-2" />
        <span className="text-blue-800 font-bold text-lg mb-1">Buscar Estudiante</span>
        <span className="text-blue-500 text-sm text-center">Consulta información de estudiantes existentes.</span>
      </div>
      <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl p-7 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col items-center">
        <FontAwesomeIcon icon={faEdit} className="text-3xl text-blue-700 mb-2" />
        <span className="text-blue-800 font-bold text-lg mb-1">Cambiar Datos</span>
        <span className="text-blue-500 text-sm text-center">Actualiza los datos de los estudiantes.</span>
      </div>
    </div>

    {/* Noticias internas */}
    <div className="bg-blue-50 rounded-2xl p-6 shadow flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faBell} className="text-blue-600" />
        <span className="font-bold text-blue-800">Noticias y Avisos Internos</span>
      </div>
      <ul className="text-blue-700 text-sm list-disc list-inside pl-2">
        <li>Mantenimiento programado: sábado 29 de junio, 22:00-23:00h.</li>
        <li>Recuerda actualizar los datos de los estudiantes antes de fin de mes.</li>
        <li>Para soporte, contacta al área de sistemas.</li>
      </ul>
    </div>

    {/* Soporte */}
    <div className="flex items-center justify-end gap-2 text-blue-700">
      <FontAwesomeIcon icon={faHeadset} className="text-xl" />
      <span className="text-sm">¿Necesitas ayuda? <a href="mailto:soporte@novahorizonte.edu" className="underline text-blue-900">Contacta soporte</a></span>
    </div>
  </div>
);

export default Home;