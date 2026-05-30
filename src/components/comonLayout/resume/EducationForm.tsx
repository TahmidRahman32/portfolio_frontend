// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Trash2, GraduationCap } from "lucide-react";
// import { Education } from "../type/Resume";
// import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";

// interface EducationFormProps {
//    education: Education[];
//    onChange: (education: Education[]) => void;
//    errors?: Record<string, string>;
// }

// const blank: Omit<Education, "id"> = {
//    institution: "",
//    degree: "",
//    fieldOfStudy: "",
//    startDate: "",
//    endDate: "",
//    gpa: "",
//    description: "",
// };

// const ease = [0.22, 1, 0.36, 1] as const;

// function fmtDate(s: string) {
//    if (!s) return "";
//    return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "long" });
// }

// export default function EducationForm({ education, onChange, errors }: EducationFormProps) {
//    const [form, setForm] = useState<Omit<Education, "id">>(blank);

//    const add = () => {
//       if (!form.institution || !form.degree) return;
//       onChange([...education, { ...form, id: Date.now().toString() }]);
//       setForm(blank);
//    };

//    return (
//       <div className="space-y-8">
//          {/* Add form */}
//          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Education</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                <div>
//                   <label className={labelCls}>Institution *</label>
//                   <input value={form.institution} onChange={(e) => setForm((p) => ({ ...p, institution: e.target.value }))} placeholder="University Name" className={inputCls(!form.institution && false)} />
//                </div>
//                <div>
//                   <label className={labelCls}>Degree *</label>
//                   <input value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} placeholder="Bachelor of Science" className={inputCls()} />
//                </div>
//                <div>
//                   <label className={labelCls}>Field of Study</label>
//                   <input value={form.fieldOfStudy} onChange={(e) => setForm((p) => ({ ...p, fieldOfStudy: e.target.value }))} placeholder="Computer Science" className={inputCls()} />
//                </div>
//                <div>
//                   <label className={labelCls}>GPA</label>
//                   <input value={form.gpa} onChange={(e) => setForm((p) => ({ ...p, gpa: e.target.value }))} placeholder="3.8 / 4.0" className={inputCls()} />
//                </div>
//                <div>
//                   <label className={labelCls}>Start Date</label>
//                   <input type="month" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} />
//                </div>
//                <div>
//                   <label className={labelCls}>End Date</label>
//                   <input type="month" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} />
//                </div>
//             </div>

//             <div>
//                <label className={labelCls}>Description</label>
//                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Relevant coursework, achievements, or honours…" rows={3} className={`${inputCls()} resize-none`} />
//             </div>

//             <button onClick={add} disabled={!form.institution || !form.degree} className={addBtnCls}>
//                <Plus size={13} /> Add Education
//             </button>
//          </div>

//          {/* List */}
//          {education.length === 0 ? (
//             <div className="text-center py-10">
//                <GraduationCap size={28} className="mx-auto mb-3 text-white/10" />
//                <p className="text-xs font-mono text-white/20">No education entries yet.</p>
//             </div>
//          ) : (
//             <div className="space-y-3">
//                <AnimatePresence>
//                   {education.map((edu) => (
//                      <motion.div
//                         key={edu.id}
//                         initial={{ opacity: 0, y: 12 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, x: -16 }}
//                         transition={{ duration: 0.35, ease }}
//                         className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]"
//                      >
//                         <div className="flex-1 min-w-0">
//                            <p className="text-sm font-semibold text-white/75">{edu.institution}</p>
//                            <p className="text-xs font-mono text-white/40 mt-0.5">
//                               {edu.degree}
//                               {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
//                            </p>
//                            <p className="text-[11px] font-mono text-white/25 mt-1">
//                               {fmtDate(edu.startDate)} – {edu.endDate ? fmtDate(edu.endDate) : "Present"}
//                               {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
//                            </p>
//                            {edu.description && <p className="text-[11px] font-mono text-white/25 mt-2 leading-relaxed">{edu.description}</p>}
//                         </div>
//                         <button onClick={() => onChange(education.filter((e) => e.id !== edu.id))} className={removeBtnCls}>
//                            <Trash2 size={13} />
//                         </button>
//                      </motion.div>
//                   ))}
//                </AnimatePresence>
//             </div>
//          )}

//          {errors?.education && <p className="text-[11px] font-mono text-red-400/70 px-1">{errors.education}</p>}
//       </div>
//    );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GraduationCap } from "lucide-react";
// import { Education } from "../type/Resume";
import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";
import { Education } from "@/Types/Resume";

interface EducationFormProps {
   education: Education[];
   onChange: (education: Education[]) => void;
   errors?: Record<string, string>;
}

const blank: Omit<Education, "id"> = {
   institution: "",
   degree: "",
   fieldOfStudy: "",
   startDate: "",
   endDate: "",
   gpa: "",
   description: "",
};

const ease = [0.22, 1, 0.36, 1] as const;

function fmtDate(s: string) {
   if (!s) return "";
   return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export default function EducationForm({ education, onChange, errors }: EducationFormProps) {
   const [form, setForm] = useState<Omit<Education, "id">>(blank);

   const add = () => {
      if (!form.institution || !form.degree) return;
      onChange([...education, { ...form, id: Date.now().toString() }]);
      setForm(blank);
   };

   return (
      <div className="space-y-8">
         {/* Add form */}
         <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Education</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className={labelCls}>Institution *</label>
                  <input value={form.institution} onChange={(e) => setForm((p) => ({ ...p, institution: e.target.value }))} placeholder="University Name" className={inputCls(!form.institution && false)} />
               </div>
               <div>
                  <label className={labelCls}>Degree *</label>
                  <input value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} placeholder="Bachelor of Science" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>Field of Study</label>
                  <input value={form.fieldOfStudy} onChange={(e) => setForm((p) => ({ ...p, fieldOfStudy: e.target.value }))} placeholder="Computer Science" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>GPA</label>
                  <input value={form.gpa} onChange={(e) => setForm((p) => ({ ...p, gpa: e.target.value }))} placeholder="3.8 / 4.0" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>Start Date</label>
                  <input type="month" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} />
               </div>
               <div>
                  <label className={labelCls}>End Date</label>
                  <input type="month" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} />
               </div>
            </div>

            <div>
               <label className={labelCls}>Description</label>
               <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Relevant coursework, achievements, or honours…" rows={3} className={`${inputCls()} resize-none`} />
            </div>

            <button onClick={add} disabled={!form.institution || !form.degree} className={addBtnCls}>
               <Plus size={13} /> Add Education
            </button>
         </div>

         {/* List */}
         {education.length === 0 ? (
            <div className="text-center py-10">
               <GraduationCap size={28} className="mx-auto mb-3 text-white/10" />
               <p className="text-xs font-mono text-white/20">No education entries yet.</p>
            </div>
         ) : (
            <div className="space-y-3">
               <AnimatePresence>
                  {education.map((edu) => (
                     <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                     >
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-semibold text-white/75">{edu.institution}</p>
                           <p className="text-xs font-mono text-white/40 mt-0.5">
                              {edu.degree}
                              {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
                           </p>
                           <p className="text-[11px] font-mono text-white/25 mt-1">
                              {fmtDate(edu.startDate)} – {edu.endDate ? fmtDate(edu.endDate) : "Present"}
                              {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                           </p>
                           {edu.description && <p className="text-[11px] font-mono text-white/25 mt-2 leading-relaxed">{edu.description}</p>}
                        </div>
                        <button onClick={() => onChange(education.filter((e) => e.id !== edu.id))} className={removeBtnCls}>
                           <Trash2 size={13} />
                        </button>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         )}

         {errors?.education && <p className="text-[11px] font-mono text-red-400/70 px-1">{errors.education}</p>}
      </div>
   );
}