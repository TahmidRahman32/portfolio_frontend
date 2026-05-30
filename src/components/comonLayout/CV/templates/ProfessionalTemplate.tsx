// import { CVData } from "@/types/cv";
// import { CVData } from "@/components/type/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/Types/cv";
// import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

interface TemplateProps {
   data: CVData;
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
   const { personalInfo, education, workExperience, skills } = data;

   return (
      <Card className="cv-container w-full max-w-[210mm] min-h-[297mm] mx-auto p-[15mm] bg-white shadow-lg print:shadow-none print:p-[15mm]">
         {/* Header Section */}
         <div className="flex items-start gap-6 mb-4">
            <Avatar className="h-20 w-20 border-4 border-blue-600 flex-shrink-0">
               <AvatarImage src={personalInfo.profileImage} alt={personalInfo.fullName} />
               <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {personalInfo.fullName
                     .split(" ")
                     .map((n) => n[0])
                     .join("")
                     .toUpperCase()
                     .slice(0, 2)}
               </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
               <h1 className="text-3xl font-bold text-gray-900 mb-2 break-words">{personalInfo.fullName || "Your Name"}</h1>
               <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                  {personalInfo.email && (
                     <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="break-all">{personalInfo.email}</span>
                     </div>
                  )}
                  {personalInfo.phone && (
                     <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{personalInfo.phone}</span>
                     </div>
                  )}
                  {personalInfo.location && (
                     <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{personalInfo.location}</span>
                     </div>
                  )}
               </div>
               {personalInfo.summary && <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>}
            </div>
         </div>

         <Separator className="my-4" />

         {/* Work Experience Section */}
         {workExperience.length > 0 && (
            <div className="mb-4">
               <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
               </div>
               <div className="space-y-3">
                  {workExperience.map((job) => (
                     <div key={job.id} className="border-l-2 border-blue-600 pl-3">
                        <h3 className="text-base font-semibold text-gray-900">{job.position}</h3>
                        <p className="text-sm text-gray-700 mb-0.5">{job.company}</p>
                        <p className="text-xs text-gray-500 mb-1">
                           {job.startDate} - {job.current ? "Present" : job.endDate}
                        </p>
                        {job.description && <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</p>}
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Education Section */}
         {education.length > 0 && (
            <div className="mb-4">
               <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
               </div>
               <div className="space-y-3">
                  {education.map((edu) => (
                     <div key={edu.id} className="border-l-2 border-blue-600 pl-3">
                        <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-sm text-gray-700 mb-0.5">
                           {edu.institution} {edu.field && `- ${edu.field}`}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                           {edu.startDate} - {edu.endDate}
                        </p>
                        {edu.description && <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{edu.description}</p>}
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Skills Section */}
         {skills.length > 0 && (
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Skills</h2>
               </div>
               <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                     <span key={index} className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {skill}
                     </span>
                  ))}
               </div>
            </div>
         )}
      </Card>
   );
}
