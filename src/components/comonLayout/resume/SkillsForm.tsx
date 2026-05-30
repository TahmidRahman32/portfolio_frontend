// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, X, Zap } from "lucide-react";
// import { Skill } from "../type/Resume";
// import { inputCls, labelCls, addBtnCls } from "./ResumeBuilder";

// interface SkillsFormProps {
//    skills: Skill[];
//    onChange: (skills: Skill[]) => void;
//    errors?: Record<string, string>;
// }

// const cats = ["Programming Languages", "Frameworks & Libraries", "Tools & Technologies", "Databases", "Cloud Platforms", "Soft Skills", "Other"];

// const levelLabels = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"];
// const ease = [0.22, 1, 0.36, 1] as const;

// export default function SkillsForm({ skills, onChange, errors }: SkillsFormProps) {
//    const [form, setForm] = useState<Omit<Skill, "id">>({ name: "", level: 3, category: cats[0] });

//    const add = () => {
//       if (!form.name.trim()) return;
//       onChange([...skills, { ...form, id: Date.now().toString() }]);
//       setForm((p) => ({ ...p, name: "" }));
//    };

//    const byCat = cats.reduce(
//       (acc, c) => {
//          const s = skills.filter((sk) => sk.category === c);
//          if (s.length) acc[c] = s;
//          return acc;
//       },
//       {} as Record<string, Skill[]>,
//    );

//    return (
//       <div className="space-y-8">
//          {/* Add form */}
//          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Skill</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                <div>
//                   <label className={labelCls}>Skill Name *</label>
//                   <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="e.g. TypeScript, React, Docker" className={inputCls()} />
//                </div>
//                <div>
//                   <label className={labelCls}>Category</label>
//                   <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className={`${inputCls()} cursor-pointer`}>
//                      {cats.map((c) => (
//                         <option key={c} value={c} className="bg-[#111]">
//                            {c}
//                         </option>
//                      ))}
//                   </select>
//                </div>
//             </div>

//             <div>
//                <label className={labelCls}>
//                   Proficiency — <span className="text-white/50">{levelLabels[form.level - 1]}</span>
//                </label>
//                <input type="range" min={1} max={5} value={form.level} onChange={(e) => setForm((p) => ({ ...p, level: +e.target.value }))} className="w-full h-px appearance-none bg-white/10 cursor-pointer accent-white mt-3" />
//                <div className="flex justify-between text-[10px] font-mono text-white/20 mt-2">
//                   {levelLabels.map((l) => (
//                      <span key={l}>{l}</span>
//                   ))}
//                </div>
//             </div>

//             <button onClick={add} disabled={!form.name.trim()} className={addBtnCls}>
//                <Plus size={13} /> Add Skill
//             </button>
//          </div>

//          {/* Skills by category */}
//          {skills.length === 0 ? (
//             <div className="text-center py-10">
//                <Zap size={28} className="mx-auto mb-3 text-white/10" />
//                <p className="text-xs font-mono text-white/20">No skills added yet.</p>
//             </div>
//          ) : (
//             <div className="space-y-5">
//                {Object.entries(byCat).map(([cat, catSkills]) => (
//                   <div key={cat}>
//                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">{cat}</p>
//                      <div className="flex flex-wrap gap-2">
//                         <AnimatePresence>
//                            {catSkills.map((skill) => (
//                               <motion.div
//                                  key={skill.id}
//                                  initial={{ opacity: 0, scale: 0.85 }}
//                                  animate={{ opacity: 1, scale: 1 }}
//                                  exit={{ opacity: 0, scale: 0.85 }}
//                                  transition={{ duration: 0.25, ease }}
//                                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] transition-colors duration-200"
//                               >
//                                  <span className="text-xs font-mono text-white/55">{skill.name}</span>
//                                  <div className="flex gap-0.5">
//                                     {Array.from({ length: 5 }).map((_, i) => (
//                                        <div key={i} className={`w-1 h-1 rounded-full ${i < skill.level ? "bg-white/40" : "bg-white/[0.08]"}`} />
//                                     ))}
//                                  </div>
//                                  <button onClick={() => onChange(skills.filter((s) => s.id !== skill.id))} className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400/70 transition-all duration-150">
//                                     <X size={11} />
//                                  </button>
//                               </motion.div>
//                            ))}
//                         </AnimatePresence>
//                      </div>
//                   </div>
//                ))}
//             </div>
//          )}

//          {errors?.skills && <p className="text-[11px] font-mono text-red-400/70 px-1">{errors.skills}</p>}
//       </div>
//    );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Zap } from "lucide-react";
// import { Skill } from "../type/Resume";
import { inputCls, labelCls, addBtnCls } from "./ResumeBuilder";
import { Skill } from "@/Types/Resume";

interface SkillsFormProps {
   skills: Skill[];
   onChange: (skills: Skill[]) => void;
   errors?: Record<string, string>;
}

const cats = ["Programming Languages", "Frameworks & Libraries", "Tools & Technologies", "Databases", "Cloud Platforms", "Soft Skills", "Other"];

const levelLabels = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function SkillsForm({ skills, onChange, errors }: SkillsFormProps) {
   const [form, setForm] = useState<Omit<Skill, "id">>({ name: "", level: 3, category: cats[0] });

   const add = () => {
      if (!form.name.trim()) return;
      onChange([...skills, { ...form, id: Date.now().toString() }]);
      setForm((p) => ({ ...p, name: "" }));
   };

   const byCat = cats.reduce(
      (acc, c) => {
         const s = skills.filter((sk) => sk.category === c);
         if (s.length) acc[c] = s;
         return acc;
      },
      {} as Record<string, Skill[]>,
   );

   return (
      <div className="space-y-8">
         {/* Add form */}
         <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Skill</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className={labelCls}>Skill Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="e.g. TypeScript, React, Docker" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>Category</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className={`${inputCls()} cursor-pointer`}>
                     {cats.map((c) => (
                        <option key={c} value={c} className="bg-[#111]">
                           {c}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            <div>
               <label className={labelCls}>
                  Proficiency — <span className="text-white/50">{levelLabels[form.level - 1]}</span>
               </label>
               <input type="range" min={1} max={5} value={form.level} onChange={(e) => setForm((p) => ({ ...p, level: +e.target.value }))} className="w-full h-px appearance-none bg-white/10 cursor-pointer accent-white mt-3" />
               <div className="flex justify-between text-[10px] font-mono text-white/20 mt-2">
                  {levelLabels.map((l) => (
                     <span key={l}>{l}</span>
                  ))}
               </div>
            </div>

            <button onClick={add} disabled={!form.name.trim()} className={addBtnCls}>
               <Plus size={13} /> Add Skill
            </button>
         </div>

         {/* Skills by category */}
         {skills.length === 0 ? (
            <div className="text-center py-10">
               <Zap size={28} className="mx-auto mb-3 text-white/10" />
               <p className="text-xs font-mono text-white/20">No skills added yet.</p>
            </div>
         ) : (
            <div className="space-y-5">
               {Object.entries(byCat).map(([cat, catSkills]) => (
                  <div key={cat}>
                     <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">{cat}</p>
                     <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                           {catSkills.map((skill) => (
                              <motion.div
                                 key={skill.id}
                                 initial={{ opacity: 0, scale: 0.85 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.85 }}
                                 transition={{ duration: 0.25, ease }}
                                 className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] transition-colors duration-200"
                              >
                                 <span className="text-xs font-mono text-white/55">{skill.name}</span>
                                 <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                       <div key={i} className={`w-1 h-1 rounded-full ${i < skill.level ? "bg-white/40" : "bg-white/[0.08]"}`} />
                                    ))}
                                 </div>
                                 <button onClick={() => onChange(skills.filter((s) => s.id !== skill.id))} className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400/70 transition-all duration-150">
                                    <X size={11} />
                                 </button>
                              </motion.div>
                           ))}
                        </AnimatePresence>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {errors?.skills && <p className="text-[11px] font-mono text-red-400/70 px-1">{errors.skills}</p>}
      </div>
   );
}