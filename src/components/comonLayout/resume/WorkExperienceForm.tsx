
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Trash2, X, Briefcase } from "lucide-react";
// import { WorkExperience } from "../type/Resume";
// import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";

// interface WorkExperienceFormProps {
//   experience: WorkExperience[];
//   onChange: (experience: WorkExperience[]) => void;
// }

// const blank: Omit<WorkExperience, "id"> = {
//   company: "", position: "", startDate: "", endDate: "", current: false, description: "", achievements: [""],
// };

// const ease = [0.22, 1, 0.36, 1] as const;

// function fmtDate(s: string) {
//   if (!s) return "";
//   return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "long" });
// }

// export default function WorkExperienceForm({ experience, onChange }: WorkExperienceFormProps) {
//   const [form, setForm] = useState<Omit<WorkExperience, "id">>(blank);

//   const add = () => {
//     if (!form.company || !form.position) return;
//     onChange([...experience, { ...form, id: Date.now().toString(), achievements: form.achievements.filter(a => a.trim()) }]);
//     setForm(blank);
//   };

//   const setAch = (i: number, v: string) =>
//     setForm(p => ({ ...p, achievements: p.achievements.map((a, idx) => idx === i ? v : a) }));

//   return (
//     <div className="space-y-8">
//       <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
//         <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Experience</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div><label className={labelCls}>Company *</label>
//             <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Company Name" className={inputCls()} /></div>
//           <div><label className={labelCls}>Position *</label>
//             <input value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="Full-Stack Developer" className={inputCls()} /></div>
//           <div><label className={labelCls}>Start Date</label>
//             <input type="month" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} /></div>
//           <div>
//             <label className={labelCls}>End Date</label>
//             <div className="flex items-center gap-3">
//               <input type="month" value={form.endDate} disabled={form.current}
//                 onChange={e => setForm(p => ({ ...p, endDate: e.target.value, current: false }))}
//                 className={`${inputCls()} [color-scheme:dark] flex-1 disabled:opacity-30`} />
//               <label className="flex items-center gap-2 cursor-pointer select-none">
//                 <input type="checkbox" checked={form.current}
//                   onChange={e => setForm(p => ({ ...p, current: e.target.checked, endDate: e.target.checked ? "" : p.endDate }))}
//                   className="rounded border-white/20 bg-white/[0.04] text-white/60" />
//                 <span className="text-[11px] font-mono text-white/35 whitespace-nowrap">Current</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div><label className={labelCls}>Description</label>
//           <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
//             placeholder="Describe your role and responsibilities…" rows={3} className={`${inputCls()} resize-none`} /></div>

//         <div>
//           <label className={labelCls}>Key Achievements</label>
//           <div className="space-y-2">
//             {form.achievements.map((a, i) => (
//               <div key={i} className="flex gap-2">
//                 <input value={a} onChange={e => setAch(i, e.target.value)}
//                   placeholder="Reduced load time by 40%…" className={`${inputCls()} flex-1`} />
//                 {form.achievements.length > 1 && (
//                   <button onClick={() => setForm(p => ({ ...p, achievements: p.achievements.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
//                     <X size={12} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button onClick={() => setForm(p => ({ ...p, achievements: [...p.achievements, ""] }))}
//               className="text-[11px] font-mono text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
//               <Plus size={11} /> Add achievement
//             </button>
//           </div>
//         </div>

//         <button onClick={add} disabled={!form.company || !form.position} className={addBtnCls}>
//           <Plus size={13} /> Add Experience
//         </button>
//       </div>

//       {experience.length === 0 ? (
//         <div className="text-center py-10">
//           <Briefcase size={28} className="mx-auto mb-3 text-white/10" />
//           <p className="text-xs font-mono text-white/20">No experience entries yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           <AnimatePresence>
//             {experience.map(exp => (
//               <motion.div key={exp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -16 }}
//                 transition={{ duration: 0.35, ease }}
//                 className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-white/75">{exp.position}</p>
//                   <p className="text-xs font-mono text-white/40 mt-0.5">{exp.company}</p>
//                   <p className="text-[11px] font-mono text-white/25 mt-1">
//                     {fmtDate(exp.startDate)} – {exp.current ? "Present" : fmtDate(exp.endDate)}
//                   </p>
//                   {exp.achievements.filter(a => a.trim()).length > 0 && (
//                     <ul className="mt-2 space-y-1">
//                       {exp.achievements.filter(a => a.trim()).map((a, i) => (
//                         <li key={i} className="text-[11px] font-mono text-white/25 flex gap-2"><span className="text-white/15">–</span>{a}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <button onClick={() => onChange(experience.filter(e => e.id !== exp.id))} className={removeBtnCls}><Trash2 size={13} /></button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// }

// ── WorkExperienceForm ────────────────────────────────────────────────────────
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Briefcase } from "lucide-react";
// import { WorkExperience } from "../type/Resume";
import { inputCls, labelCls, addBtnCls, removeBtnCls } from "./ResumeBuilder";
import { WorkExperience } from "@/Types/Resume";

interface WorkExperienceFormProps {
  experience: WorkExperience[];
  onChange: (experience: WorkExperience[]) => void;
}

const blank: Omit<WorkExperience, "id"> = {
  company: "", position: "", startDate: "", endDate: "", current: false, description: "", achievements: ["", ""]
};

const ease = [0.22, 1, 0.36, 1] as const;

function fmtDate(s: string) {
  if (!s) return "";
  return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export default function WorkExperienceForm({ experience, onChange }: WorkExperienceFormProps) {
  const [form, setForm] = useState<Omit<WorkExperience, "id">>(blank);

  const add = () => {
    if (!form.company || !form.position) return;
    onChange([...experience, { ...form, id: Date.now().toString(), achievements: form?.achievements.filter(a => a.trim()) }]);
    setForm(blank);
  };

  const setAch = (i: number, v: string) =>
    setForm(p => ({ ...p, achievements: p.achievements.map((a, idx) => idx === i ? v : a) }));

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Add Experience</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Company *</label>
            <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Company Name" className={inputCls()} /></div>
          <div><label className={labelCls}>Position *</label>
            <input value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="Full-Stack Developer" className={inputCls()} /></div>
          <div><label className={labelCls}>Start Date</label>
            <input type="month" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className={`${inputCls()} [color-scheme:dark]`} /></div>
          <div>
            <label className={labelCls}>End Date</label>
            <div className="flex items-center gap-3">
              <input type="month" value={form.endDate} disabled={form.current}
                onChange={e => setForm(p => ({ ...p, endDate: e.target.value, current: false }))}
                className={`${inputCls()} [color-scheme:dark] flex-1 disabled:opacity-30`} />
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={form.current}
                  onChange={e => setForm(p => ({ ...p, current: e.target.checked, endDate: e.target.checked ? "" : p.endDate }))}
                  className="rounded border-white/20 bg-white/[0.04] text-white/60" />
                <span className="text-[11px] font-mono text-white/35 whitespace-nowrap">Current</span>
              </label>
            </div>
          </div>
        </div>

        <div><label className={labelCls}>Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Describe your role and responsibilities…" rows={3} className={`${inputCls()} resize-none`} /></div>

        <div>
          <label className={labelCls}>Key Achievements</label>
          <div className="space-y-2">
            {form.achievements.map((a, i) => (
              <div key={i} className="flex gap-2">
                <input value={a} onChange={e => setAch(i, e.target.value)}
                  placeholder="Reduced load time by 40%…" className={`${inputCls()} flex-1`} />
                {form.achievements.length > 1 && (
                  <button onClick={() => setForm(p => ({ ...p, achievements: p.achievements.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => setForm(p => ({ ...p, achievements: [...p.achievements, ""] }))}
              className="text-[11px] font-mono text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
              <Plus size={11} /> Add achievement
            </button>
          </div>
        </div>

        <button onClick={add} disabled={!form.company || !form.position} className={addBtnCls}>
          <Plus size={13} /> Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10">
          <Briefcase size={28} className="mx-auto mb-3 text-white/10" />
          <p className="text-xs font-mono text-white/20">No experience entries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {experience.map(exp => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease }}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/75">{exp.position}</p>
                  <p className="text-xs font-mono text-white/40 mt-0.5">{exp.company}</p>
                  <p className="text-[11px] font-mono text-white/25 mt-1">
                    {fmtDate(exp.startDate)} – {exp.current ? "Present" : fmtDate(exp.endDate)}
                  </p>
                  {exp.achievements.filter(a => a.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.filter(a => a.trim()).map((a, i) => (
                        <li key={i} className="text-[11px] font-mono text-white/25 flex gap-2"><span className="text-white/15">–</span>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button onClick={() => onChange(experience.filter(e => e.id !== exp.id))} className={removeBtnCls}><Trash2 size={13} /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}