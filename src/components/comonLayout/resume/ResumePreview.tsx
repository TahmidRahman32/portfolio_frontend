// "use client";

// // components/resume/ResumePreview.tsx
// import { useState } from "react";
// import { X, Edit2, Download, FileText } from "lucide-react";
// import { ResumeData, ResumeTemplate } from "@/Types/Resume";

// interface ResumePreviewProps {
//    data: ResumeData;
//    template: ResumeTemplate;
//    onEdit?: () => void;
//    onDownload?: () => void;
// }

// const ResumePaperPreview = ({ data, template }: { data: ResumeData; template: ResumeTemplate }) => {
//    const { personalInfo, summary, education, workExperience, skills, projects } = data;

//    const formatDate = (dateString?: string): string => {
//       if (!dateString) return "";
//       try {
//          const date = new Date(dateString);
//          return date.toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "short",
//          });
//       } catch {
//          return dateString;
//       }
//    };

//    // Template-specific styling
//    const getTemplateStyles = () => {
//       const baseStyles = {
//          container: "",
//          header: "",
//          section: "",
//          title: "",
//          text: "",
//          accent: "",
//       };

//       switch (template) {
//          case "modern":
//             return {
//                container: "bg-white text-gray-800",
//                header: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
//                section: "border-l-4 border-blue-500",
//                title: "text-blue-600 font-bold",
//                text: "text-gray-700",
//                accent: "bg-blue-100 text-blue-800",
//             };
//          case "professional":
//             return {
//                container: "bg-white text-gray-800",
//                header: "bg-gray-800 text-white",
//                section: "border-l-4 border-gray-600",
//                title: "text-gray-800 font-bold",
//                text: "text-gray-600",
//                accent: "bg-gray-100 text-gray-800",
//             };
//          case "minimal":
//             return {
//                container: "bg-white text-gray-800",
//                header: "bg-green-50 border-b border-green-200",
//                section: "",
//                title: "text-green-700 font-semibold",
//                text: "text-gray-600",
//                accent: "bg-green-100 text-green-800",
//             };
//          case "creative":
//             return {
//                container: "bg-white text-gray-800",
//                header: "bg-gradient-to-r from-orange-400 to-pink-500 text-white",
//                section: "border-l-4 border-orange-400",
//                title: "text-orange-500 font-bold",
//                text: "text-gray-700",
//                accent: "bg-orange-100 text-orange-800",
//             };
//          default:
//             return baseStyles;
//       }
//    };

//    const styles = getTemplateStyles();

//    return (
//       <div className={`${styles.container} p-6 font-sans text-sm leading-snug min-h-[600px] shadow-inner`}>
//          {/* Header */}
//          <div className={`${styles.header} p-6 rounded-lg mb-6`}>
//             <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
//             <div className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2 text-white/90 text-sm">
//                {personalInfo.email && <span>{personalInfo.email}</span>}
//                {personalInfo.phone && <span className="hidden sm:inline">•</span>}
//                {personalInfo.phone && <span>{personalInfo.phone}</span>}
//                {personalInfo.address && <span className="hidden sm:inline">•</span>}
//                {personalInfo.address && <span>{personalInfo.address}</span>}
//             </div>
//             <div className="flex flex-wrap justify-center gap-3 mt-2 text-white/80 text-sm">
//                {personalInfo.linkedin && <span>LinkedIn</span>}
//                {personalInfo.github && <span>GitHub</span>}
//                {personalInfo.website && <span>Portfolio</span>}
//             </div>
//          </div>

//          {/* Summary */}
//          {summary && (
//             <section className={`mb-6 ${styles.section} pl-4`}>
//                <h2 className={`text-lg mb-3 ${styles.title}`}>Professional Summary</h2>
//                <p className={`${styles.text} text-sm`}>{summary}</p>
//             </section>
//          )}

//          {/* Education */}
//          {education.length > 0 && (
//             <section className={`mb-6 ${styles.section} pl-4`}>
//                <h2 className={`text-lg mb-3 ${styles.title}`}>Education</h2>
//                {education.map((edu) => (
//                   <div key={edu.id} className="mb-4 last:mb-0">
//                      <div className="flex justify-between items-start">
//                         <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
//                         <span className="text-gray-600 text-sm whitespace-nowrap">
//                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
//                         </span>
//                      </div>
//                      <p className={`${styles.text}`}>
//                         {edu.degree}
//                         {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
//                      </p>
//                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
//                      {edu.description && <p className={`${styles.text} text-sm mt-1`}>{edu.description}</p>}
//                   </div>
//                ))}
//             </section>
//          )}

//          {/* Work Experience */}
//          {workExperience.length > 0 && (
//             <section className={`mb-6 ${styles.section} pl-4`}>
//                <h2 className={`text-lg mb-3 ${styles.title}`}>Professional Experience</h2>
//                {workExperience.map((exp) => (
//                   <div key={exp.id} className="mb-4 last:mb-0">
//                      <div className="flex justify-between items-start">
//                         <div>
//                            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
//                            <p className={`${styles.text} font-medium`}>{exp.company}</p>
//                         </div>
//                         <span className="text-gray-600 text-sm whitespace-nowrap">
//                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
//                         </span>
//                      </div>
//                      {exp.description && <p className={`${styles.text} text-sm mt-1`}>{exp.description}</p>}
//                      {exp.achievements && exp.achievements.length > 0 && (
//                         <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
//                            {exp.achievements.map((achievement, index) => (
//                               <li key={index}>{achievement}</li>
//                            ))}
//                         </ul>
//                      )}
//                   </div>
//                ))}
//             </section>
//          )}

//          {/* Skills */}
//          {skills.length > 0 && (
//             <section className={`mb-6 ${styles.section} pl-4`}>
//                <h2 className={`text-lg mb-3 ${styles.title}`}>Skills</h2>
//                <div className="flex flex-wrap gap-2">
//                   {skills.map((skill) => (
//                      <span key={skill.id} className={`${styles.accent} px-3 py-1 rounded text-sm`}>
//                         {skill.name}
//                      </span>
//                   ))}
//                </div>
//             </section>
//          )}

//          {/* Projects */}
//          {projects.length > 0 && (
//             <section className={`mb-6 ${styles.section} pl-4`}>
//                <h2 className={`text-lg mb-3 ${styles.title}`}>Projects</h2>
//                {projects.map((project) => (
//                   <div key={project.id} className="mb-4 last:mb-0">
//                      <div className="flex justify-between items-start">
//                         <h3 className="font-semibold text-gray-900">{project.name}</h3>
//                         {project.link && <span className="text-blue-600 text-sm">View Project</span>}
//                      </div>
//                      <p className={`${styles.text} text-sm mt-1`}>{project.description}</p>
//                      {project.technologies.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mt-2">
//                            {project.technologies.map((tech, index) => (
//                               <span key={index} className={`${styles.accent} px-2 py-1 rounded text-xs`}>
//                                  {tech}
//                               </span>
//                            ))}
//                         </div>
//                      )}
//                   </div>
//                ))}
//             </section>
//          )}
//       </div>
//    );
// };

// export default function ResumePreview({ data, template, onEdit, onDownload }: ResumePreviewProps) {
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const handleEditClick = () => {
//       setIsModalOpen(false);
//       onEdit?.();
//    };

//    const handleDownloadClick = () => {
//       onDownload?.();
//    };

//    return (
//       <>
//          {/* Preview Trigger Button */}
//          <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/60 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/80 transition-all duration-200"
//          >
//             <Download size={14} /> Preview
//          </button>

//          {/* A4 Preview Modal - Full Screen Responsive */}
//          {isModalOpen && (
//             <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
//                {/* Overlay to close on background click */}
//                <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

//                {/* Modal Container - Full Screen Responsive */}
//                <div className="relative w-screen h-screen md:w-full md:h-auto md:max-h-[95vh] md:rounded-2xl flex flex-col bg-gray-900 md:border md:border-white/10 md:shadow-2xl overflow-hidden">
//                   {/* Modal Header */}
//                   <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10 bg-gray-800/50 flex-shrink-0">
//                      <h2 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
//                         <FileText size={20} className="text-blue-400" />
//                         <span className="hidden sm:inline">A4 Resume Preview</span>
//                         <span className="sm:hidden">Preview</span>
//                      </h2>
//                      <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0">
//                         <X size={20} className="text-white/60" />
//                      </button>
//                   </div>

//                   {/* Modal Body - A4 Paper Responsive */}
//                   <div className="flex-1 overflow-auto bg-gray-950 p-2 md:p-6 flex items-center justify-center">
//                      {/* A4 Size Container - Responsive */}
//                      <div className="w-full md:w-[8.5in] h-full md:h-[11in] bg-white rounded-none md:rounded-lg shadow-none md:shadow-xl overflow-y-auto print:h-auto print:shadow-none print:rounded-none">
//                         <ResumePaperPreview data={data} template={template} />
//                      </div>
//                   </div>

//                   {/* Modal Footer */}
//                   <div className="flex items-center justify-end gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-white/10 bg-gray-800/50 flex-shrink-0 flex-wrap md:flex-nowrap">
//                      <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/60 text-xs font-semibold hover:bg-white/10 transition-colors order-2 md:order-1"
//                      >
//                         <span className="hidden md:inline">Close</span>
//                         <X size={14} className="md:hidden" />
//                      </button>
//                      <button onClick={handleDownloadClick} className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors order-3 md:order-2">
//                         <Download size={14} />
//                         <span className="hidden sm:inline">PDF</span>
//                      </button>
//                      <button
//                         onClick={handleEditClick}
//                         className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors order-1 md:order-3 flex-grow md:flex-grow-0"
//                      >
//                         <Edit2 size={14} />
//                         <span className="hidden sm:inline">Edit</span>
//                      </button>
//                   </div>
//                </div>
//             </div>
//          )}
//       </>
//    );
// }

"use client";

import { useState, useEffect } from "react";
import { X, Edit2, Download, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData, ResumeTemplate } from "@/Types/Resume";

interface ResumePreviewProps {
   data: ResumeData;
   template: ResumeTemplate;
   onEdit?: () => void;
   onDownload?: () => void;
}

// ── Template styles ────────────────────────────────────────────────────────────
function getTemplateStyles(template: ResumeTemplate) {
   switch (template) {
      case "modern":
         return {
            container: "bg-white text-gray-800",
            header: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
            section: "border-l-4 border-blue-500",
            title: "text-blue-600 font-bold",
            text: "text-gray-700",
            accent: "bg-blue-100 text-blue-800",
         };
      case "professional":
         return {
            container: "bg-white text-gray-800",
            header: "bg-gray-800 text-white",
            section: "border-l-4 border-gray-600",
            title: "text-gray-800 font-bold",
            text: "text-gray-600",
            accent: "bg-gray-100 text-gray-800",
         };
      case "minimal":
         return {
            container: "bg-white text-gray-800",
            header: "bg-green-50 border-b border-green-200",
            section: "",
            title: "text-green-700 font-semibold",
            text: "text-gray-600",
            accent: "bg-green-100 text-green-800",
         };
      case "creative":
         return {
            container: "bg-white text-gray-800",
            header: "bg-gradient-to-r from-orange-400 to-pink-500 text-white",
            section: "border-l-4 border-orange-400",
            title: "text-orange-500 font-bold",
            text: "text-gray-700",
            accent: "bg-orange-100 text-orange-800",
         };
      default:
         return {
            container: "bg-white text-gray-800",
            header: "bg-gray-800 text-white",
            section: "",
            title: "text-gray-800 font-bold",
            text: "text-gray-600",
            accent: "bg-gray-100 text-gray-800",
         };
   }
}

function fmtDate(s?: string) {
   if (!s) return "";
   try {
      return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short" });
   } catch {
      return s;
   }
}

// ── Paper content (shared between inline & modal) ──────────────────────────────
function ResumeContent({ data, template }: { data: ResumeData; template: ResumeTemplate }) {
   const { personalInfo, summary, education, workExperience, skills, projects } = data;
   const s = getTemplateStyles(template);

   return (
      <div className={`${s.container} font-sans text-sm leading-snug`}>
         {/* Header */}
         <div className={`${s.header} p-5 mb-5`}>
            <h1 className="text-xl font-bold mb-1.5">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs opacity-90">
               {personalInfo.email && <span>{personalInfo.email}</span>}
               {personalInfo.phone && (
                  <>
                     <span>·</span>
                     <span>{personalInfo.phone}</span>
                  </>
               )}
               {personalInfo.address && (
                  <>
                     <span>·</span>
                     <span>{personalInfo.address}</span>
                  </>
               )}
            </div>
            <div className="flex flex-wrap gap-3 mt-1.5 text-xs opacity-80">
               {personalInfo.linkedin && <span>LinkedIn</span>}
               {personalInfo.github && <span>GitHub</span>}
               {personalInfo.website && <span>Portfolio</span>}
            </div>
         </div>

         <div className="px-5 pb-5 space-y-4">
            {/* Summary */}
            {summary && (
               <section className={`${s.section} pl-3`}>
                  <h2 className={`text-sm mb-2 ${s.title}`}>Professional Summary</h2>
                  <p className={`${s.text} text-xs leading-relaxed`}>{summary}</p>
               </section>
            )}

            {/* Education */}
            {education.length > 0 && (
               <section className={`${s.section} pl-3`}>
                  <h2 className={`text-sm mb-2 ${s.title}`}>Education</h2>
                  {education.map((edu) => (
                     <div key={edu.id} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-start gap-2">
                           <h3 className="text-xs font-semibold text-gray-900">{edu.institution}</h3>
                           <span className="text-gray-500 text-[10px] whitespace-nowrap flex-none">
                              {fmtDate(edu.startDate)} – {edu.endDate ? fmtDate(edu.endDate) : "Present"}
                           </span>
                        </div>
                        <p className={`${s.text} text-xs`}>
                           {edu.degree}
                           {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                        </p>
                        {edu.gpa && <p className="text-gray-500 text-[10px]">GPA: {edu.gpa}</p>}
                        {edu.description && <p className={`${s.text} text-[10px] mt-0.5`}>{edu.description}</p>}
                     </div>
                  ))}
               </section>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && (
               <section className={`${s.section} pl-3`}>
                  <h2 className={`text-sm mb-2 ${s.title}`}>Professional Experience</h2>
                  {workExperience.map((exp) => (
                     <div key={exp.id} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-start gap-2">
                           <div>
                              <h3 className="text-xs font-semibold text-gray-900">{exp.position}</h3>
                              <p className={`${s.text} text-xs font-medium`}>{exp.company}</p>
                           </div>
                           <span className="text-gray-500 text-[10px] whitespace-nowrap flex-none">
                              {fmtDate(exp.startDate)} – {exp.current ? "Present" : fmtDate(exp.endDate)}
                           </span>
                        </div>
                        {exp.description && <p className={`${s.text} text-[10px] mt-0.5`}>{exp.description}</p>}
                        {exp.achievements && exp.achievements.length > 0 && (
                           <ul className="mt-1 space-y-0.5">
                              {exp.achievements.map((a, i) => (
                                 <li key={i} className="text-gray-500 text-[10px] flex gap-1">
                                    <span>•</span>
                                    {a}
                                 </li>
                              ))}
                           </ul>
                        )}
                     </div>
                  ))}
               </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
               <section className={`${s.section} pl-3`}>
                  <h2 className={`text-sm mb-2 ${s.title}`}>Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                     {skills.map((skill) => (
                        <span key={skill.id} className={`${s.accent} px-2 py-0.5 rounded text-[10px]`}>
                           {skill.name}
                        </span>
                     ))}
                  </div>
               </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
               <section className={`${s.section} pl-3`}>
                  <h2 className={`text-sm mb-2 ${s.title}`}>Projects</h2>
                  {projects.map((proj) => (
                     <div key={proj.id} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-start gap-2">
                           <h3 className="text-xs font-semibold text-gray-900">{proj.name}</h3>
                           {proj.link && <span className="text-blue-500 text-[10px]">View →</span>}
                        </div>
                        <p className={`${s.text} text-[10px] mt-0.5`}>{proj.description}</p>
                        {proj.technologies.length > 0 && (
                           <div className="flex flex-wrap gap-1 mt-1">
                              {proj.technologies.map((t, i) => (
                                 <span key={i} className={`${s.accent} px-1.5 py-0.5 rounded text-[9px]`}>
                                    {t}
                                 </span>
                              ))}
                           </div>
                        )}
                     </div>
                  ))}
               </section>
            )}
         </div>
      </div>
   );
}

// ── Full-screen modal ──────────────────────────────────────────────────────────
function PreviewModal({ data, template, onClose, onDownload, onEdit }: { data: ResumeData; template: ResumeTemplate; onClose: () => void; onDownload?: () => void; onEdit?: () => void }) {
   const [zoom, setZoom] = useState(1);

   // Lock body scroll
   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "";
      };
   }, []);

   // Esc to close
   useEffect(() => {
      const h = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", h);
      return () => window.removeEventListener("keydown", h);
   }, [onClose]);

   return (
      <AnimatePresence>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] flex flex-col bg-[#070707]">
            {/* ── Top bar ── */}
            <div className="flex-none flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/[0.07] bg-[#0A0A0A] backdrop-blur-sm">
               <div className="flex items-center gap-3">
                
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/[0.07] text-[10px] font-mono text-white/25">A4</span>
               </div>

               <div className="flex items-center gap-2">
                  {/* Zoom controls — desktop only */}
                  <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02]">
                     <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
                        <ZoomOut size={13} />
                     </button>
                     <span className="text-[10px] font-mono text-white/30 w-10 text-center">{Math.round(zoom * 100)}%</span>
                     <button onClick={() => setZoom((z) => Math.min(2, z + 0.1))} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
                        <ZoomIn size={13} />
                     </button>
                  </div>

                  {onEdit && (
                     <button
                        onClick={() => {
                           onClose();
                           onEdit?.();
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/50 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/70 transition-all duration-200"
                     >
                        <Edit2 size={12} /> Edit
                     </button>
                  )}
                  {onDownload && (
                     <button onClick={onDownload} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200">
                        <Download size={12} /> Download
                     </button>
                  )}
                  <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/35 hover:border-white/20 hover:text-white/60 transition-all duration-200">
                     <X size={16} />
                  </button>
               </div>
            </div>

            {/* ── Paper area ── */}
            <div className="flex-1 overflow-auto flex items-start justify-center py-6 px-4" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "28px 28px" }}>
               {/* A4 paper */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full shadow-2xl rounded-sm overflow-hidden"
                  style={{
                     maxWidth: `${Math.min(794 * zoom, window.innerWidth - 32)}px`,
                     transform: `scale(${zoom})`,
                     transformOrigin: "top center",
                     marginBottom: zoom > 1 ? `${(zoom - 1) * 794}px` : 0,
                  }}
               >
                  <ResumeContent data={data} template={template} />
               </motion.div>
            </div>

            {/* ── Mobile bottom bar ── */}
            <div className="md:hidden flex-none flex items-center justify-between px-4 py-3 border-t border-white/[0.07] bg-[#0A0A0A]">
               <div className="flex items-center gap-2">
                  <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))} className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40">
                     <ZoomOut size={14} />
                  </button>
                  <span className="text-[11px] font-mono text-white/30">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))} className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40">
                     <ZoomIn size={14} />
                  </button>
               </div>
               <div className="flex items-center gap-2">
                  {onDownload && (
                     <button onClick={onDownload} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-semibold">
                        <Download size={13} /> PDF
                     </button>
                  )}
               </div>
            </div>
         </motion.div>
      </AnimatePresence>
   );
}

// ── Main export: always-visible inline preview + modal ─────────────────────────
export default function ResumePreview({ data, template, onEdit, onDownload }: ResumePreviewProps) {
   const [modalOpen, setModalOpen] = useState(false);

   return (
      <>
         {/* Inline preview panel — always visible in the sidebar */}
         <div className="relative group">
            {/* Top-right action buttons */}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
               {onEdit && (
                  <button
                     onClick={onEdit}
                     className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/20 bg-black/60 backdrop-blur-sm text-white/60 text-[10px] font-mono uppercase tracking-wider hover:border-white/40 hover:text-white/80 transition-all duration-150"
                  >
                     <Edit2 size={10} /> Edit
                  </button>
               )}
               <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/20 bg-black/60 backdrop-blur-sm text-white/60 text-[10px] font-mono uppercase tracking-wider hover:border-white/40 hover:text-white/80 transition-all duration-150"
               >
                  <ExternalLink size={10} /> Full
               </button>
            </div>

            {/* Inline paper — scaled to fit the panel */}
            <div onClick={() => setModalOpen(true)} className="cursor-zoom-in rounded-xl overflow-hidden border border-white/[0.06] bg-white shadow-sm" title="Click to expand">
               <div style={{ transform: "scale(0.55)", transformOrigin: "top left", width: "182%", pointerEvents: "none" }}>
                  <ResumeContent data={data} template={template} />
               </div>
            </div>

            {/* Hover hint */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
               <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white/50">Click to expand</span>
            </div>
         </div>

         {/* Full-screen modal */}
         {modalOpen && <PreviewModal data={data} template={template} onClose={() => setModalOpen(false)} onDownload={onDownload} onEdit={onEdit} />}
      </>
   );
}