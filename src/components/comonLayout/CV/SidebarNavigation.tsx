// // SidebarNavigation.tsx
// import { motion } from "framer-motion";
// import { CVTemplate } from "../type/cv";

// interface SidebarNavigationProps {
//    activeSection: string;
//    selectedTemplate: CVTemplate;
//    errors: Record<string, string>;
//    onSectionChange: (section: string) => void;
//    onPrint: () => void;
//    onDownloadPDF: () => void;
//    isGeneratingPDF?: boolean;
// }

// const sections = [
//    { id: "template", label: "Template", icon: "🎨" },
//    { id: "personal", label: "Personal Info", icon: "👤" },
//    { id: "education", label: "Education", icon: "🎓" },
//    { id: "experience", label: "Experience", icon: "💼" },
//    { id: "skills", label: "Skills", icon: "🛠️" },
// ];

// export function SidebarNavigation({ activeSection, selectedTemplate, errors, onSectionChange, onPrint, onDownloadPDF, isGeneratingPDF = false }: SidebarNavigationProps) {
//    return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 h-fit print:hidden">
//          <div className="space-y-4">
//             {/* Navigation Sections */}
//             {sections.map((section) => (
//                <motion.button
//                   key={section.id}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => onSectionChange(section.id)}
//                   className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
//                      activeSection === section.id ? "bg-blue-50 border-2 border-blue-200 text-blue-700" : "bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100"
//                   } ${errors[section.id] ? "border-red-200 bg-red-50" : ""}`}
//                >
//                   <span className="text-2xl">{section.icon}</span>
//                   <div className="flex-1 text-left">
//                      <div className="font-semibold">{section.label}</div>
//                      {errors[section.id] && <div className="text-sm text-red-500 mt-1">{errors[section.id]}</div>}
//                   </div>
//                </motion.button>
//             ))}

//             {/* Download Buttons */}
//             <div className="pt-6 border-t border-gray-200 space-y-3">
//                <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onPrint}
//                   disabled={isGeneratingPDF}
//                   className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
//                >
//                   <span>🖨️ Print CV</span>
//                </motion.button>

//                <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onDownloadPDF}
//                   disabled={isGeneratingPDF}
//                   className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
//                >
//                   {isGeneratingPDF ? (
//                      <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Generating PDF...</span>
//                      </>
//                   ) : (
//                      <>
//                         <span>📄 Download PDF</span>
//                      </>
//                   )}
//                </motion.button>
//             </div>

//             {/* Selected Template Info */}
//             <div className="pt-4 border-t border-gray-200">
//                <div className="text-sm text-gray-500">Selected Template</div>
//                <div className="font-semibold text-gray-700 capitalize">{selectedTemplate}</div>
//             </div>
//          </div>
//       </div>
//    );
// }

export function SidebarNavigation(_: any) {
   return null; // handled inside CVBuilder
}