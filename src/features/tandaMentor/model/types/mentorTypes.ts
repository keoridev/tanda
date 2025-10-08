// Типизация для менторов
export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  grade?: string;
}

export interface Certification {
  name: string;
  year: string;
  organization?: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
}

export interface Statistics {
  experience: string;
  students: string;
  employment: string;
}

export interface Semester {
  name: string;
  topics: string[];
}

export interface CourseYear {
  year: number;
  title: string;
  description: string;
  color: "emerald" | "blue" | "purple";
  semesters: Semester[];
  projects: string[];
}

export interface Mentor {
  id: string;
  image: string;
  name: string;
  profession: string;
  experience: string;
  teacher: string;
  topics: string[];
  skills: string[];
  // Расширенные поля для детальной страницы
  bio: string;
  extendedBio: string;
  rating: number;
  reviewsCount: number;
  contact: Contact;
  statistics: Statistics;
  education: Education[];
  certifications: Certification[];
  courseProgram: CourseYear[];
  learningOutcomes: string[];
  schedule: {
    lectures: string[];
    consultations: string[];
  };
  achievements: string[];
  teachingExperience: string;
  specialization: string[];
}
