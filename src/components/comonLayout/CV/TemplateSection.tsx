// import { motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { CVTemplate, templateOptions } from "../type/cv";
// // import { CVTemplate, templateOptions } from "../../types/cv";

// interface TemplateSectionProps {
//    selectedTemplate: CVTemplate;
//    onTemplateSelect: (template: CVTemplate) => void;
// }

// export function TemplateSection({ selectedTemplate, onTemplateSelect }: TemplateSectionProps) {
//    return (
//       <motion.div key="template" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//          <div className="flex items-center justify-between mb-8">
//             <div>
//                <h2 className="text-2xl font-bold text-gray-800">Template</h2>
//                <p className="text-gray-600 mt-1">Choose a CV template that matches your style and industry</p>
//             </div>
//             <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 1 of 5</div>
//          </div>

//          <div className="space-y-4">
//             <Label className="text-sm font-semibold text-gray-700">Choose a Template</Label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                {templateOptions.map((template) => (
//                   <motion.div
//                      key={template.value}
//                      whileHover={{ scale: 1.02 }}
//                      whileTap={{ scale: 0.98 }}
//                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${selectedTemplate === template.value ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
//                      onClick={() => onTemplateSelect(template.value as CVTemplate)}
//                   >
//                      <div className="flex items-center gap-3 mb-2">
//                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-r ${template.color}`}>{template.preview}</div>
//                         <div>
//                            <div className="font-semibold text-gray-900">{template.label}</div>
//                            <div className="text-xs text-gray-500">{template.description}</div>
//                         </div>
//                      </div>
//                   </motion.div>
//                ))}
//             </div>
//          </div>
//       </motion.div>
//    );
// }


// ─────────────────────────────────────────────────────────────────────────────
// TemplateSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
// import { CVTemplate, templateOptions } from "../type/cv";
import { panelCls } from "./CVBuilder";
import { CVTemplate, templateOptions } from "@/Types/cv";
// import { panelCls, ease } from "./CVBuilder";
 
interface TemplateSectionProps {
  selectedTemplate: CVTemplate;
  onTemplateSelect: (t: CVTemplate) => void;
}
 export const ease = [0.22, 1, 0.36, 1] as const;
export function TemplateSection({ selectedTemplate, onTemplateSelect }: TemplateSectionProps) {
  return (
    <div className={`${panelCls} p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/85">Template</h2>
          <p className="text-xs font-mono text-white/30 mt-1">Choose a layout that matches your style and industry.</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25">Step 1 / 5</span>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templateOptions.map((tmpl, i) => {
          const active = selectedTemplate === tmpl.value;
          return (
            <motion.button key={tmpl.value} onClick={() => onTemplateSelect(tmpl.value as CVTemplate)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              className={`group relative text-left rounded-2xl border p-5 transition-all duration-250 overflow-hidden ${active ? "border-white/25 bg-white/[0.07]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05]"}`}>
              {active && <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 50% 0%,rgba(255,255,255,0.06) 0%,transparent 70%)" }} />}
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gradient-to-r ${tmpl.color}`}>{tmpl.preview}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/70 group-hover:text-white/85 transition-colors">{tmpl.label}</p>
                  <p className="text-[11px] font-mono text-white/30 mt-0.5">{tmpl.description}</p>
                </div>
                {active && <CheckCircle size={14} className="text-white/45 flex-none mt-0.5" />}
              </div>
              {/* Preview lines */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 space-y-2">
                <div className="h-1.5 bg-white/10 rounded-full w-1/2" />
                <div className="h-px bg-white/[0.04]" />
                <div className="h-1.5 bg-white/[0.07] rounded-full w-full" />
                <div className="h-1.5 bg-white/[0.07] rounded-full w-4/5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
 