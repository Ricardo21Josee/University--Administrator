export interface Student {
  carnet: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  fecha_nacimiento: string;
  carrera: string;
  semestre_actual: number;
  seccion: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    credits: number;
    instructor: Instructor;
}

export interface Instructor {
    id: number;
    name: string;
    email: string;
    courses: Course[];
}

export interface University {
    students: Student[];
    courses: Course[];
    instructors: Instructor[];
}