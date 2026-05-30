// import { CVData } from "@/types/cv";
// import { CVData } from "@/components/type/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CVData } from "@/Types/cv";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
   data: CVData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
   const { personalInfo, education, workExperience, skills } = data;

   return (
      <Card className="cv-container w-full max-w-[210mm] min-h-[297mm] mx-auto p-[15mm] bg-white shadow-lg print:shadow-none">
         {/* Header */}
         <div className="text-center mb-6">
            <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-gray-300">
               <AvatarImage src={personalInfo.profileImage} alt={personalInfo.fullName} />
               <AvatarFallback className="text-xl bg-gray-100 text-gray-700">
                  {personalInfo.fullName
                     .split(" ")
                     .map((n) => n[0])
                     .join("")
                     .toUpperCase()
                     .slice(0, 2)}
               </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-wide break-words">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex justify-center flex-wrap gap-3 text-xs text-gray-600">
               {personalInfo.email && (
                  <div className="flex items-center gap-1">
                     <Mail className="h-3 w-3 flex-shrink-0" />
                     <span className="break-all">{personalInfo.email}</span>
                  </div>
               )}
               {personalInfo.phone && (
                  <div className="flex items-center gap-1">
                     <Phone className="h-3 w-3 flex-shrink-0" />
                     <span>{personalInfo.phone}</span>
                  </div>
               )}
               {personalInfo.location && (
                  <div className="flex items-center gap-1">
                     <MapPin className="h-3 w-3 flex-shrink-0" />
                     <span>{personalInfo.location}</span>
                  </div>
               )}
            </div>
         </div>

         {/* Summary */}
         {personalInfo.summary && (
            <div className="mb-5 text-center">
               <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">{personalInfo.summary}</p>
            </div>
         )}

         <div className="border-t border-gray-200 pt-5 mb-5"></div>

         {/* Work Experience */}
         {workExperience.length > 0 && (
            <div className="mb-5">
               <h2 className="text-lg font-light text-gray-900 mb-3 tracking-wide uppercase">Experience</h2>
               <div className="space-y-4">
                  {workExperience.map((job) => (
                     <div key={job.id}>
                        <div className="flex justify-between items-start mb-0.5">
                           <h3 className="text-base font-medium text-gray-900">{job.position}</h3>
                           <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {job.startDate} - {job.current ? "Present" : job.endDate}
                           </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{job.company}</p>
                        {job.description && <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</p>}
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Education */}
         {education.length > 0 && (
            <div className="mb-5">
               <h2 className="text-lg font-light text-gray-900 mb-3 tracking-wide uppercase">Education</h2>
               <div className="space-y-4">
                  {education.map((edu) => (
                     <div key={edu.id}>
                        <div className="flex justify-between items-start mb-0.5">
                           <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                           <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {edu.startDate} - {edu.endDate}
                           </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                           {edu.institution} {edu.field && `• ${edu.field}`}
                        </p>
                        {edu.description && <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{edu.description}</p>}
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Skills */}
         {skills.length > 0 && (
            <div>
               <h2 className="text-lg font-light text-gray-900 mb-3 tracking-wide uppercase">Skills</h2>
               <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                     <span key={index} className="text-gray-700 text-xs">
                        {skill}
                        {index < skills.length - 1 && <span className="ml-2 text-gray-300">•</span>}
                     </span>
                  ))}
               </div>
            </div>
         )}
      </Card>
   );
}
