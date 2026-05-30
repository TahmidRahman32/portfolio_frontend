// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Trash2, X, FolderOpen, ExternalLink } from "lucide-react";
// import { Project } from "../type/Resume";
// import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";

// interface ProjectsFormProps {
//    projects: Project[];
//    onChange: (projects: Project[]) => void;
// }

// const blank: Omit<Project, "id"> = { name: "", description: "", technologies: [""], link: "" };
// const ease = [0.22, 1, 0.36, 1] as const;

// export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
//    const [form, setForm] = useState<Omit<Project, "id">>(blank);

//    const add = () => {
//       if (!form.name || !form.description) return;
//       onChange([...projects, { ...form, id: Date.now().toString(), technologies: form.technologies.filter((t) => t.trim()) }]);
//       setForm(blank);
//    };

//    const setTech = (i: number, v: string) => setForm((p) => ({ ...p, technologies: p.technologies.map((t, idx) => (idx === i ? v : t)) }));

//    return (
//       <div className="space-y-8">
//          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Project</p>

//             <div>
//                <label className={labelCls}>Project Name *</label>
//                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Portfolio Website" className={inputCls()} />
//             </div>
//             <div>
//                <label className={labelCls}>Project Link</label>
//                <input type="url" value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://github.com/yourname/project" className={inputCls()} />
//             </div>
//             <div>
//                <label className={labelCls}>Description *</label>
//                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the project, your role, and key features…" rows={3} className={`${inputCls()} resize-none`} />
//             </div>

//             <div>
//                <label className={labelCls}>Technologies</label>
//                <div className="space-y-2">
//                   {form.technologies.map((t, i) => (
//                      <div key={i} className="flex gap-2">
//                         <input value={t} onChange={(e) => setTech(i, e.target.value)} placeholder="React, TypeScript…" className={`${inputCls()} flex-1`} />
//                         {form.technologies.length > 1 && (
//                            <button onClick={() => setForm((p) => ({ ...p, technologies: p.technologies.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
//                               <X size={12} />
//                            </button>
//                         )}
//                      </div>
//                   ))}
//                   <button onClick={() => setForm((p) => ({ ...p, technologies: [...p.technologies, ""] }))} className="text-[11px] font-mono text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
//                      <Plus size={11} /> Add technology
//                   </button>
//                </div>
//             </div>

//             <button onClick={add} disabled={!form.name || !form.description} className={addBtnCls}>
//                <Plus size={13} /> Add Project
//             </button>
//          </div>

//          {projects.length === 0 ? (
//             <div className="text-center py-10">
//                <FolderOpen size={28} className="mx-auto mb-3 text-white/10" />
//                <p className="text-xs font-mono text-white/20">No projects added yet.</p>
//             </div>
//          ) : (
//             <div className="space-y-3">
//                <AnimatePresence>
//                   {projects.map((proj) => (
//                      <motion.div
//                         key={proj.id}
//                         initial={{ opacity: 0, y: 12 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, x: -16 }}
//                         transition={{ duration: 0.35, ease }}
//                         className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]"
//                      >
//                         <div className="flex-1 min-w-0">
//                            <div className="flex items-center gap-2">
//                               <p className="text-sm font-semibold text-white/75">{proj.name}</p>
//                               {proj.link && (
//                                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/50 transition-colors">
//                                     <ExternalLink size={12} />
//                                  </a>
//                               )}
//                            </div>
//                            <p className="text-[11px] font-mono text-white/30 mt-1 leading-relaxed">{proj.description}</p>
//                            {proj.technologies.length > 0 && (
//                               <div className="flex flex-wrap gap-1.5 mt-2">
//                                  {proj.technologies.map((t, i) => (
//                                     <span key={i} className="px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/30">
//                                        {t}
//                                     </span>
//                                  ))}
//                               </div>
//                            )}
//                         </div>
//                         <button onClick={() => onChange(projects.filter((p) => p.id !== proj.id))} className={removeBtnCls}>
//                            <Trash2 size={13} />
//                         </button>
//                      </motion.div>
//                   ))}
//                </AnimatePresence>
//             </div>
//          )}
//       </div>
//    );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, FolderOpen, ExternalLink } from "lucide-react";
// import { Project } from "../type/Resume";
import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";
import { Project } from "@/Types/Resume";

interface ProjectsFormProps {
   projects: Project[];
   onChange: (projects: Project[]) => void;
}

const blank: Omit<Project, "id"> = { name: "", description: "", technologies: [""], link: "" };
const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
   const [form, setForm] = useState<Omit<Project, "id">>(blank);

   const add = () => {
      if (!form.name || !form.description) return;
      onChange([...projects, { ...form, id: Date.now().toString(), technologies: form.technologies.filter((t) => t.trim()) }]);
      setForm(blank);
   };

   const setTech = (i: number, v: string) => setForm((p) => ({ ...p, technologies: p.technologies.map((t, idx) => (idx === i ? v : t)) }));

   return (
      <div className="space-y-8">
         <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Project</p>

            <div>
               <label className={labelCls}>Project Name *</label>
               <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Portfolio Website" className={inputCls()} />
            </div>
            <div>
               <label className={labelCls}>Project Link</label>
               <input type="url" value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://github.com/yourname/project" className={inputCls()} />
            </div>
            <div>
               <label className={labelCls}>Description *</label>
               <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the project, your role, and key features…" rows={3} className={`${inputCls()} resize-none`} />
            </div>

            <div>
               <label className={labelCls}>Technologies</label>
               <div className="space-y-2">
                  {form.technologies.map((t, i) => (
                     <div key={i} className="flex gap-2">
                        <input value={t} onChange={(e) => setTech(i, e.target.value)} placeholder="React, TypeScript…" className={`${inputCls()} flex-1`} />
                        {form.technologies.length > 1 && (
                           <button onClick={() => setForm((p) => ({ ...p, technologies: p.technologies.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                              <X size={12} />
                           </button>
                        )}
                     </div>
                  ))}
                  <button onClick={() => setForm((p) => ({ ...p, technologies: [...p.technologies, ""] }))} className="text-[11px] font-mono text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
                     <Plus size={11} /> Add technology
                  </button>
               </div>
            </div>

            <button onClick={add} disabled={!form.name || !form.description} className={addBtnCls}>
               <Plus size={13} /> Add Project
            </button>
         </div>

         {projects.length === 0 ? (
            <div className="text-center py-10">
               <FolderOpen size={28} className="mx-auto mb-3 text-white/10" />
               <p className="text-xs font-mono text-white/20">No projects added yet.</p>
            </div>
         ) : (
            <div className="space-y-3">
               <AnimatePresence>
                  {projects.map((proj) => (
                     <motion.div
                        key={proj.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                     >
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-white/75">{proj.name}</p>
                              {proj.link && (
                                 <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/50 transition-colors">
                                    <ExternalLink size={12} />
                                 </a>
                              )}
                           </div>
                           <p className="text-[11px] font-mono text-white/30 mt-1 leading-relaxed">{proj.description}</p>
                           {proj.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                 {proj.technologies.map((t, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/30">
                                       {t}
                                    </span>
                                 ))}
                              </div>
                           )}
                        </div>
                        <button onClick={() => onChange(projects.filter((p) => p.id !== proj.id))} className={removeBtnCls}>
                           <Trash2 size={13} />
                        </button>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         )}
      </div>
   );
}