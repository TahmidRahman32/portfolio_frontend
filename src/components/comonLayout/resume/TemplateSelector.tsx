

// "use client";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import { TEMPLATES } from "@/utils/templates";
// import { ResumeTemplate } from "../type/Resume";

// interface TemplateSelectorProps {
//    selectedTemplate: ResumeTemplate;
//    onTemplateSelect: (template: ResumeTemplate) => void;
// }

// const ease = [0.22, 1, 0.36, 1] as const;

// const features = ["A4 Page Format", "Professional Typography", "ATS Friendly", "Clean Layout"];

// export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
//    return (
//       <div className="space-y-8">
//          <div>
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">Choose a Template</p>
//             <p className="text-xs font-mono text-white/30 leading-relaxed">All templates are A4 format, ATS-optimised, and export cleanly to PDF.</p>
//          </div>

//          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.values(TEMPLATES).map((tmpl, i) => {
//                const active = selectedTemplate === tmpl.id;
//                return (
//                   <motion.button
//                      key={tmpl.id}
//                      onClick={() => onTemplateSelect(tmpl.id)}
//                      initial={{ opacity: 0, y: 16 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ duration: 0.5, ease, delay: i * 0.07 }}
//                      className={`group relative text-left rounded-2xl border p-5 transition-all duration-250 overflow-hidden
//                 ${active ? "border-white/25 bg-white/[0.07]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05]"}`}
//                   >
//                      {/* Glow on active */}
//                      {active && <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />}

//                      <div className="flex items-start gap-3 mb-4">
//                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tmpl.color}`}>{tmpl.preview}</div>
//                         <div className="flex-1 min-w-0">
//                            <p className="text-sm font-semibold text-white/75 group-hover:text-white/90 transition-colors">{tmpl.name}</p>
//                            <p className="text-[11px] font-mono text-white/30 mt-0.5">{tmpl.description}</p>
//                         </div>
//                         {active && <CheckCircle size={15} className="text-white/50 flex-none mt-0.5" />}
//                      </div>

//                      {/* Fake preview lines */}
//                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 space-y-2">
//                         <div className="h-1.5 bg-white/10 rounded-full w-2/3" />
//                         <div className="h-px bg-white/[0.05] rounded-full" />
//                         <div className="h-1.5 bg-white/[0.07] rounded-full w-full" />
//                         <div className="h-1.5 bg-white/[0.07] rounded-full w-4/5" />
//                         <div className="flex gap-1.5 mt-2">
//                            <div className="h-4 bg-white/[0.06] rounded flex-1" />
//                            <div className="h-4 bg-white/[0.06] rounded flex-1" />
//                         </div>
//                      </div>

//                      <div className="flex items-center justify-between mt-3">
//                         <span className="text-[10px] font-mono text-white/20">A4 Format</span>
//                         {active ? <span className="text-[10px] font-mono text-white/40">Selected</span> : <span className="text-[10px] font-mono text-white/15 group-hover:text-white/30 transition-colors">Click to select</span>}
//                      </div>
//                   </motion.button>
//                );
//             })}
//          </div>

//          {/* Features */}
//          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">All templates include</p>
//             <div className="grid grid-cols-2 gap-2.5">
//                {features.map((f) => (
//                   <div key={f} className="flex items-center gap-2">
//                      <CheckCircle size={12} className="text-white/25 flex-none" />
//                      <span className="text-xs font-mono text-white/35">{f}</span>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }

"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { TEMPLATES } from "@/utils/templates";
import { ResumeTemplate } from "@/Types/Resume";
// import { ResumeTemplate } from "../type/Resume";

interface TemplateSelectorProps {
   selectedTemplate: ResumeTemplate;
   onTemplateSelect: (template: ResumeTemplate) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const features = ["A4 Page Format", "Professional Typography", "ATS Friendly", "Clean Layout"];

export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
   return (
      <div className="space-y-8">
         <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">Choose a Template</p>
            <p className="text-xs font-mono text-white/30 leading-relaxed">All templates are A4 format, ATS-optimised, and export cleanly to PDF.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(TEMPLATES).map((tmpl, i) => {
               const active = selectedTemplate === tmpl.id;
               return (
                  <motion.button
                     key={tmpl.id}
                     onClick={() => onTemplateSelect(tmpl.id)}
                     initial={{ opacity: 0, y: 16 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                     className={`group relative text-left rounded-2xl border p-5 transition-all duration-250 overflow-hidden
                ${active ? "border-white/25 bg-white/[0.07]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05]"}`}
                  >
                     {/* Glow on active */}
                     {active && <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />}

                     <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tmpl.color}`}>{tmpl.preview}</div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-semibold text-white/75 group-hover:text-white/90 transition-colors">{tmpl.name}</p>
                           <p className="text-[11px] font-mono text-white/30 mt-0.5">{tmpl.description}</p>
                        </div>
                        {active && <CheckCircle size={15} className="text-white/50 flex-none mt-0.5" />}
                     </div>

                     {/* Fake preview lines */}
                     <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 space-y-2">
                        <div className="h-1.5 bg-white/10 rounded-full w-2/3" />
                        <div className="h-px bg-white/[0.05] rounded-full" />
                        <div className="h-1.5 bg-white/[0.07] rounded-full w-full" />
                        <div className="h-1.5 bg-white/[0.07] rounded-full w-4/5" />
                        <div className="flex gap-1.5 mt-2">
                           <div className="h-4 bg-white/[0.06] rounded flex-1" />
                           <div className="h-4 bg-white/[0.06] rounded flex-1" />
                        </div>
                     </div>

                     <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] font-mono text-white/20">A4 Format</span>
                        {active ? <span className="text-[10px] font-mono text-white/40">Selected</span> : <span className="text-[10px] font-mono text-white/15 group-hover:text-white/30 transition-colors">Click to select</span>}
                     </div>
                  </motion.button>
               );
            })}
         </div>

         {/* Features */}
         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">All templates include</p>
            <div className="grid grid-cols-2 gap-2.5">
               {features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                     <CheckCircle size={12} className="text-white/25 flex-none" />
                     <span className="text-xs font-mono text-white/35">{f}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
