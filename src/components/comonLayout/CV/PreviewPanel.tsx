// import { motion } from "framer-motion";
// import { CVData, CVTemplate, templateOptions } from "../type/cv";
// import CVPreview from "./CVPreview";

// interface PreviewPanelProps {
//    cvData: CVData;
//    selectedTemplate: CVTemplate;
//    className?: string;
// }

// export function PreviewPanel({ cvData, selectedTemplate, className = "" }: PreviewPanelProps) {
//    return (
//       <div className={`lg:col-span-1 ${className}`}>
//          <div className="sticky top-8">
//             <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 print:shadow-none print:border-none print:bg-white">
//                <div className="flex items-center justify-between mb-4 print:hidden">
//                   <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
//                   <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{templateOptions.find((t) => t.value === selectedTemplate)?.label} • A4</div>
//                </div>
//                <div className="border-2 border-dashed border-gray-200 rounded-lg p-2 bg-gray-50 print:border-0 print:bg-white print:p-0">
//                   <CVPreview data={cvData} template={selectedTemplate} />
//                </div>
//             </motion.div>
//          </div>
//       </div>
//    );
// }

import { CVData as CVDataType, CVTemplate as CVTemplateType, templateOptions as tOpts } from "@/Types/cv";
import { panelCls } from "./CVBuilder";
import CVPreview from "./CVPreview";

interface PreviewPanelProps {
   cvData: CVDataType;
   selectedTemplate: CVTemplateType;
   className?: string;
}

export function PreviewPanel({ cvData, selectedTemplate, className = "" }: PreviewPanelProps) {
   return (
      <div className={`lg:col-span-1 ${className}`}>
         <div className={`${panelCls} p-5 sticky top-6 print:shadow-none print:border-none`}>
            <div className="flex items-center justify-between mb-4 print:hidden">
               <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">Live Preview</p>
               <span className="text-[10px] font-mono text-white/20">{tOpts.find((t) => t.value === selectedTemplate)?.label} · A4</span>
            </div>
            <div className="rounded-xl border border-white/[0.05] overflow-hidden bg-white print:border-0">
               <CVPreview data={cvData} template={selectedTemplate} />
            </div>
         </div>
      </div>
   );
}
