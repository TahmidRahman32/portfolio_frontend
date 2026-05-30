// import { easeOut, motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Upload } from "lucide-react";
// import { CVData } from "../type/cv";
// // import { CVData } from "../../types/cv";

// interface PersonalInfoSectionProps {
//    cvData: CVData;
//    isUploading: boolean;
//    errors: Record<string, string>;
//    onPersonalInfoUpdate: (field: keyof CVData["personalInfo"], value: string) => void;
//    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export function PersonalInfoSection({ cvData, isUploading, errors, onPersonalInfoUpdate, onImageUpload }: PersonalInfoSectionProps) {
//    const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//          opacity: 1,
//          transition: {
//             staggerChildren: 0.1,
//          },
//       },
//    };

//    const itemVariants = {
//       hidden: { opacity: 0, y: 20 },
//       visible: {
//          opacity: 1,
//          y: 0,
//          transition: {
//             duration: 0.5,
//             ease: easeOut,
//          },
//       },
//    };

//    return (
//       <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//          <div className="flex items-center justify-between mb-8">
//             <div>
//                <h2 className="text-2xl font-bold text-gray-800">Personal Info</h2>
//                <p className="text-gray-600 mt-1">Enter your basic contact information and professional summary</p>
//             </div>
//             <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 2 of 5</div>
//          </div>

//          {errors.personalInfo && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
//                <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
//                   <div className="w-2 h-2 bg-red-500 rounded-full" />
//                </div>
//                <div>
//                   <span className="text-red-800 font-medium block">Required</span>
//                   <span className="text-red-700 text-sm">{errors.personalInfo}</span>
//                </div>
//             </motion.div>
//          )}

//          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
//             {/* Profile Image Upload */}
//             <motion.div variants={itemVariants} className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-indigo-400 transition-colors duration-300">
//                <Label htmlFor="profileImage" className="cursor-pointer">
//                   <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm font-medium text-gray-700">{cvData.personalInfo.profileImage ? "Change Profile Picture" : "Upload Profile Picture"}</p>
//                   <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
//                   {isUploading && (
//                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
//                         <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
//                      </motion.div>
//                   )}
//                </Label>
//                <Input id="profileImage" type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
//             </motion.div>

//             {/* Personal Info Fields */}
//             <div className="grid gap-4">
//                {[
//                   { id: "fullName", label: "Full Name", placeholder: "John Doe" },
//                   { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
//                   { id: "phone", label: "Phone", placeholder: "+1 234 567 8900" },
//                   { id: "location", label: "Location", placeholder: "New York, USA" },
//                ].map((field, index) => (
//                   <motion.div key={field.id} variants={itemVariants} transition={{ delay: index * 0.1 }}>
//                      <Label htmlFor={field.id} className="text-sm font-medium text-gray-700 mb-2 block">
//                         {field.label}
//                      </Label>
//                      <Input
//                         id={field.id}
//                         type={field.type || "text"}
//                         value={cvData.personalInfo[field.id as keyof typeof cvData.personalInfo] as string}
//                         onChange={(e) => onPersonalInfoUpdate(field.id as keyof CVData["personalInfo"], e.target.value)}
//                         placeholder={field.placeholder}
//                         className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
//                      />
//                   </motion.div>
//                ))}
//             </div>

//             <motion.div variants={itemVariants} transition={{ delay: 0.4 }}>
//                <Label htmlFor="summary" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Professional Summary
//                </Label>
//                <Textarea
//                   id="summary"
//                   value={cvData.personalInfo.summary}
//                   onChange={(e) => onPersonalInfoUpdate("summary", e.target.value)}
//                   placeholder="Brief overview of your professional background, skills, and achievements..."
//                   rows={4}
//                   className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 resize-none transition-all duration-300"
//                />
//             </motion.div>
//          </motion.div>
//       </motion.div>
//    );
// }


// ─────────────────────────────────────────────────────────────────────────────
// PersonalInfoSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
import { Upload } from "lucide-react";
// import { CVData } from "../type/cv";
import { inputCls, labelCls, panelCls } from "./CVBuilder";
import { CVData } from "@/Types/cv";
 
interface PersonalInfoSectionProps {
  cvData: CVData;
  isUploading: boolean;
  errors: Record<string, string>;
  onPersonalInfoUpdate: (field: keyof CVData["personalInfo"], value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
 
export function PersonalInfoSection({ cvData, isUploading, errors, onPersonalInfoUpdate, onImageUpload }: PersonalInfoSectionProps) {
  const fields = [
    { id: "fullName", label: "Full Name *",  type: "text",  ph: "Gaziur Rahman Tahmid" },
    { id: "email",    label: "Email *",       type: "email", ph: "you@example.com" },
    { id: "phone",    label: "Phone *",       type: "tel",   ph: "+880 17XXXXXXXX" },
    { id: "location", label: "Location",      type: "text",  ph: "Dhaka, Bangladesh" },
  ] as const;
 
  return (
    <div className={`${panelCls} p-6 md:p-8`}>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }} className="text-2xl font-normal text-white/85">Personal Info</h2>
          <p className="text-xs font-mono text-white/30 mt-1">Your contact information and professional summary.</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25">Step 2 / 5</span>
      </div>
 
      {errors.personalInfo && (
        <div className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80">{errors.personalInfo}</div>
      )}
 
      <div className="space-y-6">
        {/* Image upload */}
        <div className="relative rounded-2xl border border-dashed border-white/[0.08] hover:border-white/[0.15] transition-colors duration-200 p-6 text-center cursor-pointer group">
          <label htmlFor="profileImage" className="cursor-pointer flex flex-col items-center gap-2">
            {cvData.personalInfo.profileImage
              ? <img src={cvData.personalInfo.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-white/10 mx-auto mb-2" />
              : <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mb-2 group-hover:border-white/20 transition-colors">
                  <Upload size={18} className="text-white/25 group-hover:text-white/45 transition-colors" />
                </div>
            }
            <p className="text-xs font-mono text-white/35 group-hover:text-white/55 transition-colors">
              {cvData.personalInfo.profileImage ? "Change photo" : "Upload profile photo"}
            </p>
            <p className="text-[10px] font-mono text-white/20">Max 5MB</p>
            {isUploading && <div className="w-4 h-4 border border-white/20 border-t-white/50 rounded-full animate-spin mt-1" />}
          </label>
          <input id="profileImage" type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
        </div>
 
        {/* Text fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.id}>
              <label className={labelCls}>{f.label}</label>
              <input type={f.type} value={cvData.personalInfo[f.id] as string}
                onChange={e => onPersonalInfoUpdate(f.id, e.target.value)}
                placeholder={f.ph} className={inputCls} />
            </div>
          ))}
        </div>
 
        <div>
          <label className={labelCls}>Professional Summary</label>
          <textarea value={cvData.personalInfo.summary} onChange={e => onPersonalInfoUpdate("summary", e.target.value)}
            placeholder="Brief overview of your professional background and goals…" rows={4}
            className={`${inputCls} resize-none`} />
        </div>
      </div>
    </div>
  );
}
 