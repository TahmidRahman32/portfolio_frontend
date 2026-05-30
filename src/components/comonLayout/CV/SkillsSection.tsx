// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, Bone } from "lucide-react";

// interface SkillsSectionProps {
//    cvData: {
//       skills: string[];
//    };
//    errors: Record<string, string>;
//    onSkillsAdd: (skill: string) => void;
//    onSkillsRemove: (index: number) => void;
// }

// export function SkillsSection({ cvData, errors, onSkillsAdd, onSkillsRemove }: SkillsSectionProps) {
//    const [newSkill, setNewSkill] = useState("");

//    const handleAddSkill = () => {
//       if (newSkill.trim()) {
//          onSkillsAdd(newSkill.trim());
//          setNewSkill("");
//       }
//    };

//    const handleKeyPress = (e: React.KeyboardEvent) => {
//       if (e.key === "Enter") {
//          handleAddSkill();
//       }
//    };

//    return (
//       <motion.div key="skills" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//          <div className="flex items-center justify-between mb-8">
//             <div>
//                <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
//                <p className="text-gray-600 mt-1">Showcase your technical and professional capabilities</p>
//             </div>
//             <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 5 of 5</div>
//          </div>

//          {errors.skills && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
//                <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
//                   <div className="w-2 h-2 bg-red-500 rounded-full" />
//                </div>
//                <div>
//                   <span className="text-red-800 font-medium block">Required</span>
//                   <span className="text-red-700 text-sm">{errors.skills}</span>
//                </div>
//             </motion.div>
//          )}

//          <div className="space-y-6">
//             {/* Add Skill Input */}
//             <div className="flex gap-3">
//                <Input
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Add a skill (e.g., JavaScript, Project Management, Communication)"
//                   className="rounded-xl border-gray-300 focus:border-indigo-500 transition-all duration-300 flex-1"
//                />
//                <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleAddSkill}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300"
//                >
//                   <Plus className="h-4 w-4" />
//                   Add
//                </motion.button>
//             </div>

//             {/* Skills Display */}
//             <div className="space-y-4">
//                <Label className="text-sm font-semibold text-gray-700">Your Skills ({cvData.skills.length})</Label>

//                <motion.div layout className="flex flex-wrap gap-3">
//                   <AnimatePresence>
//                      {cvData.skills.map((skill, index) => (
//                         <motion.div
//                            key={`${skill}-${index}`}
//                            initial={{ opacity: 0, scale: 0.8 }}
//                            animate={{ opacity: 1, scale: 1 }}
//                            exit={{ opacity: 0, scale: 0.8 }}
//                            whileHover={{ scale: 1.05 }}
//                            whileTap={{ scale: 0.95 }}
//                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
//                            onClick={() => onSkillsRemove(index)}
//                         >
//                            <span className="text-sm font-medium">{skill}</span>
//                            <Trash2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                         </motion.div>
//                      ))}
//                   </AnimatePresence>
//                </motion.div>
//             </div>

//             {cvData.skills.length === 0 && (
//                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
//                   <Bone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500">No skills added yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Add your skills and competencies</p>
//                   <div className="mt-4 space-y-2 max-w-md mx-auto">
//                      <p className="text-xs text-gray-500">Try adding skills like:</p>
//                      <div className="flex flex-wrap justify-center gap-2">
//                         {["JavaScript", "React", "Project Management", "Communication", "Python", "Leadership"].map((example) => (
//                            <button key={example} onClick={() => onSkillsAdd(example)} className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200">
//                               {example}
//                            </button>
//                         ))}
//                      </div>
//                   </div>
//                </motion.div>
//             )}
//          </div>

//          {/* Navigation Buttons */}
//          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <motion.button
//                whileHover={{ scale: 1.02 }}
//                whileTap={{ scale: 0.98 }}
//                onClick={() => {
//                   // Navigate to previous section (experience)
//                   const event = new CustomEvent("navigateSection", { detail: "experience" });
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
//                   // Navigate to template section (complete the loop)
//                   const event = new CustomEvent("navigateSection", { detail: "template" });
//                   window.dispatchEvent(event);
//                }}
//                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-colors duration-200 flex items-center gap-2"
//             >
//                <span>Complete CV</span>
//                <div className="w-4 h-4">✓</div>
//             </motion.button>
//          </div>
//       </motion.div>
//    );
// }

// ─────────────────────────────────────────────────────────────────────────────
// SkillsSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
import { Plus, X, Zap as ZapIcon } from "lucide-react";
import { useState } from "react";
import { inputCls, panelCls } from "./CVBuilder";
import { motion, } from "framer-motion";
 
interface SkillsSectionProps {
  cvData: { skills: string[] };
  errors: Record<string, string>;
  onSkillsAdd: (skill: string) => void;
  onSkillsRemove: (index: number) => void;
}
 export const ease = [0.22, 1, 0.36, 1] as const;
export function SkillsSection({ cvData, errors, onSkillsAdd, onSkillsRemove }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("");
 
  const add = () => { if (newSkill.trim()) { onSkillsAdd(newSkill.trim()); setNewSkill(""); } };
 
  const examples = ["JavaScript", "React", "TypeScript", "Node.js", "Communication", "Leadership"];
 
  return (
    <div className={`${panelCls} p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/85">Skills</h2>
          <p className="text-xs font-mono text-white/30 mt-1">Your technical and professional capabilities.</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25">Step 5 / 5</span>
      </div>
 
      {errors.skills && (
        <div className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors.skills}</div>
      )}
 
      {/* Add skill input */}
      <div className="flex gap-2 mb-6">
        <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && add()}
          placeholder="e.g. JavaScript, React, Project Management" className={`${inputCls} flex-1`} />
        <button onClick={add} disabled={!newSkill.trim()}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
          <Plus size={13} /> Add
        </button>
      </div>
 
      {/* Skills */}
      {cvData.skills.length === 0 ? (
        <div className="text-center py-10 rounded-2xl border border-dashed border-white/[0.07]">
          <ZapIcon size={28} className="mx-auto mb-3 text-white/10" />
          <p className="text-xs font-mono text-white/20 mb-4">No skills added yet.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map(ex => (
              <button key={ex} onClick={() => onSkillsAdd(ex)}
                className="px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[11px] font-mono text-white/30 hover:border-white/20 hover:text-white/50 transition-all duration-150">
                {ex}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-3">Your Skills ({cvData.skills.length})</p>
          <div>
            <motion.div layout className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, i) => (
                <motion.div key={`${skill}-${i}`} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, ease }}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] transition-all duration-200">
                  <span className="text-xs font-mono text-white/55">{skill}</span>
                  <button onClick={() => onSkillsRemove(i)}
                    className="text-white/20 hover:text-red-400/70 opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <X size={11} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
 
