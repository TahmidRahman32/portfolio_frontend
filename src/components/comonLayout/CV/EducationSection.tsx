   // import { motion, AnimatePresence } from "framer-motion";
   // import { Label } from "@/components/ui/label";
   // import { Input } from "@/components/ui/input";
   // import { Textarea } from "@/components/ui/textarea";
   // import { Button } from "@/components/ui/button";
   // import { Separator } from "@/components/ui/separator";
   // import { Plus, Trash2, GraduationCap } from "lucide-react";
   // import { Education } from "../type/cv";
   // // import { Education } from "../../types/cv";

   // interface EducationSectionProps {
   //    cvData: {
   //       education: Education[];
   //    };
   //    errors: Record<string, string>;
   //    onEducationAdd: () => void;
   //    onEducationUpdate: (id: string, field: keyof Education, value: string) => void;
   //    onEducationRemove: (id: string) => void;
   // }

   // export function EducationSection({ cvData, errors, onEducationAdd, onEducationUpdate, onEducationRemove }: EducationSectionProps) {
   //    return (
   //       <motion.div key="education" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
   //          <div className="flex items-center justify-between mb-8">
   //             <div>
   //                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
   //                <p className="text-gray-600 mt-1">List your academic qualifications and achievements</p>
   //             </div>
   //             <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 3 of 5</div>
   //          </div>

   //          {errors.education && (
   //             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
   //                <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
   //                   <div className="w-2 h-2 bg-red-500 rounded-full" />
   //                </div>
   //                <div>
   //                   <span className="text-red-800 font-medium block">Required</span>
   //                   <span className="text-red-700 text-sm">{errors.education}</span>
   //                </div>
   //             </motion.div>
   //          )}

   //          <div className="space-y-6">
   //             <div className="flex justify-between items-center">
   //                <Label className="text-sm font-semibold text-gray-700">Education History</Label>
   //                <motion.button
   //                   whileHover={{ scale: 1.02 }}
   //                   whileTap={{ scale: 0.98 }}
   //                   onClick={onEducationAdd}
   //                   className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300"
   //                >
   //                   <Plus className="h-4 w-4" />
   //                   Add Education
   //                </motion.button>
   //             </div>

   //             <AnimatePresence>
   //                {cvData.education.map((edu, index) => (
   //                   <motion.div
   //                      key={edu.id}
   //                      initial={{ opacity: 0, height: 0 }}
   //                      animate={{ opacity: 1, height: "auto" }}
   //                      exit={{ opacity: 0, height: 0 }}
   //                      transition={{ duration: 0.3 }}
   //                      className="space-y-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
   //                   >
   //                      <div className="flex justify-between items-center">
   //                         <span className="font-semibold text-sm text-gray-700 bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 rounded-full">Education #{index + 1}</span>
   //                         <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onEducationRemove(edu.id)} className="hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 p-2">
   //                            <Trash2 className="h-4 w-4" />
   //                         </motion.button>
   //                      </div>

   //                      <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

   //                      <div className="grid gap-4">
   //                         <div>
   //                            <Label className="text-sm font-medium text-gray-700">Degree</Label>
   //                            <Input value={edu.degree} onChange={(e) => onEducationUpdate(edu.id, "degree", e.target.value)} placeholder="Bachelor of Science" className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
   //                         </div>

   //                         <div>
   //                            <Label className="text-sm font-medium text-gray-700">Institution</Label>
   //                            <Input
   //                               value={edu.institution}
   //                               onChange={(e) => onEducationUpdate(edu.id, "institution", e.target.value)}
   //                               placeholder="University Name"
   //                               className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300"
   //                            />
   //                         </div>

   //                         <div>
   //                            <Label className="text-sm font-medium text-gray-700">Field of Study</Label>
   //                            <Input value={edu.field} onChange={(e) => onEducationUpdate(edu.id, "field", e.target.value)} placeholder="Computer Science" className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
   //                         </div>

   //                         <div className="grid grid-cols-2 gap-4">
   //                            <div>
   //                               <Label className="text-sm font-medium text-gray-700">Start Date</Label>
   //                               <Input type="month" value={edu.startDate} onChange={(e) => onEducationUpdate(edu.id, "startDate", e.target.value)} className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
   //                            </div>

   //                            <div>
   //                               <Label className="text-sm font-medium text-gray-700">End Date</Label>
   //                               <Input type="month" value={edu.endDate} onChange={(e) => onEducationUpdate(edu.id, "endDate", e.target.value)} className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300" />
   //                            </div>
   //                         </div>

   //                         <div>
   //                            <Label className="text-sm font-medium text-gray-700">Description</Label>
   //                            <Textarea
   //                               value={edu.description}
   //                               onChange={(e) => onEducationUpdate(edu.id, "description", e.target.value)}
   //                               placeholder="Achievements, honors, relevant coursework, projects..."
   //                               rows={2}
   //                               className="rounded-xl border-gray-300 focus:border-indigo-500 resize-none transition-all duration-300"
   //                            />
   //                         </div>
   //                      </div>
   //                   </motion.div>
   //                ))}
   //             </AnimatePresence>

   //             {cvData.education.length === 0 && (
   //                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
   //                   <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
   //                   <p className="text-gray-500">No education added yet</p>
   //                   <p className="text-sm text-gray-400 mt-1">Add your educational background</p>
   //                   <Button onClick={onEducationAdd} className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
   //                      <Plus className="h-4 w-4" />
   //                      Add First Education
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
   //                   // Navigate to previous section (personal)
   //                   const event = new CustomEvent("navigateSection", { detail: "personal" });
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
   //                   // Navigate to next section (experience)
   //                   const event = new CustomEvent("navigateSection", { detail: "experience" });
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
// EducationSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
import { AnimatePresence as AP2, motion } from "framer-motion";
import { Plus, Trash2, GraduationCap as GradIcon } from "lucide-react";
// import { Education } from "../type/cv";
import { inputCls, labelCls, panelCls } from "./CVBuilder";
import { Education } from "@/Types/cv";
// import { Education } from "@/Types/Resume";
 
interface EducationSectionProps {
  cvData: { education: Education[] };
  errors: Record<string, string>;
  onEducationAdd: () => void;
  onEducationUpdate: (id: string, field: keyof Education, value: string) => void;
  onEducationRemove: (id: string) => void;
}
export const ease = [0.22, 1, 0.36, 1] as const;
 
export function EducationSection({ cvData, errors, onEducationAdd, onEducationUpdate, onEducationRemove }: EducationSectionProps) {
  return (
    <div className={`${panelCls} p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/85">Education</h2>
          <p className="text-xs font-mono text-white/30 mt-1">Your academic qualifications and achievements.</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25">Step 3 / 5</span>
      </div>
 
      {errors.education && (
        <div className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors.education}</div>
      )}
 
      <div className="flex justify-between items-center mb-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25">History</p>
        <button onClick={onEducationAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200">
          <Plus size={12} /> Add Education
        </button>
      </div>
 
      <AP2>
        {cvData.education.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 rounded-2xl border border-dashed border-white/[0.07]">
            <GradIcon size={28} className="mx-auto mb-3 text-white/10" />
            <p className="text-xs font-mono text-white/20">No education entries yet.</p>
          </motion.div>
        )}
        {cvData.education.map((edu, i) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
            className="mb-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Education #{i + 1}</span>
              <button onClick={() => onEducationRemove(edu.id)}
                className="w-7 h-7 rounded-lg border border-red-500/20 bg-red-500/[0.05] flex items-center justify-center text-red-400/50 hover:text-red-400 hover:border-red-500/40 transition-all duration-150">
                <Trash2 size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className={labelCls}>Degree</label>
                <input value={edu.degree} onChange={e => onEducationUpdate(edu.id, "degree", e.target.value)} placeholder="Bachelor of Science" className={inputCls} /></div>
              <div><label className={labelCls}>Institution</label>
                <input value={edu.institution} onChange={e => onEducationUpdate(edu.id, "institution", e.target.value)} placeholder="University Name" className={inputCls} /></div>
              <div><label className={labelCls}>Field of Study</label>
                <input value={edu.field} onChange={e => onEducationUpdate(edu.id, "field", e.target.value)} placeholder="Computer Science" className={inputCls} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Start</label>
                  <input type="month" value={edu.startDate} onChange={e => onEducationUpdate(edu.id, "startDate", e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>End</label>
                  <input type="month" value={edu.endDate} onChange={e => onEducationUpdate(edu.id, "endDate", e.target.value)} className={inputCls} /></div>
              </div>
            </div>
            <div><label className={labelCls}>Description</label>
              <textarea value={edu.description} onChange={e => onEducationUpdate(edu.id, "description", e.target.value)}
                placeholder="Achievements, honours, relevant coursework…" rows={2} className={`${inputCls} resize-none`} /></div>
          </motion.div>
        ))}
      </AP2>
    </div>
  );
}
 