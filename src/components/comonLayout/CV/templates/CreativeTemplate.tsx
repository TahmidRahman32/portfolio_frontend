// import { CVData } from "@/types/cv";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";
// import { CVData } from "@/components/type/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CVData } from "@/Types/cv";
// import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

interface TemplateProps {
   data: CVData;
}

export default function CreativeTemplate({ data }: TemplateProps) {
   const { personalInfo, education, workExperience, skills } = data;

   return (
      <Card className="cv-container w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-3 min-h-[297mm]">
            {/* Sidebar */}
            <div className="bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-5">
               <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl mb-3">
                     <AvatarImage src={personalInfo.profileImage} alt={personalInfo.fullName} />
                     <AvatarFallback className="text-2xl bg-white text-emerald-600">
                        {personalInfo.fullName
                           .split(" ")
                           .map((n) => n[0])
                           .join("")
                           .toUpperCase()
                           .slice(0, 2)}
                     </AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-bold text-center break-words">{personalInfo.fullName || "Your Name"}</h1>
               </div>

               {/* Contact Info */}
               <div className="space-y-2 mb-4">
                  <h3 className="text-base font-bold border-b border-white/30 pb-1.5">Contact</h3>
                  {personalInfo.email && (
                     <div className="flex items-start gap-1.5 text-xs">
                        <Mail className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span className="break-all">{personalInfo.email}</span>
                     </div>
                  )}
                  {personalInfo.phone && (
                     <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{personalInfo.phone}</span>
                     </div>
                  )}
                  {personalInfo.location && (
                     <div className="flex items-start gap-1.5 text-xs">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span>{personalInfo.location}</span>
                     </div>
                  )}
               </div>

               {/* Skills */}
               {skills.length > 0 && (
                  <div>
                     <div className="flex items-center gap-1.5 mb-2 border-b border-white/30 pb-1.5">
                        <Award className="h-4 w-4" />
                        <h3 className="text-base font-bold">Skills</h3>
                     </div>
                     <div className="space-y-1.5">
                        {skills.map((skill, index) => (
                           <div key={index} className="bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs">
                              {skill}
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 p-5">
               {/* Summary */}
               {personalInfo.summary && (
                  <div className="mb-4">
                     <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-1 h-5 bg-emerald-600 rounded"></div>
                        About Me
                     </h2>
                     <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                  </div>
               )}

               {/* Work Experience */}
               {workExperience.length > 0 && (
                  <div className="mb-4">
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-5 bg-emerald-600 rounded"></div>
                        <Briefcase className="h-4 w-4 text-emerald-600" />
                        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                     </div>
                     <div className="space-y-3">
                        {workExperience.map((job) => (
                           <div key={job.id} className="bg-gray-50 p-3 rounded-lg border-l-4 border-emerald-600">
                              <h3 className="text-base font-semibold text-gray-900">{job.position}</h3>
                              <p className="text-sm text-emerald-600 font-medium mb-0.5">{job.company}</p>
                              <p className="text-xs text-gray-500 mb-1">
                                 {job.startDate} - {job.current ? "Present" : job.endDate}
                              </p>
                              {job.description && <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</p>}
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Education */}
               {education.length > 0 && (
                  <div>
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-5 bg-emerald-600 rounded"></div>
                        <GraduationCap className="h-4 w-4 text-emerald-600" />
                        <h2 className="text-xl font-bold text-gray-900">Education</h2>
                     </div>
                     <div className="space-y-3">
                        {education.map((edu) => (
                           <div key={edu.id} className="bg-gray-50 p-3 rounded-lg border-l-4 border-emerald-600">
                              <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                              <p className="text-sm text-emerald-600 font-medium mb-0.5">
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
            </div>
         </div>
      </Card>
   );
}
