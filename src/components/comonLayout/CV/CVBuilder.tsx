// "use client";
// import { useState, useCallback, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner";
// import { FileText, Sparkles, User, GraduationCap, Briefcase, Zap, Layers, Download, Printer, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { CVData, CVTemplate } from "../type/cv";
// import { TemplateSection } from "./TemplateSection";
// import { PersonalInfoSection } from "./PersonalInfoSection";
// import { EducationSection } from "./EducationSection";
// import { ExperienceSection } from "./ExperienceSection";
// import { SkillsSection } from "./SkillsSection";
// import { PreviewPanel } from "./PreviewPanel";

// // ── Shared style tokens (exported for child forms) ────────────────────────────
// export const inputCls = (err = false) =>
//    `w-full px-4 py-3 rounded-xl border text-sm font-mono text-white/70 placeholder-white/20
//    bg-white/[0.04] outline-none transition-all duration-200
//    focus:bg-white/[0.07] focus:border-white/25 focus:text-white/80
//    [color-scheme:dark]
//    ${err ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/[0.08]"}`;

// export const labelCls = "block text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 mb-2";

// export const addBtnCls = "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold tracking-tight hover:bg-white/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

// export const removeBtnCls = "flex-none w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/[0.06] flex items-center justify-center text-red-400/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/[0.1] transition-all duration-200";

// // ── Default data ───────────────────────────────────────────────────────────────
// const defaultCVData: CVData = {
//    personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "", profileImage: "" },
//    education: [],
//    workExperience: [],
//    skills: [],
// };

// const ease = [0.22, 1, 0.36, 1] as const;

// const sections = [
//    { id: "template", label: "Template", icon: Layers },
//    { id: "personal", label: "Personal", icon: User },
//    { id: "education", label: "Education", icon: GraduationCap },
//    { id: "experience", label: "Experience", icon: Briefcase },
//    { id: "skills", label: "Skills", icon: Zap },
// ];

// const sectionDescriptions: Record<string, string> = {
//    template: "Choose a CV template that matches your style.",
//    personal: "Enter your contact info and professional summary.",
//    education: "List your academic qualifications.",
//    experience: "Detail your work history and accomplishments.",
//    skills: "Showcase your technical and professional skills.",
// };

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function CVBuilder() {
//    const [cvData, setCVData] = useState<CVData>(defaultCVData);
//    const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>("professional");
//    const [activeSection, setActiveSection] = useState("template");
//    const [isUploading, setIsUploading] = useState(false);
//    const [errors, setErrors] = useState<Record<string, string>>({});
//    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//    // ── Validation ───────────────────────────────────────────────────────────────
//    const validate = useCallback((): boolean => {
//       const e: Record<string, string> = {};
//       if (!cvData.personalInfo.fullName.trim()) e.personal = "Full name is required";
//       if (!cvData.personalInfo.email.trim()) e.personal = "Email is required";
//       if (!cvData.personalInfo.phone.trim()) e.personal = "Phone is required";
//       if (!cvData.education.length) e.education = "At least one education entry is required";
//       if (!cvData.skills.length) e.skills = "At least one skill is required";
//       setErrors(e);
//       return Object.keys(e).length === 0;
//    }, [cvData]);

//    // ── PDF ──────────────────────────────────────────────────────────────────────
//    const handlePrint = () => {
//       if (!validate()) {
//          setActiveSection(Object.keys(errors)[0]);
//          toast.error("Please fix validation errors first");
//          return;
//       }
//       window.print();
//       toast.success("CV ready to print or save as PDF");
//    };

//    const handleDownloadPDF = async () => {
//       if (!validate()) {
//          setActiveSection(Object.keys(errors)[0]);
//          toast.error("Please fix validation errors first");
//          return;
//       }
//       setIsGeneratingPDF(true);
//       try {
//          const html2canvas = (await import("html2canvas")).default;
//          const jsPDF = (await import("jspdf")).default;
//          const el = document.querySelector(".preview-panel") as HTMLElement;
//          if (!el) throw new Error("Preview not found");
//          const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
//          const pdf = new jsPDF("p", "mm", "a4");
//          const imgData = canvas.toDataURL("image/png");
//          const pw = pdf.internal.pageSize.getWidth();
//          const ph = pdf.internal.pageSize.getHeight();
//          const r = Math.min(pw / canvas.width, ph / canvas.height);
//          pdf.addImage(imgData, "PNG", (pw - canvas.width * r) / 2, 0, canvas.width * r, canvas.height * r);
//          pdf.save(`${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "my"}_CV.pdf`);
//          toast.success("PDF downloaded!");
//       } catch (err) {
//          console.error(err);
//          toast.error("PDF generation failed. Try again.");
//       } finally {
//          setIsGeneratingPDF(false);
//       }
//    };

//    // ── Data handlers ─────────────────────────────────────────────────────────────
//    const updatePersonalInfo = useCallback((field: keyof CVData["personalInfo"], value: string) => {
//       setCVData((p) => ({ ...p, personalInfo: { ...p.personalInfo, [field]: value } }));
//       setErrors((p) => ({ ...p, personal: "" }));
//    }, []);

//    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (!file) return;
//       if (file.size > 5 * 1024 * 1024) {
//          toast.error("Image must be < 5 MB");
//          return;
//       }
//       setIsUploading(true);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//          updatePersonalInfo("profileImage", reader.result as string);
//          toast.success("Image uploaded");
//          setIsUploading(false);
//       };
//       reader.onerror = () => {
//          toast.error("Upload failed");
//          setIsUploading(false);
//       };
//       reader.readAsDataURL(file);
//    };

//    const addEducation = useCallback(() => setCVData((p) => ({ ...p, education: [...p.education, { id: Date.now().toString(), institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" }] })), []);

//    const updateEducation = useCallback((id: string, field: keyof CVData["education"][0], value: string) => {
//       setCVData((p) => ({ ...p, education: p.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
//       setErrors((p) => ({ ...p, education: "" }));
//    }, []);

//    const removeEducation = useCallback((id: string) => {
//       setCVData((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));
//       toast.success("Removed");
//    }, []);

//    const addWorkExperience = useCallback(() => setCVData((p) => ({ ...p, workExperience: [...p.workExperience, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }] })), []);

//    const updateWorkExperience = useCallback(
//       (id: string, field: keyof CVData["workExperience"][0], value: string | boolean) => setCVData((p) => ({ ...p, workExperience: p.workExperience.map((w) => (w.id === id ? { ...w, [field]: value } : w)) })),
//       [],
//    );

//    const removeWorkExperience = useCallback((id: string) => {
//       setCVData((p) => ({ ...p, workExperience: p.workExperience.filter((w) => w.id !== id) }));
//       toast.success("Removed");
//    }, []);

//    const addSkill = useCallback((s: string) => {
//       if (s.trim()) {
//          setCVData((p) => ({ ...p, skills: [...p.skills, s.trim()] }));
//          setErrors((p) => ({ ...p, skills: "" }));
//          toast.success("Skill added");
//       }
//    }, []);
//    const removeSkill = useCallback((i: number) => setCVData((p) => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) })), []);

//    // ── Section navigation event ──────────────────────────────────────────────────
//    useEffect(() => {
//       const handler = (e: CustomEvent) => setActiveSection(e.detail);
//       window.addEventListener("navigateSection", handler as EventListener);
//       return () => window.removeEventListener("navigateSection", handler as EventListener);
//    }, []);

//    // ── Completion ────────────────────────────────────────────────────────────────
//    const completion = (() => {
//       let c = 0;
//       if (cvData.personalInfo.fullName && cvData.personalInfo.email && cvData.personalInfo.phone) c++;
//       if (cvData.education.length) c++;
//       if (cvData.workExperience.length) c++;
//       if (cvData.skills.length) c++;
//       return { completed: c, total: 4, pct: Math.round((c / 4) * 100) };
//    })();

//    const sectionProps = {
//       activeSection,
//       errors,
//       cvData,
//       selectedTemplate,
//       isUploading,
//       onTemplateSelect: setSelectedTemplate,
//       onPersonalInfoUpdate: updatePersonalInfo,
//       onImageUpload: handleImageUpload,
//       onEducationAdd: addEducation,
//       onEducationUpdate: updateEducation,
//       onEducationRemove: removeEducation,
//       onExperienceAdd: addWorkExperience,
//       onExperienceUpdate: updateWorkExperience,
//       onExperienceRemove: removeWorkExperience,
//       onSkillsAdd: addSkill,
//       onSkillsRemove: removeSkill,
//    };

//    const renderSection = () => {
//       switch (activeSection) {
//          case "template":
//             return <TemplateSection {...sectionProps} />;
//          case "personal":
//             return <PersonalInfoSection {...sectionProps} />;
//          case "education":
//             return <EducationSection {...sectionProps} />;
//          case "experience":
//             return <ExperienceSection {...sectionProps} />;
//          case "skills":
//             return <SkillsSection {...sectionProps} />;
//          default:
//             return <TemplateSection {...sectionProps} />;
//       }
//    };

//    const currentIdx = sections.findIndex((s) => s.id === activeSection);

//    return (
//       <div className="min-h-screen bg-[#080808] md:pt-28 px-4 md:px-8 print:bg-white">
//          {/* Noise */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
//             style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//             }}
//          />
//          {/* Grid */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] print:hidden"
//             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
//          />

//          <div className="relative z-10  mx-auto print:hidden">
//             {/* ── Page header ── */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-center mb-10">
//                <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
//                   <Sparkles size={11} /> CV Builder
//                </span>
//                <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-4xl md:text-6xl font-normal text-white tracking-tight mb-4">
//                   Build Your CV
//                </h1>
//                <p className="text-sm font-mono text-white/30 max-w-xl mx-auto mb-6">Choose a template, fill in your details, and download a polished A4 CV in minutes.</p>
//                <Link
//                   href="/resume"
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-200"
//                >
//                   <ArrowLeft size={13} /> Make Your Resume
//                </Link>
//             </motion.div>

//             {/* ── Progress ── */}
//             <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 mb-6">
//                <div className="flex items-center justify-between mb-3">
//                   <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Completion</span>
//                   <span className="text-sm font-bold text-white/60">{completion.pct}%</span>
//                </div>
//                <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
//                   <motion.div className="h-full bg-white/35 rounded-full" initial={{ width: 0 }} animate={{ width: `${completion.pct}%` }} transition={{ duration: 0.9, ease }} />
//                </div>
//                <p className="text-[10px] font-mono text-white/20 mt-2">
//                   {completion.completed} of {completion.total} sections completed
//                </p>
//             </motion.div>

//             {/* ── Main grid ── */}
//             <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
//                {/* Sidebar */}
//                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.15 }} className="xl:col-span-1">
//                   <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
//                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">Sections</p>
//                      <nav className="space-y-1 mb-6">
//                         {sections.map((s) => {
//                            const Icon = s.icon;
//                            const active = activeSection === s.id;
//                            const hasErr = !!errors[s.id];
//                            return (
//                               <button
//                                  key={s.id}
//                                  onClick={() => setActiveSection(s.id)}
//                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
//                                     active ? "bg-white/[0.07] border-white/[0.14] text-white/80" : "border-transparent text-white/30 hover:bg-white/[0.04] hover:text-white/55"
//                                  } ${hasErr ? "border-red-500/25 bg-red-500/[0.04] text-red-400/60" : ""}`}
//                               >
//                                  <Icon size={14} className="flex-none" />
//                                  <span className="text-xs font-mono tracking-wide flex-1">{s.label}</span>
//                                  {hasErr && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-none" />}
//                                  {active && !hasErr && <span className="w-1.5 h-1.5 rounded-full bg-white/35 flex-none" />}
//                               </button>
//                            );
//                         })}
//                      </nav>

//                      {/* Template info */}
//                      <div className="px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] mb-5">
//                         <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-1">Template</p>
//                         <p className="text-xs font-semibold text-white/50 capitalize">{selectedTemplate}</p>
//                      </div>

//                      {/* Actions */}
//                      <div className="space-y-2.5 pt-5 border-t border-white/[0.06]">
//                         <button
//                            onClick={handleDownloadPDF}
//                            disabled={isGeneratingPDF}
//                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                            {isGeneratingPDF ? (
//                               <>
//                                  <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
//                                  Generating…
//                               </>
//                            ) : (
//                               <>
//                                  <Download size={13} /> Download PDF
//                               </>
//                            )}
//                         </button>
//                         <button
//                            onClick={handlePrint}
//                            disabled={isGeneratingPDF}
//                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/45 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/65 transition-all duration-200 disabled:opacity-30"
//                         >
//                            <Printer size={13} /> Print CV
//                         </button>
//                      </div>
//                   </div>
//                </motion.div>

//                {/* Form + Preview */}
//                <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-5">
//                   {/* Form */}
//                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.2 }} className="lg:col-span-2">
//                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
//                         {/* Section header */}
//                         <div className="flex items-start justify-between mb-8">
//                            <div>
//                               <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-2xl font-normal text-white/85 mb-1">
//                                  {sections.find((s) => s.id === activeSection)?.label}
//                               </h2>
//                               <p className="text-xs font-mono text-white/25">{sectionDescriptions[activeSection]}</p>
//                            </div>
//                            <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.03] text-[10px] font-mono text-white/20">
//                               {currentIdx + 1} / {sections.length}
//                            </span>
//                         </div>

//                         {/* Error banner */}
//                         {errors[activeSection] && <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors[activeSection]}</div>}

//                         {/* Section content */}
//                         <AnimatePresence mode="wait">
//                            <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28, ease }}>
//                               {renderSection()}
//                            </motion.div>
//                         </AnimatePresence>

//                         {/* Nav buttons */}
//                         <div className="flex justify-between mt-10 pt-6 border-t border-white/[0.06]">
//                            <button
//                               onClick={() => currentIdx > 0 && setActiveSection(sections[currentIdx - 1].id)}
//                               disabled={currentIdx === 0}
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
//                            >
//                               <ChevronLeft size={13} /> Previous
//                            </button>
//                            <button
//                               onClick={() => currentIdx < sections.length - 1 && setActiveSection(sections[currentIdx + 1].id)}
//                               disabled={currentIdx === sections.length - 1}
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
//                            >
//                               Next <ChevronRight size={13} />
//                            </button>
//                         </div>
//                      </div>
//                   </motion.div>

//                   {/* Preview */}
//                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.25 }} className="lg:col-span-1">
//                      <PreviewPanel cvData={cvData} selectedTemplate={selectedTemplate} className="preview-panel" />
//                   </motion.div>
//                </div>
//             </div>
//          </div>

//          {/* Print-only panel */}
//          <div className="hidden print:block">
//             <PreviewPanel cvData={cvData} selectedTemplate={selectedTemplate} className="preview-panel" />
//          </div>
//       </div>
//    );
// }

"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FileText, User, GraduationCap, Briefcase, Zap, Layers, Download, Printer, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
// import { CVData, CVTemplate } from "../type/cv";
import { TemplateSection } from "./TemplateSection";
// import { PersonalInfoSection } from "./PersonalInfoSection";
// import { EducationSection } from "./EducationSection";
// import { ExperienceSection } from "./ExperienceSection";
// import { SkillsSection } from "./SkillsSection";
import { PreviewPanel } from "./PreviewPanel";
import { CVData, CVTemplate } from "@/Types/cv";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";

// ── Shared tokens ──────────────────────────────────────────────────────────────
export const inputCls =
   "w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm font-mono text-white/70 placeholder-white/20 outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/[0.07] focus:text-white/80 [color-scheme:dark]";
export const labelCls = "block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2";
export const panelCls = "rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm";
export const ease = [0.22, 1, 0.36, 1] as const;

const defaultCVData: CVData = {
   personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "", profileImage: "" },
   education: [],
   workExperience: [],
   skills: [],
};

const sections = [
   { id: "template", label: "Template", icon: Layers },
   { id: "personal", label: "Personal", icon: User },
   { id: "education", label: "Education", icon: GraduationCap },
   { id: "experience", label: "Experience", icon: Briefcase },
   { id: "skills", label: "Skills", icon: Zap },
];

export default function CVBuilder() {
   const [cvData, setCVData] = useState<CVData>(defaultCVData);
   const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>("professional");
   const [activeSection, setActiveSection] = useState("template");
   const [isUploading, setIsUploading] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

   const currentIdx = sections.findIndex((s) => s.id === activeSection);

   const validateCV = useCallback((): boolean => {
      const e: Record<string, string> = {};
      if (!cvData.personalInfo.fullName.trim()) e.personalInfo = "Full name is required";
      if (!cvData.personalInfo.email.trim()) e.personalInfo = "Email is required";
      if (!cvData.personalInfo.phone.trim()) e.personalInfo = "Phone is required";
      if (!cvData.education.length) e.education = "At least one education entry is required";
      if (!cvData.skills.length) e.skills = "At least one skill is required";
      setErrors(e);
      return Object.keys(e).length === 0;
   }, [cvData]);

   const handlePrint = () => {
      if (!validateCV()) {
         setActiveSection(Object.keys(errors)[0]);
         toast.error("Fix errors before printing");
         return;
      }
      window.print();
      toast.success("Printing…");
   };

   const handleDownloadPDF = async () => {
      if (!validateCV()) {
         setActiveSection(Object.keys(errors)[0]);
         toast.error("Fix errors before downloading");
         return;
      }
      setIsGeneratingPDF(true);
      try {
         const html2canvas = (await import("html2canvas")).default;
         const jsPDF = (await import("jspdf")).default;
         const el = document.querySelector(".preview-panel") as HTMLElement;
         if (!el) throw new Error("Preview not found");
         const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
         const pdf = new jsPDF("p", "mm", "a4");
         const pw = pdf.internal.pageSize.getWidth(),
            ph = pdf.internal.pageSize.getHeight();
         const ratio = Math.min(pw / canvas.width, ph / canvas.height);
         pdf.addImage(canvas.toDataURL("image/png"), "PNG", (pw - canvas.width * ratio) / 2, 0, canvas.width * ratio, canvas.height * ratio);
         pdf.save(`${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "my"}_CV.pdf`);
         toast.success("PDF downloaded!");
      } catch {
         toast.error("Failed. Try again.");
      } finally {
         setIsGeneratingPDF(false);
      }
   };

   const updatePersonalInfo = useCallback(
      (field: string, value: string) => {
         setCVData((p) => ({ ...p, personalInfo: { ...p.personalInfo, [field]: value } }));
         if (errors.personalInfo) setErrors((p) => ({ ...p, personalInfo: "" }));
      },
      [errors.personalInfo],
   );

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
         toast.error("Image must be < 5MB");
         return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
         updatePersonalInfo("profileImage", reader.result as string);
         toast.success("Image uploaded");
         setIsUploading(false);
      };
      reader.onerror = () => {
         toast.error("Upload failed");
         setIsUploading(false);
      };
      reader.readAsDataURL(file);
   };

   const addEducation = useCallback(() => setCVData((p) => ({ ...p, education: [...p.education, { id: Date.now().toString(), institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" }] })), []);
   const updateEducation = useCallback(
      (id: string, field: keyof (typeof cvData.education)[0], value: string) => {
         setCVData((p) => ({ ...p, education: p.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
         if (errors.education) setErrors((p) => ({ ...p, education: "" }));
      },
      [errors.education],
   );
   const removeEducation = useCallback((id: string) => {
      setCVData((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));
      toast.success("Removed");
   }, []);

   const addWorkExperience = useCallback(() => setCVData((p) => ({ ...p, workExperience: [...p.workExperience, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }] })), []);
   const updateWorkExperience = useCallback(
      (id: string, field: string | number | symbol, value: string | boolean) =>
         setCVData((p) => ({
            ...p,
            workExperience: p.workExperience.map((w) => (w.id === id ? { ...w, [field as keyof (typeof cvData.workExperience)[0]]: value } : w)),
         })),
      [],
   );
   const removeWorkExperience = useCallback((id: string) => {
      setCVData((p) => ({ ...p, workExperience: p.workExperience.filter((w) => w.id !== id) }));
      toast.success("Removed");
   }, []);

   const updateSkills = useCallback(
      (skills: string[]) => {
         setCVData((p) => ({ ...p, skills }));
         if (errors.skills) setErrors((p) => ({ ...p, skills: "" }));
      },
      [errors.skills],
   );
   const addSkill = useCallback(
      (s: string) => {
         if (s.trim()) updateSkills([...cvData.skills, s.trim()]);
      },
      [cvData.skills, updateSkills],
   );
   const removeSkill = useCallback((i: number) => updateSkills(cvData.skills.filter((_, idx) => idx !== i)), [cvData.skills, updateSkills]);

   const completion = (() => {
      let c = 0;
      if (cvData.personalInfo.fullName && cvData.personalInfo.email && cvData.personalInfo.phone) c++;
      if (cvData.education.length) c++;
      if (cvData.workExperience.length) c++;
      if (cvData.skills.length) c++;
      return { completed: c, total: 4, pct: Math.round((c / 4) * 100) };
   })();

   useEffect(() => {
      const h = (e: CustomEvent) => setActiveSection(e.detail);
      window.addEventListener("navigateSection", h as EventListener);
      return () => window.removeEventListener("navigateSection", h as EventListener);
   }, []);

     const sectionProps = {
        activeSection,
        errors,
        cvData,
        selectedTemplate,
        isUploading,
        onTemplateSelect: setSelectedTemplate,
        onPersonalInfoUpdate: updatePersonalInfo,
        onImageUpload: handleImageUpload,
        onEducationAdd: addEducation,
        onEducationUpdate: updateEducation,
        onEducationRemove: removeEducation,
        onExperienceAdd: addWorkExperience,
        onExperienceUpdate: updateWorkExperience,
        onExperienceRemove: removeWorkExperience,
        onSkillsAdd: addSkill,
        onSkillsRemove: removeSkill,
     };

   const renderSection = () => {
      switch (activeSection) {
         case "template":
            return <TemplateSection {...sectionProps} />;
         case "personal":
            return <PersonalInfoSection {...sectionProps} />;
         case "education":
            return <EducationSection {...sectionProps} />;
         case "experience":
            return <ExperienceSection {...sectionProps} />;
         case "skills":
            return <SkillsSection {...sectionProps} />;
         default:
            return <TemplateSection {...sectionProps} />;
      }
   };

   return (
      <div className="min-h-screen bg-[#080808] py-10 px-4 md:px-8 print:bg-white">
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

         <div className="relative z-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-center mb-10 print:hidden">
               <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                  <FileText size={11} /> CV Builder
               </span>
               <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-4xl md:text-6xl font-normal text-white tracking-tight mb-4">
                  Build Your CV
               </h1>
               <p className="text-sm font-mono text-white/30 max-w-xl mx-auto mb-6">Choose a template, fill in your details, download a polished PDF.</p>
               <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200"
               >
                  <ArrowLeft size={12} /> Make Your Resume
               </Link>
            </motion.div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className={`${panelCls} p-5 mb-5 print:hidden`}>
               <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Completion</span>
                  <span className="text-sm font-bold text-white/55">{completion.pct}%</span>
               </div>
               <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white/35 rounded-full" initial={{ width: 0 }} animate={{ width: `${completion.pct}%` }} transition={{ duration: 0.8, ease }} />
               </div>
               <p className="text-[10px] font-mono text-white/20 mt-2">
                  {completion.completed} of {completion.total} sections completed
               </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
               {/* Sidebar */}
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.15 }} className="xl:col-span-1 print:hidden">
                  <div className={`${panelCls} p-5 sticky top-6`}>
                     <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">Sections</p>
                     <nav className="space-y-1 mb-6">
                        {sections.map((s) => {
                           const Icon = s.icon;
                           const active = activeSection === s.id;
                           const hasErr = !!errors[s.id];
                           return (
                              <button
                                 key={s.id}
                                 onClick={() => setActiveSection(s.id)}
                                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${active ? "bg-white/[0.07] border-white/[0.14] text-white/85" : "border-transparent text-white/30 hover:bg-white/[0.04] hover:text-white/55"} ${hasErr ? "border-red-500/25 bg-red-500/[0.05] text-red-400/70" : ""}`}
                              >
                                 <Icon size={14} className="flex-none" />
                                 <span className="text-xs font-mono tracking-wide flex-1">{s.label}</span>
                                 {hasErr && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-none" />}
                                 {active && !hasErr && <span className="w-1.5 h-1.5 rounded-full bg-white/35 flex-none" />}
                              </button>
                           );
                        })}
                     </nav>
                     <div className="pt-5 border-t border-white/[0.05]">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 mb-3">Template</p>
                        <div className="px-3 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] mb-5">
                           <p className="text-xs font-semibold text-white/50 capitalize">{selectedTemplate}</p>
                           <p className="text-[10px] font-mono text-white/20">A4 Format</p>
                        </div>
                        <div className="space-y-2.5">
                           <button
                              onClick={handlePrint}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-200"
                           >
                              <Printer size={13} /> Print CV
                           </button>
                           <button
                              onClick={handleDownloadPDF}
                              disabled={isGeneratingPDF}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {isGeneratingPDF ? (
                                 <>
                                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Generating…
                                 </>
                              ) : (
                                 <>
                                    <Download size={13} /> Download PDF
                                 </>
                              )}
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Form + Preview */}
               <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.2 }} className="lg:col-span-2">
                     <AnimatePresence mode="wait">
                        <motion.div key={activeSection} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28, ease }}>
                           {renderSection()}
                        </motion.div>
                     </AnimatePresence>
                     <div className="flex justify-between mt-4 print:hidden">
                        <button
                           onClick={() => currentIdx > 0 && setActiveSection(sections[currentIdx - 1].id)}
                           disabled={currentIdx === 0}
                           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                        >
                           <ChevronLeft size={13} /> Previous
                        </button>
                        <button
                           onClick={() => currentIdx < sections.length - 1 && setActiveSection(sections[currentIdx + 1].id)}
                           disabled={currentIdx === sections.length - 1}
                           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                        >
                           Next <ChevronRight size={13} />
                        </button>
                     </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease, delay: 0.25 }} className="lg:col-span-1">
                     <PreviewPanel cvData={cvData} selectedTemplate={selectedTemplate} className="preview-panel" />
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   );
}
