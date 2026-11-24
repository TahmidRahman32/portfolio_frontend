// types/resume.ts
export interface PersonalInfo {
   fullName: string;
   email: string;
   phone: string;
   address: string;
   linkedin?: string;
   github?: string;
   website?: string;
   nationality?: string;
   dateOfBirth?: string;
   gender?: string;
   languages?: string;
}

export interface Education {
   id: string;
   institution: string;
   degree: string;
   fieldOfStudy: string;
   startDate: string;
   endDate: string;
   gpa?: string;
   description: string;
}

export interface WorkExperience {
   id: string;
   company: string;
   position: string;
   startDate: string;
   endDate: string;
   current: boolean;
   description: string;
   achievements: string[];
}

export interface Skill {
   id: string;
   name: string;
   level: number;
   category: string;
}

export interface Project {
   id: string;
   name: string;
   description: string;
   technologies: string[];
   link?: string;
   image?: string;
}

export interface Certification {
   id: string;
   title: string;
   issuer: string;
   issueDate: string;
   date?: string;
   expiryDate?: string;
   credentialId?: string;
   credentialUrl?: string;
   link?: string;
}

export interface ResumeData {
   id?: string;
   personalInfo: PersonalInfo;
   summary: string;
   template?: ResumeTemplate;
   education: Education[];
   workExperience: WorkExperience[];
   skills: Skill[];
   projects: Project[];
   certifications?: Certification[];
}

export type ResumeTemplate = "modern" | "professional" | "minimal" | "creative";

export interface TemplateConfig {
   id: ResumeTemplate;
   name: string;
   description: string;
   color: string;
   preview: string;
}

export interface ApiResponse<T = unknown> {
   success: boolean;
   message: string;
   code?: string;
   error?: string;
   data?: T;
}
