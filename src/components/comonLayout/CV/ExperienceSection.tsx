// import { motion, AnimatePresence } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Plus, Trash2, Briefcase } from "lucide-react";
// import { WorkExperience } from "../type/cv";
// // import { WorkExperience } from "../../types/cv";

// interface ExperienceSectionProps {
//    cvData: {
//       workExperience: WorkExperience[];
//    };
//    onExperienceAdd: () => void;
//    onExperienceUpdate: (id: string, field: keyof WorkExperience, value: string | boolean) => void;
//    onExperienceRemove: (id: string) => void;
// }

// export function ExperienceSection({ cvData, onExperienceAdd, onExperienceUpdate, onExperienceRemove }: ExperienceSectionProps) {
//    return (
//       <motion.div key="experience" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//          <div className="flex items-center justify-between mb-8">
//             <div>
//                <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
//                <p className="text-gray-600 mt-1">Detail your work history and professional accomplishments</p>
//             </div>
//             <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 4 of 5</div>
//          </div>

//          <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                <Label className="text-sm font-semibold text-gray-700">Work Experience</Label>
//                <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onExperienceAdd}
//                   className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300"
//                >
//                   <Plus className="h-4 w-4" />
//                   Add Experience
//                </motion.button>
//             </div>

//             <AnimatePresence>
//                {cvData.workExperience.map((work, index) => (
//                   <motion.div
//                      key={work.id}
//                      initial={{ opacity: 0, height: 0 }}
//                      animate={{ opacity: 1, height: "auto" }}
//                      exit={{ opacity: 0, height: 0 }}
//                      transition={{ duration: 0.3 }}
//                      className="space-y-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
//                   >
//                      <div className="flex justify-between items-center">
//                         <span className="font-semibold text-sm text-gray-700 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full">Experience #{index + 1}</span>
//                         <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onExperienceRemove(work.id)} className="hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 p-2">
//                            <Trash2 className="h-4 w-4" />
//                         </motion.button>
//                      </div>

//                      <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//                      <div className="grid gap-4">
//                         <div className="grid grid-cols-2 gap-4">
//                            <div>
//                               <Label className="text-sm font-medium text-gray-700">Position</Label>
//                               <Input
//                                  value={work.position}
//                                  onChange={(e) => onExperienceUpdate(work.id, "position", e.target.value)}
//                                  placeholder="Software Engineer"
//                                  className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300"
//                               />
//                            </div>
//                            <div>
//                               <Label className="text-sm font-medium text-gray-700">Company</Label>
//                               <Input value={work.company} onChange={(e) => onExperienceUpdate(work.id, "company", e.target.value)} placeholder="Tech Corp" className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
//                            </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                            <div>
//                               <Label className="text-sm font-medium text-gray-700">Start Date</Label>
//                               <Input type="month" value={work.startDate} onChange={(e) => onExperienceUpdate(work.id, "startDate", e.target.value)} className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
//                            </div>
//                            <div>
//                               <Label className="text-sm font-medium text-gray-700">End Date</Label>
//                               <Input
//                                  type="month"
//                                  value={work.endDate}
//                                  onChange={(e) => onExperienceUpdate(work.id, "endDate", e.target.value)}
//                                  disabled={work.current}
//                                  className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
//                               />
//                            </div>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                            <Switch checked={work.current} onCheckedChange={(checked) => onExperienceUpdate(work.id, "current", checked)} className="data-[state=checked]:bg-indigo-600" />
//                            <Label className="text-sm text-gray-700">Currently working here</Label>
//                         </div>

//                         <div>
//                            <Label className="text-sm font-medium text-gray-700">Description</Label>
//                            <Textarea
//                               value={work.description}
//                               onChange={(e) => onExperienceUpdate(work.id, "description", e.target.value)}
//                               placeholder="Describe your responsibilities, achievements, and key contributions..."
//                               rows={3}
//                               className="rounded-xl border-gray-300 focus:border-indigo-500 resize-none transition-all duration-300"
//                            />
//                         </div>
//                      </div>
//                   </motion.div>
//                ))}
//             </AnimatePresence>

//             {cvData.workExperience.length === 0 && (
//                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
//                   <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500">No work experience added yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Add your first work experience to get started</p>
//                   <Button onClick={onExperienceAdd} className="mt-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
//                      <Plus className="h-4 w-4" />
//                      Add First Experience
//                   </Button>
//                </motion.div>
//             )}
//          </div>

//          {/* Navigation Buttons */}
//          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <motion.button
//                whileHover={{ scale: 1.02 }}
//                whileTap={{ scale: 0.98 }}
//                onClick={() => {
//                   // Navigate to previous section (education)
//                   const event = new CustomEvent("navigateSection", { detail: "education" });
//                   window.dispatchEvent(event);
//                }}
//                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
//             >
//                <div className="w-4 h-4">←</div>
//                Previous
//             </motion.button>

//             <motion.button
//                whileHover={{ scale: 1.02 }}
//                whileTap={{ scale: 0.98 }}
//                onClick={() => {
//                   // Navigate to next section (skills)
//                   const event = new CustomEvent("navigateSection", { detail: "skills" });
//                   window.dispatchEvent(event);
//                }}
//                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
//             >
//                Next
//                <div className="w-4 h-4">→</div>
//             </motion.button>
//          </div>
//       </motion.div>
//    );
// }


// ─────────────────────────────────────────────────────────────────────────────
// ExperienceSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
import { Briefcase as BriefIcon, Plus, Trash2 } from "lucide-react";
// import { WorkExperience } from "../type/cv";
import { inputCls, labelCls, panelCls } from "./CVBuilder";
import { motion,  } from "framer-motion";
import { WorkExperience } from "@/Types/cv";
 export const ease = [0.22, 1, 0.36, 1] as const;
interface ExperienceSectionProps {
  cvData: { workExperience: WorkExperience[] };
  onExperienceAdd: () => void;
  onExperienceUpdate: (id: string, field: keyof WorkExperience, value: string | boolean) => void;
  onExperienceRemove: (id: string) => void;
}
 
export function ExperienceSection({ cvData, onExperienceAdd, onExperienceUpdate, onExperienceRemove }: ExperienceSectionProps) {
  return (
    <div className={`${panelCls} p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/85">Work Experience</h2>
          <p className="text-xs font-mono text-white/30 mt-1">Your work history and professional accomplishments.</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25">Step 4 / 5</span>
      </div>
 
      <div className="flex justify-between items-center mb-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25">History</p>
        <button onClick={onExperienceAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200">
          <Plus size={12} /> Add Experience
        </button>
      </div>
 
      <div>
        {cvData.workExperience.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 rounded-2xl border border-dashed border-white/[0.07]">
            <BriefIcon size={28} className="mx-auto mb-3 text-white/10" />
            <p className="text-xs font-mono text-white/20">No experience entries yet.</p>
          </motion.div>
        )}
        {cvData.workExperience.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
            className="mb-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Experience #{i + 1}</span>
              <button onClick={() => onExperienceRemove(w.id)}
                className="w-7 h-7 rounded-lg border border-red-500/20 bg-red-500/[0.05] flex items-center justify-center text-red-400/50 hover:text-red-400 hover:border-red-500/40 transition-all duration-150">
                <Trash2 size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className={labelCls}>Position</label>
                <input value={w.position} onChange={e => onExperienceUpdate(w.id, "position", e.target.value)} placeholder="Full-Stack Developer" className={inputCls} /></div>
              <div><label className={labelCls}>Company</label>
                <input value={w.company} onChange={e => onExperienceUpdate(w.id, "company", e.target.value)} placeholder="Company Name" className={inputCls} /></div>
              <div><label className={labelCls}>Start Date</label>
                <input type="month" value={w.startDate} onChange={e => onExperienceUpdate(w.id, "startDate", e.target.value)} className={inputCls} /></div>
              <div>
                <label className={labelCls}>End Date</label>
                <div className="flex items-center gap-3">
                  <input type="month" value={w.endDate} disabled={w.current} onChange={e => onExperienceUpdate(w.id, "endDate", e.target.value)} className={`${inputCls} flex-1 disabled:opacity-30`} />
                  <label className="flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
                    <input type="checkbox" checked={w.current} onChange={e => onExperienceUpdate(w.id, "current", e.target.checked)} className="rounded border-white/20 bg-white/[0.04]" />
                    <span className="text-[11px] font-mono text-white/30">Current</span>
                  </label>
                </div>
              </div>
            </div>
            <div><label className={labelCls}>Description</label>
              <textarea value={w.description} onChange={e => onExperienceUpdate(w.id, "description", e.target.value)}
                placeholder="Describe your responsibilities and key contributions…" rows={3} className={`${inputCls} resize-none`} /></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}