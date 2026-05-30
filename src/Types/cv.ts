export type CVTemplate = "professional" | "modern" | "creative" | "minimal";

export interface PersonalInfo {
   fullName: string;
   email: string;
   phone: string;
   location: string;
   summary: string;
   profileImage: string;
}

export interface Education {
   id: string;
   institution: string;
   degree: string;
   field: string;
   startDate: string;
   endDate: string;
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
}

export interface CVData {
   personalInfo: PersonalInfo;
   education: Education[];
   workExperience: WorkExperience[];
   skills: string[];
}

export interface TemplateOption {
   value: CVTemplate;
   label: string;
   description: string;
   color: string;
   preview: string;
}

export const templateOptions: TemplateOption[] = [
   { value: "professional", label: "Professional", description: "Classic blue theme with clean layout", color: "from-blue-500 to-cyan-500", preview: "📊" },
   { value: "modern", label: "Modern", description: "Gradient header with purple-pink colors", color: "from-purple-500 to-pink-500", preview: "🎨" },
   { value: "creative", label: "Creative", description: "Sidebar layout with emerald-teal gradient", color: "from-emerald-500 to-teal-500", preview: "✨" },
   { value: "minimal", label: "Minimal", description: "Clean and simple black & white design", color: "from-gray-700 to-gray-900", preview: "⚫" },
];
