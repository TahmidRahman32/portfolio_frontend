// import { PersonalInfo } from "../type/Resume";
// import { inputCls, labelCls } from "./ResumeBuilder";

// interface PersonalInfoFormProps {
//    data: PersonalInfo;
//    onChange: (data: PersonalInfo) => void;
//    errors?: Record<string, string>;
// }

// export default function PersonalInfoForm({ data, onChange, errors }: PersonalInfoFormProps) {
//    const set = (field: keyof PersonalInfo, value: string) => onChange({ ...data, [field]: value });

//    const hasPersonalErr = !!errors?.personalInfo;
//    const nameErr = hasPersonalErr && !data.fullName;
//    const emailErr = hasPersonalErr && !data.email;
//    const phoneErr = hasPersonalErr && !data.phone;

//    return (
//       <div className="space-y-8">
//          {/* Basic info */}
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//                <label className={labelCls}>Full Name *</label>
//                <input type="text" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Gaziur Rahman Tahmid" className={inputCls(nameErr)} />
//                {nameErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Full name is required</p>}
//             </div>
//             <div>
//                <label className={labelCls}>Email *</label>
//                <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className={inputCls(emailErr)} />
//                {emailErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Email is required</p>}
//             </div>
//             <div>
//                <label className={labelCls}>Phone *</label>
//                <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+880 17XXXXXXXX" className={inputCls(phoneErr)} />
//                {phoneErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Phone is required</p>}
//             </div>
//             <div>
//                <label className={labelCls}>Address</label>
//                <input type="text" value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="Dhaka, Bangladesh" className={inputCls()} />
//             </div>
//          </div>

//          {/* Professional links */}
//          <div className="pt-6 border-t border-white/[0.06]">
//             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-5">Professional Links</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                <div>
//                   <label className={labelCls}>LinkedIn</label>
//                   <input type="url" value={data.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourname" className={inputCls()} />
//                </div>
//                <div>
//                   <label className={labelCls}>GitHub</label>
//                   <input type="url" value={data.github || ""} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/yourname" className={inputCls()} />
//                </div>
//                <div className="md:col-span-2">
//                   <label className={labelCls}>Portfolio Website</label>
//                   <input type="url" value={data.website || ""} onChange={(e) => set("website", e.target.value)} placeholder="https://yourportfolio.com" className={inputCls()} />
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

// import { PersonalInfo } from "../type/Resume";
import { PersonalInfo } from "@/Types/Resume";
import { inputCls, labelCls } from "./ResumeBuilder";

interface PersonalInfoFormProps {
   data: PersonalInfo;
   onChange: (data: PersonalInfo) => void;
   errors?: Record<string, string>;
}

export default function PersonalInfoForm({ data, onChange, errors }: PersonalInfoFormProps) {
   const set = (field: keyof PersonalInfo, value: string) => onChange({ ...data, [field]: value });

   const hasPersonalErr = !!errors?.personalInfo;
   const nameErr = hasPersonalErr && !data.fullName;
   const emailErr = hasPersonalErr && !data.email;
   const phoneErr = hasPersonalErr && !data.phone;

   return (
      <div className="space-y-8">
         {/* Basic info */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
               <label className={labelCls}>Full Name *</label>
               <input type="text" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Gaziur Rahman Tahmid" className={inputCls(nameErr)} />
               {nameErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Full name is required</p>}
            </div>
            <div>
               <label className={labelCls}>Email *</label>
               <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className={inputCls(emailErr)} />
               {emailErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Email is required</p>}
            </div>
            <div>
               <label className={labelCls}>Phone *</label>
               <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+880 17XXXXXXXX" className={inputCls(phoneErr)} />
               {phoneErr && <p className="mt-1.5 text-[11px] font-mono text-red-400/70">Phone is required</p>}
            </div>
            <div>
               <label className={labelCls}>Address</label>
               <input type="text" value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="Dhaka, Bangladesh" className={inputCls()} />
            </div>
         </div>

         {/* Additional personal info */}
         <div className="pt-6 border-t border-white/[0.06]">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-5">Additional Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" value={data.dateOfBirth || ""} onChange={(e) => set("dateOfBirth", e.target.value)} className={`${inputCls()} [color-scheme:dark]`} />
               </div>
               <div>
                  <label className={labelCls}>Nationality</label>
                  <input type="text" value={data.nationality || ""} onChange={(e) => set("nationality", e.target.value)} placeholder="e.g. Bangladeshi" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>Gender</label>
                  <select value={data.gender || ""} onChange={(e) => set("gender", e.target.value)} className={`${inputCls()} cursor-pointer`}>
                     <option value="">Not specified</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                  </select>
               </div>
               <div>
                  <label className={labelCls}>Languages</label>
                  <input type="text" value={data.languages || ""} onChange={(e) => set("languages", e.target.value)} placeholder="e.g. Bengali, English, French" className={inputCls()} />
               </div>
            </div>
         </div>

         {/* Professional links */}
         <div className="pt-6 border-t border-white/[0.06]">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-5">Professional Links</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                  <label className={labelCls}>LinkedIn</label>
                  <input type="url" value={data.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourname" className={inputCls()} />
               </div>
               <div>
                  <label className={labelCls}>GitHub</label>
                  <input type="url" value={data.github || ""} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/yourname" className={inputCls()} />
               </div>
               <div className="md:col-span-2">
                  <label className={labelCls}>Portfolio Website</label>
                  <input type="url" value={data.website || ""} onChange={(e) => set("website", e.target.value)} placeholder="https://yourportfolio.com" className={inputCls()} />
               </div>
            </div>
         </div>
      </div>
   );
}
