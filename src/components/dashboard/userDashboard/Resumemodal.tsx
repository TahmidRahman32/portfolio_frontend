   // components/Dashboard/ResumeModal.tsx
   "use client";

   import { motion, AnimatePresence } from "framer-motion";
   import { X, Mail, Phone, MapPin,  Globe, Briefcase, Award, BookOpen, Code, Paperclip } from "lucide-react";
   import { FaGithub, FaLinkedin } from "react-icons/fa";

   interface PersonalInfo {
      fullName?: string;
      email?: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      github?: string;
      website?: string;
      [key: string]: any;
   }

   interface WorkExperience {
      id?: string;
      jobTitle?: string;
      company?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      [key: string]: any;
   }

   interface Education {
      id?: string;
      schoolName?: string;
      degree?: string;
      fieldOfStudy?: string;
      graduationDate?: string;
      [key: string]: any;
   }

   interface Skill {
      id?: string;
      name?: string;
      level?: number;
      category?: string;
      [key: string]: any;
   }

   interface Project {
      id?: string;
      name?: string;
      description?: string;
      technologies?: string[];
      link?: string;
      [key: string]: any;
   }

   interface Certification {
      id?: string;
      title?: string;
      issuer?: string;
      issueDate?: string;
      expirationDate?: string;
      [key: string]: any;
   }

   interface Resume {
      id: string;
      personalInfo?: PersonalInfo;
      summary?: string;
      workExperience?: WorkExperience[];
      education?: Education[];
      skills?: Skill[];
      projects?: Project[];
      certifications?: Certification[];
      createdAt?: string;
      updatedAt?: string;
   }

   interface ResumeModalProps {
      resume: Resume | null;
      isOpen: boolean;
      onClose: () => void;
   }

   export default function ResumeModal({ resume, isOpen, onClose }: ResumeModalProps) {
      if (!resume) return null;

      const personalInfo = resume.personalInfo || {};

      return (
         <AnimatePresence>
            {isOpen && (
               <>
                  {/* Backdrop */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

                  {/* Modal */}
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                     <div className="w-full max-w-4xl max-h-[90vh] bg-[#080808] rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-white/[0.05] to-white/[0.02] border-b border-white/[0.07] p-6 flex items-center justify-between">
                           <div>
                              <h2 className="text-xl font-bold text-white/90 mb-1">{personalInfo.fullName || "Resume"}</h2>
                              <p className="text-xs font-mono text-white/40">ID: {resume.id.slice(0, 12)}...</p>
                           </div>
                           <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white/60 hover:border-white/15 transition-all">
                              <X size={16} />
                           </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                           <div className="p-6 space-y-6">
                              {/* Personal Info */}
                              {personalInfo.fullName && (
                                 <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                       {personalInfo.email && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <Mail size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">Email</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.email}</p>
                                             </div>
                                          </div>
                                       )}
                                       {personalInfo.phone && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <Phone size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">Phone</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.phone}</p>
                                             </div>
                                          </div>
                                       )}
                                       {personalInfo.address && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <MapPin size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">Address</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.address}</p>
                                             </div>
                                          </div>
                                       )}
                                       {personalInfo.linkedin && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <FaLinkedin size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">LinkedIn</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.linkedin}</p>
                                             </div>
                                          </div>
                                       )}
                                       {personalInfo.github && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <FaGithub size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">GitHub</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.github}</p>
                                             </div>
                                          </div>
                                       )}
                                       {personalInfo.website && (
                                          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <Globe size={14} className="text-white/40 flex-shrink-0" />
                                             <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-white/30">Website</p>
                                                <p className="text-xs text-white/60 truncate">{personalInfo.website}</p>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                 </section>
                              )}

                              {/* Summary */}
                              {resume.summary && (
                                 <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Professional Summary</h3>
                                    <p className="text-sm text-white/50 leading-relaxed p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">{resume.summary}</p>
                                 </section>
                              )}

                              {/* Work Experience */}
                              {resume.workExperience && resume.workExperience.length > 0 && (
                                 <section className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                       <Briefcase size={16} className="text-white/40" />
                                       <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Work Experience</h3>
                                    </div>
                                    <div className="space-y-3">
                                       {resume.workExperience.map((exp, i) => (
                                          <div key={exp.id || i} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <div className="flex items-start justify-between mb-2">
                                                <div>
                                                   <p className="text-sm font-semibold text-white/80">{exp.jobTitle || "Position"}</p>
                                                   <p className="text-xs text-white/40">{exp.company}</p>
                                                </div>
                                                <span className="text-[10px] font-mono text-white/30">
                                                   {exp.startDate?.slice(0, 7)}
                                                   {exp.endDate && ` - ${exp.endDate.slice(0, 7)}`}
                                                </span>
                                             </div>
                                             {exp.description && <p className="text-xs text-white/50 leading-relaxed">{exp.description}</p>}
                                          </div>
                                       ))}
                                    </div>
                                 </section>
                              )}

                              {/* Education */}
                              {resume.education && resume.education.length > 0 && (
                                 <section className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                       <BookOpen size={16} className="text-white/40" />
                                       <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Education</h3>
                                    </div>
                                    <div className="space-y-3">
                                       {resume.education.map((edu, i) => (
                                          <div key={edu.id || i} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <div className="flex items-start justify-between mb-1">
                                                <div>
                                                   <p className="text-sm font-semibold text-white/80">{edu.schoolName || "School"}</p>
                                                   <p className="text-xs text-white/50">
                                                      {edu.degree}
                                                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                                                   </p>
                                                </div>
                                                {edu.graduationDate && <span className="text-[10px] font-mono text-white/30">{edu.graduationDate.slice(0, 7)}</span>}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </section>
                              )}

                              {/* Skills */}
                              {resume.skills && resume.skills.length > 0 && (
                                 <section className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                       <Code size={16} className="text-white/40" />
                                       <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Skills</h3>
                                    </div>
                                    <div className="space-y-2">
                                       {resume.skills.map((skill, i) => (
                                          <div key={skill.id || i} className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <div className="flex-1">
                                                <p className="text-sm text-white/70">{skill.name}</p>
                                                {skill.category && <p className="text-[10px] font-mono text-white/30">{skill.category}</p>}
                                             </div>
                                             {skill.level !== undefined && (
                                                <div className="flex items-center gap-1">
                                                   {[...Array(5)].map((_, idx) => (
                                                      <div key={idx} className={`w-2 h-2 rounded-full `} />
                                                   ))}
                                                </div>
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 </section>
                              )}

                              {/* Projects */}
                              {resume.projects && resume.projects.length > 0 && (
                                 <section className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                       <Paperclip size={16} className="text-white/40" />
                                       <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Projects</h3>
                                    </div>
                                    <div className="space-y-3">
                                       {resume.projects.map((project, i) => (
                                          <div key={project.id || i} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <div className="flex items-start justify-between mb-2">
                                                <p className="text-sm font-semibold text-white/80">{project.name}</p>
                                                {project.link && (
                                                   <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60">
                                                      View →
                                                   </a>
                                                )}
                                             </div>
                                             {project.description && <p className="text-xs text-white/50 mb-2 leading-relaxed">{project.description}</p>}
                                             {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                   {project.technologies.map((tech, idx) => (
                                                      <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-white/10 text-white/50">
                                                         {tech}
                                                      </span>
                                                   ))}
                                                </div>
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 </section>
                              )}

                              {/* Certifications */}
                              {resume.certifications && resume.certifications.length > 0 && (
                                 <section className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                       <Award size={16} className="text-white/40" />
                                       <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Certifications</h3>
                                    </div>
                                    <div className="space-y-3">
                                       {resume.certifications.map((cert, i) => (
                                          <div key={cert.id || i} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                             <div className="flex items-start justify-between">
                                                <div>
                                                   <p className="text-sm font-semibold text-white/80">{cert.title}</p>
                                                   <p className="text-xs text-white/40">{cert.issuer}</p>
                                                </div>
                                                {cert.issueDate && <span className="text-[10px] font-mono text-white/30">{cert.issueDate.slice(0, 7)}</span>}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </section>
                              )}
                           </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-white/[0.07] bg-white/[0.01] p-4 flex justify-end gap-3">
                           <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 text-sm font-semibold hover:border-white/20 hover:text-white/70 transition-all">
                              Close
                           </button>
                           <a href={`/resume-builder?edit=${resume.id}`} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
                              Edit Resume
                           </a>
                        </div>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      );
   }
