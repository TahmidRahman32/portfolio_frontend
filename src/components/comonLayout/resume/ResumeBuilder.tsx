// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { pdf } from "@react-pdf/renderer";
// import { motion, AnimatePresence } from "framer-motion";
// import { FileText, Download, ChevronLeft, ChevronRight, Layers, User, AlignLeft, GraduationCap, Briefcase, Zap, FolderOpen, ArrowLeft, Save, Trash2, RefreshCw, CheckCircle2 } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";

// import PersonalInfoForm from "./PersonalInfoForm";
// import EducationForm from "./EducationForm";
// import WorkExperienceForm from "./WorkExperienceForm";
// import SkillsForm from "./SkillsForm";
// import ProjectsForm from "./ProjectsForm";
// import ResumePreview from "./ResumePreview";
// import ResumePDFDocument from "./ResumePDFDocument";
// import TemplateSelector from "./TemplateSelector";

// // import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Project, ResumeTemplate } from "../type/Resume";
// // import { DEFAULT_TEMPLATE, TEMPLATES } from "@/utils/templates";
// import { useResumeApi } from "./useResume";
// import { Education, PersonalInfo, Project, ResumeData, ResumeTemplate, Skill, WorkExperience } from "@/Types/Resume";
// import { DEFAULT_TEMPLATE, TEMPLATES } from "@/utils/templates";
// // import { useResumeApi } from "./useResumeApi";

// const defaultResumeData: ResumeData = {
//    personalInfo: { fullName: "", email: "", phone: "", address: "", linkedin: "", github: "", website: "" },
//    summary: "",
//    education: [],
//    workExperience: [],
//    skills: [],
//    projects: [],
// };

// export const ease = [0.22, 1, 0.36, 1] as const;

// const sections = [
//    { id: "template", label: "Template", icon: Layers },
//    { id: "personal", label: "Personal", icon: User },
//    { id: "summary", label: "Summary", icon: AlignLeft },
//    { id: "education", label: "Education", icon: GraduationCap },
//    { id: "experience", label: "Experience", icon: Briefcase },
//    { id: "skills", label: "Skills", icon: Zap },
//    { id: "projects", label: "Projects", icon: FolderOpen },
// ];

// const sectionDescriptions: Record<string, string> = {
//    template: "Choose a layout that matches your style and industry.",
//    personal: "Enter your contact information and professional links.",
//    summary: "Write a compelling overview of your professional background.",
//    education: "List your academic qualifications and achievements.",
//    experience: "Detail your work history and accomplishments.",
//    skills: "Showcase your technical and professional capabilities.",
//    projects: "Highlight key projects and your contributions.",
// };

// export const inputCls = (error = false) =>
//    `w-full px-4 py-3 rounded-xl border text-sm font-mono text-white/70 placeholder-white/20 bg-white/[0.04] outline-none
//    transition-all duration-200 focus:bg-white/[0.07] focus:border-white/25 focus:text-white/80
//    ${error ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/[0.08]"}`;

// export const labelCls = "block text-xs font-mono uppercase tracking-[0.16em] text-white/35 mb-2";
// export const addBtnCls = "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold tracking-tight hover:bg-white/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
// export const removeBtnCls = "flex-none w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/[0.06] flex items-center justify-center text-red-400/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/[0.1] transition-all duration-200";

// function toApiFormat(data: ResumeData, template: ResumeTemplate) {
//    return {
//       title: `${data.personalInfo.fullName || "My"} Resume`,
//       fullName: data.personalInfo.fullName,
//       email: data.personalInfo.email,
//       phone: data.personalInfo.phone,
//       summary: data.summary,
//       experience: data.workExperience.map((w) => ({
//          jobTitle: w.position,
//          company: w.company,
//          startDate: w.startDate,
//          endDate: w.current ? undefined : w.endDate,
//          isCurrent: w.current,
//          description: w.description,
//       })),
//       education: data.education.map((e) => ({
//          degree: e.degree,
//          institution: e.institution,
//          field: e.fieldOfStudy,
//          graduationDate: e.endDate,
//          gpa: e.gpa,
//       })),
//       skills: data.skills.map((s) => ({
//          name: s.name,
//          proficiency: s.level >= 4 ? "expert" : s.level >= 3 ? "advanced" : s.level >= 2 ? "intermediate" : "beginner",
//          category: s.category,
//       })),
//       template,
//    };
// }

// function ApiStatusBadge({ status, lastSaved }: { status: string; lastSaved: Date | null }) {
//    if (status === "idle" && !lastSaved) return null;
//    const cfg = {
//       saving: { ring: "border-amber-500/30 bg-amber-500/[0.06] text-amber-400/70", dot: <div className="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />, label: "Saving…" },
//       saved: { ring: "border-emerald-500/25 bg-emerald-500/[0.05] text-emerald-400/60", dot: <CheckCircle2 size={10} />, label: lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saved" },
//       error: { ring: "border-red-500/25 bg-red-500/[0.05] text-red-400/60", dot: <div className="w-2 h-2 rounded-full bg-red-400/70" />, label: "Save failed" },
//       idle: { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: null, label: "Not saved" },
//       loading: { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />, label: "Loading…" },
//    }[status] ?? { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: null, label: "" };

//    return (
//       <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono ${cfg.ring}`}>
//          {cfg.dot}
//          {cfg.label}
//       </motion.span>
//    );
// }

// export default function ResumeBuilder() {
//    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
//    const [activeSection, setActiveSection] = useState("personal");
//    const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(DEFAULT_TEMPLATE);
//    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
//    const [errors, setErrors] = useState<Record<string, string>>({});

//    const { apiStatus, isSaving, lastSaved, hasSaved, saveResume, loadResume, deleteResume } = useResumeApi();

//    useEffect(() => {
//       (async () => {
//          const saved = await loadResume();
//          console.log(saved,"saved")
//          if (saved) {
//             setResumeData((prev) => ({
//                ...prev,
//                personalInfo: {
//                   ...prev.personalInfo,
//                   fullName: (saved as any).fullName ?? prev.personalInfo.fullName,
//                   email: (saved as any).email ?? prev.personalInfo.email,
//                   phone: (saved as any).phone ?? prev.personalInfo.phone,
//                },
//                summary: (saved as any).summary ?? prev.summary,
//             }));
//          }
//       })();
//    }, []); // eslint-disable-line

//    const updatePersonalInfo = useCallback((info: PersonalInfo) => setResumeData((p) => ({ ...p, personalInfo: info })), []);
//    const updateEducation = useCallback((education: Education[]) => setResumeData((p) => ({ ...p, education })), []);
//    const updateWorkExperience = useCallback((workExperience: WorkExperience[]) => setResumeData((p) => ({ ...p, workExperience })), []);
//    const updateSkills = useCallback((skills: Skill[]) => setResumeData((p) => ({ ...p, skills })), []);
//    const updateProjects = useCallback((projects: Project[]) => setResumeData((p) => ({ ...p, projects })), []);
//    const updateSummary = useCallback((summary: string) => setResumeData((p) => ({ ...p, summary })), []);

//    const validate = (): boolean => {
//       const e: Record<string, string> = {};
//       if (!resumeData.personalInfo.fullName.trim()) e.personal = "Full name is required";
//       if (!resumeData.personalInfo.email.trim()) e.personal = "Email is required";
//       if (!resumeData.personalInfo.phone.trim()) e.personal = "Phone is required";
//       if (!resumeData.education.length) e.education = "At least one education entry is required";
//       if (!resumeData.skills.length) e.skills = "At least one skill is required";
//       setErrors(e);
//       if (Object.keys(e).length) {
//          toast.warning("Missing required fields", { description: "Fill in all required sections before continuing." });
//       }
//       return Object.keys(e).length === 0;
//    };

//    const handleSave = async () => {
//       if (!validate()) {
//          setActiveSection(Object.keys(errors)[0]);
//          return;
//       }
//       console.log("resume Data", resumeData)
//       await saveResume(toApiFormat(resumeData, selectedTemplate) as any);
//    };

//    const handleDownload = async () => {
//       if (!validate()) {
//          setActiveSection(Object.keys(errors)[0]);
//          return;
//       }
//       setIsGeneratingPDF(true);
//       const tid = toast.loading("Generating PDF…", { description: "Building your resume document." });
//       try {
//          const blob = await pdf(<ResumePDFDocument data={resumeData} template={selectedTemplate} />).toBlob();
//          const url = URL.createObjectURL(blob);
//          const a = document.createElement("a");
//          a.href = url;
//          a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "resume"}_Resume.pdf`;
//          document.body.appendChild(a);
//          a.click();
//          document.body.removeChild(a);
//          URL.revokeObjectURL(url);
//          toast.success("PDF downloaded!", { id: tid, description: "Your resume is ready.", duration: 3000 });
//       } catch {
//          toast.error("PDF generation failed", { id: tid, description: "Please try again.", duration: 4000 });
//          setErrors((p) => ({ ...p, pdf: "Failed to generate PDF. Please try again." }));
//       } finally {
//          setIsGeneratingPDF(false);
//       }
//    };

//    const completion = (() => {
//       let c = 0;
//       if (selectedTemplate) c++;
//       if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) c++;
//       if (resumeData.summary) c++;
//       if (resumeData.education.length) c++;
//       if (resumeData.workExperience.length) c++;
//       if (resumeData.skills.length) c++;
//       if (resumeData.projects.length) c++;
//       return { completed: c, total: 7, pct: Math.round((c / 7) * 100) };
//    })();

//    const currentIdx = sections.findIndex((s) => s.id === activeSection);

//    return (
//       <div className="min-h-screen bg-[#080808] pt-18 md:pt-24 px-4 md:px-8">
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
//             style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//             }}
//          />
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
//             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
//          />

//          <div className="relative z-10 mx-auto">
//             {/* Header */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-center mb-10">
//                <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
//                   <FileText size={11} /> Resume Builder
//                </span>
//                <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-4xl md:text-6xl font-normal text-white tracking-tight mb-4">
//                   Build Your Resume
//                </h1>
//                <p className="text-sm font-mono text-white/30 max-w-xl mx-auto mb-6">Choose a template, fill in your details, and download a polished PDF in minutes.</p>
//                <div className="flex items-center justify-center gap-3 flex-wrap">
//                   <Link
//                      href="/cv"
//                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/70 transition-all duration-200"
//                   >
//                      <ArrowLeft size={13} /> Make Your CV
//                   </Link>
//                   <button
//                      onClick={() => loadResume()}
//                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200"
//                   >
//                      <RefreshCw size={12} /> Load Saved
//                   </button>
//                </div>
//             </motion.div>

//             {/* Progress */}
//             <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 mb-5">
//                <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                      <span className="text-xs font-mono uppercase tracking-widest text-white/30">Completion</span>
//                      <ApiStatusBadge status={apiStatus} lastSaved={lastSaved} />
//                   </div>
//                   <span className="text-sm font-bold text-white/65">{completion.pct}%</span>
//                </div>
//                <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
//                   <motion.div className="h-full bg-white/35 rounded-full" initial={{ width: 0 }} animate={{ width: `${completion.pct}%` }} transition={{ duration: 0.8, ease }} />
//                </div>
//                <p className="text-[11px] font-mono text-white/20 mt-2">
//                   {completion.completed} of {completion.total} sections completed
//                </p>
//             </motion.div>

//             <AnimatePresence>
//                {errors.pdf && (
//                   <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-sm font-mono text-red-400/80">
//                      {errors.pdf}
//                   </motion.div>
//                )}
//             </AnimatePresence>

//             {/* Main grid */}
//             <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
//                {/* Sidebar */}
//                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.15 }} className="xl:col-span-1">
//                   <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
//                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">Sections</p>
//                      <nav className="space-y-1">
//                         {sections.map((s) => {
//                            const Icon = s.icon;
//                            const active = activeSection === s.id;
//                            const hasErr = !!errors[s.id];
//                            return (
//                               <button
//                                  key={s.id}
//                                  onClick={() => setActiveSection(s.id)}
//                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${active ? "bg-white/[0.07] border-white/[0.14] text-white/90" : "border-transparent text-white/35 hover:bg-white/[0.04] hover:text-white/60"} ${hasErr ? "border-red-500/30 bg-red-500/[0.05] text-red-400/70" : ""}`}
//                               >
//                                  <Icon size={14} className="flex-none" />
//                                  <span className="text-xs font-mono tracking-wide flex-1">{s.label}</span>
//                                  {hasErr && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-none" />}
//                                  {active && !hasErr && <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-none" />}
//                               </button>
//                            );
//                         })}
//                      </nav>

//                      <div className="mt-5 pt-5 border-t border-white/[0.06]">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">Template</p>
//                         <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
//                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${TEMPLATES[selectedTemplate].color}`}>{TEMPLATES[selectedTemplate].preview}</div>
//                            <div>
//                               <p className="text-xs font-semibold text-white/60">{TEMPLATES[selectedTemplate].name}</p>
//                               <p className="text-[10px] font-mono text-white/25">A4 Format</p>
//                            </div>
//                         </div>
//                      </div>

//                      <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-2.5">
//                         <button
//                            onClick={handleSave}
//                            disabled={isSaving}
//                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/60 text-xs font-semibold hover:bg-white/[0.08] hover:text-white/80 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
//                         >
//                            {isSaving ? (
//                               <>
//                                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" /> Saving…
//                               </>
//                            ) : (
//                               <>
//                                  <Save size={13} /> Save Resume
//                               </>
//                            )}
//                         </button>
//                         <button
//                            onClick={handleDownload}
//                            disabled={isGeneratingPDF}
//                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                            {isGeneratingPDF ? (
//                               <>
//                                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Generating…
//                               </>
//                            ) : (
//                               <>
//                                  <Download size={15} /> Download PDF
//                               </>
//                            )}
//                         </button>
//                         {hasSaved && (
//                            <button
//                               onClick={() => deleteResume()}
//                               className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-red-400/60 text-xs font-mono uppercase tracking-widest hover:border-red-500/40 hover:text-red-400/80 hover:bg-red-500/[0.08] transition-all duration-200"
//                            >
//                               <Trash2 size={12} /> Delete Saved
//                            </button>
//                         )}
//                      </div>
//                   </div>
//                </motion.div>

//                {/* Form + Preview */}
//                <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-5">
//                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.2 }} className="lg:col-span-2">
//                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
//                         <div className="flex items-start justify-between mb-8">
//                            <div>
//                               <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/90 mb-1">
//                                  {sections.find((s) => s.id === activeSection)?.label}
//                               </h2>
//                               <p className="text-xs font-mono text-white/30">{sectionDescriptions[activeSection]}</p>
//                            </div>
//                            <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.03] text-[10px] font-mono text-white/25">
//                               {currentIdx + 1} / {sections.length}
//                            </span>
//                         </div>
//                         {errors[activeSection] && <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors[activeSection]}</div>}
//                         <AnimatePresence mode="wait">
//                            <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28, ease }}>
//                               {activeSection === "template" && <TemplateSelector selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />}
//                               {activeSection === "personal" && <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} errors={errors} />}
//                               {activeSection === "summary" && (
//                                  <div className="space-y-3">
//                                     <label className={labelCls}>Professional Summary</label>
//                                     <textarea value={resumeData.summary} onChange={(e) => updateSummary(e.target.value)} placeholder="Results-driven developer with 3+ years of experience…" className={`${inputCls()} h-40 resize-none`} />
//                                     <div className="flex justify-between text-[10px] font-mono text-white/20">
//                                        <span>Recommended: 2–3 sentences</span>
//                                        <span>{resumeData.summary.length}/500</span>
//                                     </div>
//                                  </div>
//                               )}
//                               {activeSection === "education" && <EducationForm education={resumeData.education} onChange={updateEducation} errors={errors} />}
//                               {activeSection === "experience" && <WorkExperienceForm experience={resumeData.workExperience} onChange={updateWorkExperience} />}
//                               {activeSection === "skills" && <SkillsForm skills={resumeData.skills} onChange={updateSkills} errors={errors} />}
//                               {activeSection === "projects" && <ProjectsForm projects={resumeData.projects} onChange={updateProjects} />}
//                            </motion.div>
//                         </AnimatePresence>
//                         <div className="flex justify-between mt-10 pt-6 border-t border-white/[0.06]">
//                            <button
//                               onClick={() => currentIdx > 0 && setActiveSection(sections[currentIdx - 1].id)}
//                               disabled={currentIdx === 0}
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
//                            >
//                               <ChevronLeft size={13} /> Previous
//                            </button>
//                            <button
//                               onClick={() => currentIdx < sections.length - 1 && setActiveSection(sections[currentIdx + 1].id)}
//                               disabled={currentIdx === sections.length - 1}
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
//                            >
//                               Next <ChevronRight size={13} />
//                            </button>
//                         </div>
//                      </div>
//                   </motion.div>

//                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.25 }} className="lg:col-span-1">
//                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
//                         <div className="flex items-center justify-between mb-4">
//                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Live Preview</p>
//                            <span className="text-[10px] font-mono text-white/20">{TEMPLATES[selectedTemplate].name} · A4</span>
//                         </div>
//                         <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white">
//                            <ResumePreview data={resumeData} template={selectedTemplate} />
//                         </div>
//                      </div>
//                   </motion.div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

"use client";

import { useState, useCallback, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ChevronLeft, ChevronRight, Layers, User, AlignLeft, GraduationCap, Briefcase, Zap, FolderOpen, ArrowLeft, Save, Trash2, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import ResumePreview from "./ResumePreview";
import ResumePDFDocument from "./ResumePDFDocument";
import TemplateSelector from "./TemplateSelector";

// import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Project, ResumeTemplate } from "../type/Resume";
import { DEFAULT_TEMPLATE, TEMPLATES } from "@/utils/templates";
// import { useResumeApi } from "./useResumeApi";
import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Project, ResumeTemplate } from "@/Types/Resume";
import { useResumeApi } from "./useResume";

// ── Defaults ──────────────────────────────────────────────────────────────────
const defaultResumeData: ResumeData = {
   personalInfo: { fullName: "", email: "", phone: "", address: "", linkedin: "", github: "", website: "" },
   summary: "",
   education: [],
   workExperience: [],
   skills: [],
   projects: [],
};

export const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
   { id: "template", label: "Template", icon: Layers },
   { id: "personal", label: "Personal", icon: User },
   { id: "summary", label: "Summary", icon: AlignLeft },
   { id: "education", label: "Education", icon: GraduationCap },
   { id: "experience", label: "Experience", icon: Briefcase },
   { id: "skills", label: "Skills", icon: Zap },
   { id: "projects", label: "Projects", icon: FolderOpen },
];

const sectionDescriptions: Record<string, string> = {
   template: "Choose a layout that matches your style and industry.",
   personal: "Enter your contact information and professional links.",
   summary: "Write a compelling overview of your professional background.",
   education: "List your academic qualifications and achievements.",
   experience: "Detail your work history and accomplishments.",
   skills: "Showcase your technical and professional capabilities.",
   projects: "Highlight key projects and your contributions.",
};

export const inputCls = (error = false) =>
   `w-full px-4 py-3 rounded-xl border text-sm font-mono text-white/70 placeholder-white/20 bg-white/[0.04] outline-none
   transition-all duration-200 focus:bg-white/[0.07] focus:border-white/25 focus:text-white/80
   ${error ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/[0.08]"}`;

export const labelCls = "block text-xs font-mono uppercase tracking-[0.16em] text-white/35 mb-2";
export const addBtnCls = "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold tracking-tight hover:bg-white/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
export const removeBtnCls = "flex-none w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/[0.06] flex items-center justify-center text-red-400/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/[0.1] transition-all duration-200";

// ── API payload mapper ─────────────────────────────────────────────────────────
function toApiFormat(data: ResumeData, template: ResumeTemplate) {
   return {
      title: `${data.personalInfo.fullName || "My"} Resume`,
      fullName: data.personalInfo.fullName,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      summary: data.summary,
      experience: data.workExperience.map((w) => ({
         jobTitle: w.position,
         company: w.company,
         startDate: w.startDate,
         endDate: w.current ? undefined : w.endDate,
         isCurrent: w.current,
         description: w.description,
      })),
      education: data.education.map((e) => ({
         degree: e.degree,
         institution: e.institution,
         field: e.fieldOfStudy,
         graduationDate: e.endDate,
         gpa: e.gpa,
      })),
      skills: data.skills.map((s) => ({
         name: s.name,
         proficiency: s.level >= 4 ? "expert" : s.level >= 3 ? "advanced" : s.level >= 2 ? "intermediate" : "beginner",
         category: s.category,
      })),
      template,
   };
}

// ── Status badge ───────────────────────────────────────────────────────────────
function ApiStatusBadge({ status, lastSaved }: { status: string; lastSaved: Date | null }) {
   if (status === "idle" && !lastSaved) return null;
   const cfg = {
      saving: { ring: "border-amber-500/30 bg-amber-500/[0.06] text-amber-400/70", dot: <div className="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />, label: "Saving…" },
      saved: { ring: "border-emerald-500/25 bg-emerald-500/[0.05] text-emerald-400/60", dot: <CheckCircle2 size={10} />, label: lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saved" },
      error: { ring: "border-red-500/25 bg-red-500/[0.05] text-red-400/60", dot: <div className="w-2 h-2 rounded-full bg-red-400/70" />, label: "Save failed" },
      idle: { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: null, label: "Not saved" },
      loading: { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />, label: "Loading…" },
   }[status] ?? { ring: "border-white/[0.07] bg-white/[0.02] text-white/25", dot: null, label: "" };

   return (
      <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono ${cfg.ring}`}>
         {cfg.dot}
         {cfg.label}
      </motion.span>
   );
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function ResumeBuilder() {
   const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
   const [activeSection, setActiveSection] = useState("personal");
   const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(DEFAULT_TEMPLATE);
   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});

   const { apiStatus, isSaving, lastSaved, hasSaved, saveResume, loadResume, deleteResume } = useResumeApi();

   // Auto-load on mount
   useEffect(() => {
      (async () => {
         const saved = await loadResume();
         if (saved) {
            setResumeData((prev) => ({
               ...prev,
               personalInfo: {
                  ...prev.personalInfo,
                  fullName: (saved as any).fullName ?? prev.personalInfo.fullName,
                  email: (saved as any).email ?? prev.personalInfo.email,
                  phone: (saved as any).phone ?? prev.personalInfo.phone,
               },
               summary: (saved as any).summary ?? prev.summary,
            }));
         }
      })();
   }, []); // eslint-disable-line

   const updatePersonalInfo = useCallback((info: PersonalInfo) => setResumeData((p) => ({ ...p, personalInfo: info })), []);
   const updateEducation = useCallback((education: Education[]) => setResumeData((p) => ({ ...p, education })), []);
   const updateWorkExperience = useCallback((workExperience: WorkExperience[]) => setResumeData((p) => ({ ...p, workExperience })), []);
   const updateSkills = useCallback((skills: Skill[]) => setResumeData((p) => ({ ...p, skills })), []);
   const updateProjects = useCallback((projects: Project[]) => setResumeData((p) => ({ ...p, projects })), []);
   const updateSummary = useCallback((summary: string) => setResumeData((p) => ({ ...p, summary })), []);

   const validate = (): boolean => {
      const e: Record<string, string> = {};
      if (!resumeData.personalInfo.fullName.trim()) e.personal = "Full name is required";
      if (!resumeData.personalInfo.email.trim()) e.personal = "Email is required";
      if (!resumeData.personalInfo.phone.trim()) e.personal = "Phone is required";
      if (!resumeData.education.length) e.education = "At least one education entry is required";
      if (!resumeData.skills.length) e.skills = "At least one skill is required";
      setErrors(e);
      if (Object.keys(e).length) {
         toast.warning("Missing required fields", { description: "Fill in all required sections before continuing." });
      }
      return Object.keys(e).length === 0;
   };

   const handleSave = async () => {
      if (!validate()) {
         setActiveSection(Object.keys(errors)[0]);
         return;
      }
      await saveResume(toApiFormat(resumeData, selectedTemplate) as any);
   };

   const handleDownload = async () => {
      if (!validate()) {
         setActiveSection(Object.keys(errors)[0]);
         return;
      }
      setIsGeneratingPDF(true);
      const tid = toast.loading("Generating PDF…", { description: "Building your resume document." });
      try {
         const blob = await pdf(<ResumePDFDocument data={resumeData} template={selectedTemplate} />).toBlob();
         const url = URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = url;
         a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "resume"}_Resume.pdf`;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         URL.revokeObjectURL(url);
         toast.success("PDF downloaded!", { id: tid, description: "Your resume is ready.", duration: 3000 });
      } catch {
         toast.error("PDF generation failed", { id: tid, description: "Please try again.", duration: 4000 });
         setErrors((p) => ({ ...p, pdf: "Failed to generate PDF. Please try again." }));
      } finally {
         setIsGeneratingPDF(false);
      }
   };

   const completion = (() => {
      let c = 0;
      if (selectedTemplate) c++;
      if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) c++;
      if (resumeData.summary) c++;
      if (resumeData.education.length) c++;
      if (resumeData.workExperience.length) c++;
      if (resumeData.skills.length) c++;
      if (resumeData.projects.length) c++;
      return { completed: c, total: 7, pct: Math.round((c / 7) * 100) };
   })();

   const currentIdx = sections.findIndex((s) => s.id === activeSection);

   return (
      <div className="min-h-screen bg-[#080808] md:pt-24 px-4 md:px-8">
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
         />

         <div className="relative z-10 mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-center mb-10">
               <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                  <FileText size={11} /> Resume Builder
               </span>
               <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-4xl md:text-6xl font-normal text-white tracking-tight mb-4">
                  Build Your Resume
               </h1>
               <p className="text-sm font-mono text-white/30 max-w-xl mx-auto mb-6">Choose a template, fill in your details, and download a polished PDF in minutes.</p>
               <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Link
                     href="/cv"
                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/70 transition-all duration-200"
                  >
                     <ArrowLeft size={13} /> Make Your CV
                  </Link>
                  <button
                     onClick={() => loadResume()}
                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200"
                  >
                     <RefreshCw size={12} /> Load Saved
                  </button>
               </div>
            </motion.div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 mb-5">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-mono uppercase tracking-widest text-white/30">Completion</span>
                     <ApiStatusBadge status={apiStatus} lastSaved={lastSaved} />
                  </div>
                  <span className="text-sm font-bold text-white/65">{completion.pct}%</span>
               </div>
               <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white/35 rounded-full" initial={{ width: 0 }} animate={{ width: `${completion.pct}%` }} transition={{ duration: 0.8, ease }} />
               </div>
               <p className="text-[11px] font-mono text-white/20 mt-2">
                  {completion.completed} of {completion.total} sections completed
               </p>
            </motion.div>

            <AnimatePresence>
               {errors.pdf && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-sm font-mono text-red-400/80">
                     {errors.pdf}
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Main grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
               {/* Sidebar */}
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.15 }} className="xl:col-span-1">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
                     <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">Sections</p>
                     <nav className="space-y-1">
                        {sections.map((s) => {
                           const Icon = s.icon;
                           const active = activeSection === s.id;
                           const hasErr = !!errors[s.id];
                           return (
                              <button
                                 key={s.id}
                                 onClick={() => setActiveSection(s.id)}
                                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${active ? "bg-white/[0.07] border-white/[0.14] text-white/90" : "border-transparent text-white/35 hover:bg-white/[0.04] hover:text-white/60"} ${hasErr ? "border-red-500/30 bg-red-500/[0.05] text-red-400/70" : ""}`}
                              >
                                 <Icon size={14} className="flex-none" />
                                 <span className="text-xs font-mono tracking-wide flex-1">{s.label}</span>
                                 {hasErr && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-none" />}
                                 {active && !hasErr && <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-none" />}
                              </button>
                           );
                        })}
                     </nav>

                     <div className="mt-5 pt-5 border-t border-white/[0.06]">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">Template</p>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${TEMPLATES[selectedTemplate].color}`}>{TEMPLATES[selectedTemplate].preview}</div>
                           <div>
                              <p className="text-xs font-semibold text-white/60">{TEMPLATES[selectedTemplate].name}</p>
                              <p className="text-[10px] font-mono text-white/25">A4 Format</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-2.5">
                        <button
                           onClick={handleSave}
                           disabled={isSaving}
                           className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/60 text-xs font-semibold hover:bg-white/[0.08] hover:text-white/80 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                           {isSaving ? (
                              <>
                                 <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" /> Saving…
                              </>
                           ) : (
                              <>
                                 <Save size={13} /> Save Resume
                              </>
                           )}
                        </button>
                        <button
                           onClick={handleDownload}
                           disabled={isGeneratingPDF}
                           className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {isGeneratingPDF ? (
                              <>
                                 <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Generating…
                              </>
                           ) : (
                              <>
                                 <Download size={15} /> Download PDF
                              </>
                           )}
                        </button>
                        {hasSaved && (
                           <button
                              onClick={() => deleteResume()}
                              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-red-400/60 text-xs font-mono uppercase tracking-widest hover:border-red-500/40 hover:text-red-400/80 hover:bg-red-500/[0.08] transition-all duration-200"
                           >
                              <Trash2 size={12} /> Delete Saved
                           </button>
                        )}
                     </div>
                  </div>
               </motion.div>

               {/* Form + Preview */}
               <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.2 }} className="lg:col-span-2">
                     <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
                        <div className="flex items-start justify-between mb-8">
                           <div>
                              <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/90 mb-1">
                                 {sections.find((s) => s.id === activeSection)?.label}
                              </h2>
                              <p className="text-xs font-mono text-white/30">{sectionDescriptions[activeSection]}</p>
                           </div>
                           <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.03] text-[10px] font-mono text-white/25">
                              {currentIdx + 1} / {sections.length}
                           </span>
                        </div>
                        {errors[activeSection] && <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors[activeSection]}</div>}
                        <AnimatePresence mode="wait">
                           <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28, ease }}>
                              {activeSection === "template" && <TemplateSelector selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />}
                              {activeSection === "personal" && <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} errors={errors} />}
                              {activeSection === "summary" && (
                                 <div className="space-y-3">
                                    <label className={labelCls}>Professional Summary</label>
                                    <textarea value={resumeData.summary} onChange={(e) => updateSummary(e.target.value)} placeholder="Results-driven developer with 3+ years of experience…" className={`${inputCls()} h-40 resize-none`} />
                                    <div className="flex justify-between text-[10px] font-mono text-white/20">
                                       <span>Recommended: 2–3 sentences</span>
                                       <span>{resumeData.summary.length}/500</span>
                                    </div>
                                 </div>
                              )}
                              {activeSection === "education" && <EducationForm education={resumeData.education} onChange={updateEducation} errors={errors} />}
                              {activeSection === "experience" && <WorkExperienceForm experience={resumeData.workExperience} onChange={updateWorkExperience} />}
                              {activeSection === "skills" && <SkillsForm skills={resumeData.skills} onChange={updateSkills} errors={errors} />}
                              {activeSection === "projects" && <ProjectsForm projects={resumeData.projects} onChange={updateProjects} />}
                           </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-between mt-10 pt-6 border-t border-white/[0.06]">
                           <button
                              onClick={() => currentIdx > 0 && setActiveSection(sections[currentIdx - 1].id)}
                              disabled={currentIdx === 0}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                           >
                              <ChevronLeft size={13} /> Previous
                           </button>
                           <button
                              onClick={() => currentIdx < sections.length - 1 && setActiveSection(sections[currentIdx + 1].id)}
                              disabled={currentIdx === sections.length - 1}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                           >
                              Next <ChevronRight size={13} />
                           </button>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.25 }} className="lg:col-span-1">
                     <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
                        <div className="flex items-center justify-between mb-4">
                           <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Live Preview</p>
                           <span className="text-[10px] font-mono text-white/20">{TEMPLATES[selectedTemplate].name} · A4</span>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white">
                           <ResumePreview data={resumeData} template={selectedTemplate} onEdit={() => setActiveSection("personal")} onDownload={handleDownload} />
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   );
}