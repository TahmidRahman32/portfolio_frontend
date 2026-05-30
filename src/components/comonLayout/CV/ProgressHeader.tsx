// import { motion } from "framer-motion";
// import { Sparkles } from "lucide-react";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// interface ProgressHeaderProps {
//    completion: {
//       percentage: number;
//       completed: number;
//       total: number;
//    };
// }

// export function ProgressHeader({ completion }: ProgressHeaderProps) {
//    return (
//       <>
//          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
//             <div className="inline-flex items-center gap-3 mb-4">
//                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
//                   <Sparkles className="h-8 w-8 text-white" />
//                </div>
//                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Professional CV Builder</h1>
//             </div>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Create your professional CV in minutes with stunning templates and modern design</p>
//             <div className="w-3xs mx-auto my-4">
//                <Link
//                   href="/resume"
//                   className="mt-4 text-center md:mt-0 px-6 py-3 bg-gradient-to-r from-[#7e0d09] to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
//                >
//                   <ArrowLeft size={18} />
//                   Make Your Resume
//                </Link>
//             </div>
//          </motion.div>

//          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
//             <div className="flex items-center justify-between mb-3">
//                <span className="text-sm font-semibold text-gray-700">CV Completion</span>
//                <span className="text-lg font-bold text-green-500">{completion.percentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${completion.percentage}%` }} />
//             </div>
//             <p className="text-xs text-gray-600 mt-2">
//                {completion.completed} of {completion.total} sections completed
//             </p>
//          </motion.div>
//       </>
//    );
// }

export function ProgressHeader({ completion }: { completion: { percentage: number; completed: number; total: number } }) {
   return null; // handled inside CVBuilder
}
 
