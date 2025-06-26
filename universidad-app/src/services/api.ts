import axios from 'axios';
import { Student } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

export const fetchStudents = async (): Promise<Student[]> => {
  const res = await axios.get(`${API_BASE_URL}/estudiantes`);
  return res.data;
};

export const createStudent = async (studentData: Omit<Student, 'carnet'> & { cursosSeleccionados: number[] }) => {
  const res = await axios.post(`${API_BASE_URL}/estudiantes`, studentData);
  return res.data;
};

export const deleteStudent = async (carnet: string) => {
  const res = await axios.delete(`${API_BASE_URL}/estudiantes/${carnet}`);
  return res.data;
};

export const fetchFacultades = async (): Promise<string[]> => {
  const res = await fetch('http://localhost:4000/api/facultades');
  return res.json();
};

export const fetchCarreras = async (facultad: string): Promise<string[]> => {
  const res = await fetch(`http://localhost:4000/api/carreras?facultad=${encodeURIComponent(facultad)}`);
  return res.json();
};

export const fetchStudentByCarnet = async (carnet: string) => {
  const res = await fetch(`http://localhost:4000/api/estudiantes/${carnet}`);
  if (!res.ok) throw new Error('No encontrado');
  return res.json();
};

export const updateStudent = async (student: Student) => {
  const res = await fetch(`http://localhost:4000/api/estudiantes/${student.carnet}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
};

export const fetchCursos = async (carrera: string, semestre: number): Promise<any[]> => {
  const res = await fetch(
    `http://localhost:4000/api/cursos?carrera=${encodeURIComponent(carrera)}&semestre=${semestre}`
  );
  if (!res.ok) throw new Error('Error al obtener cursos');
  return res.json();
};