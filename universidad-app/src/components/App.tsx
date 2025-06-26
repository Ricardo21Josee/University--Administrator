import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import IngresarEstudiante from '../pages/IngresarEstudiante';
import BuscarEstudiante from '../pages/BuscarEstudiante';
import CambiarEstudiante from '../pages/CambiarEstudiante';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSearch, faEdit, faUniversity, faBars, faTimes, faExternalLinkAlt, faUserShield, faBell, faHeadset } from '@fortawesome/free-solid-svg-icons';

// Logo con icono FontAwesome
const Logo = () => (
    <span className="text-white text-4xl mr-2">
        <FontAwesomeIcon icon={faUniversity} />
    </span>
);

// Componente para resaltar el enlace activo
const NavLink: React.FC<{ to: string; icon: any; children: React.ReactNode }> = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${isActive
                    ? 'bg-white text-blue-800 shadow-md border border-blue-400'
                    : 'text-white hover:bg-blue-400 hover:text-blue-900'}
            `}
        >
            <FontAwesomeIcon icon={icon} />
            {children}
        </Link>
    );
};

const App: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Router>
            <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Logo />
                        <div>
                            <span className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg block">Universidad Nova Horizonte</span>
                            <span className="text-blue-200 font-light text-lg block -mt-1">Sistema Integral de Administración</span>
                        </div>
                    </div>
                    {/* Menú hamburguesa para móviles */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menú"
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-8 h-8" />
                    </button>
                    {/* Menú principal */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-4">
                            <li>
                                <NavLink to="/" icon={faHome}>
                                    <span className="h-12 flex items-center">Inicio</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/ingresar" icon={faUserPlus}>
                                    <span>
                                        Ingresar<br />Estudiante
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/buscar" icon={faSearch}>
                                    <span>
                                        Buscar<br />Estudiante
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cambiar" icon={faEdit}>
                                    <span>
                                        Cambiar<br />Datos
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Menú móvil */}
                {menuOpen && (
                    <nav className="md:hidden bg-blue-800 px-6 pb-4 animate-fade-in-down rounded-b-2xl shadow-lg">
                        <ul className="flex flex-col gap-2">
                            <li><NavLink to="/" icon={faHome}>Inicio</NavLink></li>
                            <li><NavLink to="/ingresar" icon={faUserPlus}>Ingresar Estudiante</NavLink></li>
                            <li><NavLink to="/buscar" icon={faSearch}>Buscar Estudiante</NavLink></li>
                            <li><NavLink to="/cambiar" icon={faEdit}>Cambiar Datos</NavLink></li>
                        </ul>
                    </nav>
                )}
            </header>
            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10 px-2">
                <div className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/95 p-10 backdrop-blur-md border border-blue-200 relative flex flex-col gap-10">
                    <Routes>
                        <Route path="/" element={
                            // Aquí va tu página de inicio (bienvenida, accesos rápidos, noticias, etc.)
                            <>
                                {/* Panel de bienvenida y seguridad */}
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
                            </>
                        } />
                        <Route path="/ingresar" element={<IngresarEstudiante />} />
                        <Route path="/buscar" element={<BuscarEstudiante />} />
                        <Route path="/cambiar" element={<CambiarEstudiante />} />
                    </Routes>
                </div>
            </main>
            <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-blue-100 text-center py-8 mt-10 shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <FontAwesomeIcon icon={faUniversity} className="w-8 h-8 inline-block mr-2" />
                    <span className="text-base font-semibold">&copy; {new Date().getFullYear()} Universidad Nova Horizonte</span>
                    <span className="hidden md:inline-block">|</span>
                    <span className="text-xs">Sistema interno para empleados | <span className="text-blue-200">Tailwind CSS</span> <FontAwesomeIcon icon={faUniversity} className="inline-block" /></span>
                </div>
                <div className="mt-2 text-xs text-blue-200">
                    Desarrollado por el área de sistemas - Contacto: <a href="mailto:soporte@novahorizonte.edu" className="underline">soporte@novahorizonte.edu</a>
                </div>
            </footer>
            {/* Floating action button UX extra */}
            <a
                href="https://www.universidadnovahorizonte.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-blue-700 hover:bg-blue-900 text-white rounded-full shadow-lg p-4 transition-all duration-200 flex items-center gap-2 group"
                title="Ir al sitio oficial"
            >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Sitio Oficial</span>
            </a>
        </Router>
    );
};

export default App;