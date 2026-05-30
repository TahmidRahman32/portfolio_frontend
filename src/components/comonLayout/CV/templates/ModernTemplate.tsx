// import { CVData } from "@/types/cv";
// import { CVData } from "@/components/type/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CVData } from "@/Types/cv";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

interface TemplateProps {
   data: CVData;
}

export default function ModernTemplate({ data }: TemplateProps) {
   const { personalInfo, education, workExperience, skills } = data;

   return (
      <Card className="cv-container w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none overflow-hidden">
         {/* Header with Gradient Background */}
         <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center gap-4">
               <Avatar className="h-20 w-20 border-4 border-white shadow-xl flex-shrink-0">
                  <AvatarImage src={personalInfo.profileImage} alt={personalInfo.fullName} />
                  <AvatarFallback className="text-xl bg-white text-purple-600">
                     {personalInfo.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                  </AvatarFallback>
               </Avatar>

               <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold mb-2 break-words">{personalInfo.fullName || "Your Name"}</h1>
                  <div className="flex flex-wrap gap-3 text-xs opacity-90">
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
               </div>
            </div>
            {personalInfo.summary && <p className="mt-3 text-white/90 text-sm leading-relaxed">{personalInfo.summary}</p>}
         </div>

         <div className="p-6">
            {/* Work Experience Section */}
            {workExperience.length > 0 && (
               <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3 pb-1 border-b-2 border-purple-200">
                     <Briefcase className="h-4 w-4 text-purple-600" />
                     <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                  </div>
                  <div className="space-y-4">
                     {workExperience.map((job) => (
                        <div key={job.id} className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-purple-600 before:rounded-full">
                           <h3 className="text-base font-semibold text-gray-900">{job.position}</h3>
                           <p className="text-sm text-purple-600 font-medium mb-0.5">{job.company}</p>
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
               <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3 pb-1 border-b-2 border-purple-200">
                     <GraduationCap className="h-4 w-4 text-purple-600" />
                     <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  </div>
                  <div className="space-y-4">
                     {education.map((edu) => (
                        <div key={edu.id} className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-purple-600 before:rounded-full">
                           <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                           <p className="text-sm text-purple-600 font-medium mb-0.5">
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
                  <div className="flex items-center gap-2 mb-3 pb-1 border-b-2 border-purple-200">
                     <Award className="h-4 w-4 text-purple-600" />
                     <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium shadow-sm">
                           {skill}
                        </span>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </Card>
   );
}
