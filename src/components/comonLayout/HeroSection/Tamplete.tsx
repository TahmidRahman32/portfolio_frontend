// // app/resume-builder/templates/page.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function TemplatesPage() {
//    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
//    const [filter, setFilter] = useState("all");

//    const templates = [
//       {
//          id: "modern",
//          name: "Modern",
//          category: "professional",
//          description: "Clean, contemporary design with bold accents",
//          color: "from-blue-500 to-purple-600",
//          emoji: "🔄",
//          difficulty: "Easy",
//          popular: true,
//          preview: "/templates/modern-preview.jpg",
//       },
//       {
//          id: "professional",
//          name: "Professional",
//          category: "professional",
//          description: "Traditional layout trusted by recruiters",
//          color: "from-gray-600 to-gray-800",
//          emoji: "💼",
//          difficulty: "Easy",
//          popular: true,
//          preview: "/templates/professional-preview.jpg",
//       },
//       {
//          id: "minimal",
//          name: "Minimal",
//          category: "creative",
//          description: "Simple, elegant, and distraction-free",
//          color: "from-green-500 to-teal-600",
//          emoji: "📄",
//          difficulty: "Easy",
//          popular: false,
//          preview: "/templates/minimal-preview.jpg",
//       },
//       {
//          id: "creative",
//          name: "Creative",
//          category: "creative",
//          description: "Bold design for creative industries",
//          color: "from-orange-500 to-red-600",
//          emoji: "🎨",
//          difficulty: "Medium",
//          popular: true,
//          preview: "/templates/creative-preview.jpg",
//       },
//       {
//          id: "executive",
//          name: "Executive",
//          category: "professional",
//          description: "Sophisticated layout for senior roles",
//          color: "from-indigo-600 to-purple-700",
//          emoji: "👔",
//          difficulty: "Medium",
//          popular: false,
//          preview: "/templates/executive-preview.jpg",
//       },
//       {
//          id: "technical",
//          name: "Technical",
//          category: "professional",
//          description: "Optimized for tech and engineering roles",
//          color: "from-cyan-500 to-blue-600",
//          emoji: "⚙️",
//          difficulty: "Easy",
//          popular: true,
//          preview: "/templates/technical-preview.jpg",
//       },
//    ];

//    const categories = [
//       { id: "all", name: "All Templates", count: templates.length },
//       { id: "professional", name: "Professional", count: templates.filter((t) => t.category === "professional").length },
//       { id: "creative", name: "Creative", count: templates.filter((t) => t.category === "creative").length },
//    ];

//    const filteredTemplates = filter === "all" ? templates : templates.filter((template) => template.category === filter);

//    return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//          {/* Header */}
//          <header className="bg-white shadow-sm border-b">
//             <div className="container mx-auto px-4 py-6">
//                <div className="flex items-center justify-between">
//                   <Link href="/resume" className="flex items-center gap-3 group">
//                      <motion.div whileHover={{ scale: 1.05 }} className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg transition-shadow">
//                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                      </motion.div>
//                      <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
//                         <p className="text-gray-600 text-sm">Professional Resume Templates</p>
//                      </div>
//                   </Link>
//                   <Link href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
//                      Back to Home
//                   </Link>
//                </div>
//             </div>
//          </header>

//          {/* Hero Section */}
//          <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//             <div className="container mx-auto px-4 text-center">
//                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6">
//                   Choose Your Template
//                </motion.h1>
//                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
//                   Select from professionally designed A4 templates that help you stand out
//                </motion.p>
//             </div>
//          </section>

//          {/* Main Content */}
//          <main className="container mx-auto px-4 py-12">
//             {/* Category Filters */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap gap-4 mb-12 justify-center">
//                {categories.map((category) => (
//                   <button
//                      key={category.id}
//                      onClick={() => setFilter(category.id)}
//                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
//                         filter === category.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
//                      }`}
//                   >
//                      {category.name} ({category.count})
//                   </button>
//                ))}
//             </motion.div>

//             {/* Templates Grid */}
//             <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//                {filteredTemplates.map((template, index) => (
//                   <motion.div
//                      key={template.id}
//                      initial={{ opacity: 0, y: 30 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ duration: 0.6, delay: index * 0.1 }}
//                      whileHover={{ y: -5, scale: 1.02 }}
//                      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${selectedTemplate === template.id ? "border-blue-500 ring-4 ring-blue-200" : "border-white hover:border-blue-300"}`}
//                   >
//                      {/* Template Header */}
//                      <div className={`bg-gradient-to-r ${template.color} p-6 relative`}>
//                         {template.popular && <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Popular</div>}
//                         <div className="flex items-center justify-between mb-4">
//                            <span className="text-white text-3xl">{template.emoji}</span>
//                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">{template.difficulty}</span>
//                         </div>
//                         <h3 className="text-2xl font-bold text-white mb-2">{template.name}</h3>
//                         <p className="text-blue-100">{template.description}</p>
//                      </div>

//                      {/* Template Preview */}
//                      <div className="p-6">
//                         <div className="bg-gray-100 rounded-lg aspect-[3/4] mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
//                            <div className="text-center p-8">
//                               <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
//                                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                  </svg>
//                               </div>
//                               <p className="text-gray-600 text-sm">Template Preview</p>
//                               <p className="text-gray-500 text-xs mt-2">A4 Format • PDF Export</p>
//                            </div>
//                         </div>

//                         <div className="flex gap-3">
//                            <button
//                               onClick={() => setSelectedTemplate(template.id)}
//                               className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                                  selectedTemplate === template.id ? "bg-blue-100 text-blue-700 border-2 border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
//                               }`}
//                            >
//                               {selectedTemplate === template.id ? "Selected" : "Preview"}
//                            </button>
//                            <Link
//                               href={`/resume-builder?template=${template.id}`}
//                               className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
//                            >
//                               Use Template
//                            </Link>
//                         </div>
//                      </div>
//                   </motion.div>
//                ))}
//             </motion.div>

//             {/* CTA Section */}
//             <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white">
//                <h2 className="text-4xl font-bold mb-6">Ready to Create Your Resume?</h2>
//                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Start with your chosen template and build a professional resume that gets you noticed by employers.</p>
//                <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link href="/resume-builder" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
//                      Start Building Now
//                   </Link>
//                   <Link href="/" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
//                      Learn More
//                   </Link>
//                </div>
//             </motion.section>

//             {/* Features */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//                {[
//                   {
//                      icon: "🎯",
//                      title: "ATS Friendly",
//                      description: "Optimized for applicant tracking systems",
//                   },
//                   {
//                      icon: "📱",
//                      title: "Mobile Responsive",
//                      description: "Works perfectly on all devices",
//                   },
//                   {
//                      icon: "⚡",
//                      title: "Quick Export",
//                      description: "Download as PDF in one click",
//                   },
//                ].map((feature, index) => (
//                   <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
//                      <div className="text-4xl mb-4">{feature.icon}</div>
//                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//                      <p className="text-gray-600">{feature.description}</p>
//                   </motion.div>
//                ))}
//             </motion.div>
//          </main>

//          {/* Footer */}
//          <footer className="bg-gray-900 text-white py-12">
//             <div className="container mx-auto px-4 text-center">
//                <p className="text-gray-400">&copy; 2024 Resume Builder. All rights reserved.</p>
//             </div>
//          </footer>
//       </div>
//    );
// }

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle, Home, FileText } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const templates = [
   { id: "modern", name: "Modern", category: "professional", description: "Clean, contemporary design with bold accents.", color: "from-blue-500 to-purple-600", emoji: "◈", popular: true },
   { id: "professional", name: "Professional", category: "professional", description: "Traditional layout trusted by recruiters worldwide.", color: "from-zinc-600 to-zinc-800", emoji: "◻", popular: true },
   { id: "minimal", name: "Minimal", category: "creative", description: "Simple, elegant, and distraction-free.", color: "from-emerald-500 to-teal-600", emoji: "○", popular: false },
   { id: "creative", name: "Creative", category: "creative", description: "Bold typographic design for creative industries.", color: "from-orange-500 to-red-600", emoji: "◆", popular: true },
   { id: "executive", name: "Executive", category: "professional", description: "Sophisticated two-column layout for senior roles.", color: "from-indigo-600 to-purple-700", emoji: "▣", popular: false },
   { id: "technical", name: "Technical", category: "professional", description: "Optimised for tech and engineering job applications.", color: "from-cyan-500 to-blue-600", emoji: "⬡", popular: true },
];

const cats = [
   { id: "all", label: "All", count: templates.length },
   { id: "professional", label: "Professional", count: templates.filter((t) => t.category === "professional").length },
   { id: "creative", label: "Creative", count: templates.filter((t) => t.category === "creative").length },
];

const features = [
   { label: "ATS Friendly", sub: "Passes applicant tracking systems" },
   { label: "A4 Format", sub: "Print-ready PDF output" },
   { label: "One-click Export", sub: "Download PDF instantly" },
   { label: "Mobile Responsive", sub: "Works on all screen sizes" },
];

export default function TemplatesPage() {
   const [selected, setSelected] = useState<string | null>(null);
   const [filter, setFilter] = useState("all");

   const gridRef = useRef<HTMLDivElement>(null);
   const inView = useInView(gridRef, { once: true, margin: "-60px" });

   const filtered = filter === "all" ? templates : templates.filter((t) => t.category === filter);

   return (
      <div className="min-h-screen bg-[#080808] pt-24">
         {/* Noise */}
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />
         {/* Grid */}
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
         />

         {/* ── Nav ── */}
         <header className="relative z-10 border-b border-white/[0.06] backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
               <Link href="/resume" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center group-hover:border-white/20 transition-colors">
                     <FileText size={14} className="text-white/40" />
                  </div>
                  <span className="text-sm font-mono text-white/40 group-hover:text-white/60 transition-colors">Resume Builder</span>
               </Link>
               <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-200"
               >
                  <Home size={12} /> Home
               </Link>
            </div>
         </header>

         {/* ── Hero ── */}
         <section className="relative z-10 text-center py-20 md:py-28 px-6 border-b border-white/[0.04]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
               <span className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">Template Gallery</span>
               <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-5xl md:text-7xl font-normal text-white tracking-tight leading-[1.04] mb-5">
                  Choose Your
                  <br />
                  <span className="italic text-white/25">Template</span>
               </h1>
               <p className="text-sm font-mono text-white/30 max-w-xl mx-auto leading-relaxed">Professionally designed A4 templates. ATS-friendly. One-click PDF export.</p>
            </motion.div>
         </section>

         <main className="relative z-10 max-w-7xl mx-auto px-6 py-14">
            {/* ── Filters ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="flex flex-wrap gap-2 justify-center mb-12">
               {cats.map((c) => (
                  <button
                     key={c.id}
                     onClick={() => setFilter(c.id)}
                     className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-200 border ${
                        filter === c.id ? "bg-white text-black border-white" : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/60"
                     }`}
                  >
                     {c.label} <span className="opacity-40 ml-1">({c.count})</span>
                  </button>
               ))}
            </motion.div>

            {/* ── Grid ── */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
               <AnimatePresence mode="popLayout">
                  {filtered.map((tmpl, i) => {
                     const isSelected = selected === tmpl.id;
                     return (
                        <motion.div
                           key={tmpl.id}
                           layout
                           initial={{ opacity: 0, y: 24 }}
                           animate={inView ? { opacity: 1, y: 0 } : {}}
                           exit={{ opacity: 0, scale: 0.94 }}
                           transition={{ duration: 0.55, ease, delay: i * 0.06 }}
                           className={`group relative rounded-2xl border overflow-hidden transition-all duration-300
                    ${isSelected ? "border-white/25 bg-white/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05]"}`}
                        >
                           {/* Glow */}
                           <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                              style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 65%)" }}
                           />

                           {/* Header strip */}
                           <div className={`relative h-28 bg-gradient-to-br ${tmpl.color} flex items-center justify-center overflow-hidden`}>
                              {/* Abstract pattern */}
                              <div
                                 className="absolute inset-0 opacity-20"
                                 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                              />
                              <span className="relative text-4xl text-white/60 font-mono">{tmpl.emoji}</span>
                              {tmpl.popular && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">Popular</span>}
                           </div>

                           <div className="p-5">
                              {/* Fake preview */}
                              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 mb-4 space-y-2">
                                 <div className="h-1.5 bg-white/10 rounded-full w-1/2" />
                                 <div className="h-px bg-white/[0.04]" />
                                 <div className="h-1.5 bg-white/[0.07] rounded-full w-full" />
                                 <div className="h-1.5 bg-white/[0.07] rounded-full w-4/5" />
                                 <div className="flex gap-1.5 mt-1">
                                    <div className="h-3 bg-white/[0.05] rounded flex-1" />
                                    <div className="h-3 bg-white/[0.05] rounded flex-1" />
                                 </div>
                              </div>

                              <h3 className="text-sm font-semibold text-white/75 group-hover:text-white/90 transition-colors mb-1">{tmpl.name}</h3>
                              <p className="text-[11px] font-mono text-white/30 leading-relaxed mb-4">{tmpl.description}</p>

                              <div className="flex gap-2">
                                 <button
                                    onClick={() => setSelected(isSelected ? null : tmpl.id)}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-200 border ${
                                       isSelected ? "border-white/25 bg-white/[0.08] text-white/70" : "border-white/[0.08] bg-white/[0.03] text-white/35 hover:border-white/20 hover:text-white/55"
                                    }`}
                                 >
                                    {isSelected ? "Selected ✓" : "Preview"}
                                 </button>
                                 <Link
                                    href={`/resume-builder?template=${tmpl.id}`}
                                    className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-200"
                                 >
                                    Use Template
                                    <ArrowUpRight size={11} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                                 </Link>
                              </div>
                           </div>
                        </motion.div>
                     );
                  })}
               </AnimatePresence>
            </div>

            {/* ── CTA ── */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, ease }}
               className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 md:p-14 text-center mb-14 overflow-hidden backdrop-blur-sm"
            >
               <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
               <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-3xl md:text-5xl font-normal text-white mb-4">
                  Ready to build your resume?
               </h2>
               <p className="text-sm font-mono text-white/30 mb-8 max-w-lg mx-auto">Pick a template, fill in your details, and download a polished PDF in minutes.</p>
               <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/resume-builder" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200">
                     Start Building Now
                     <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                  <Link
                     href="/"
                     className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-medium hover:border-white/20 hover:text-white/70 transition-all duration-200"
                  >
                     Learn More
                  </Link>
               </div>
            </motion.div>

            {/* ── Features ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {features.map((f, i) => (
                  <motion.div
                     key={f.label}
                     initial={{ opacity: 0, y: 16 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.55, ease, delay: i * 0.07 }}
                     className="flex flex-col items-center text-center p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                  >
                     <CheckCircle size={16} className="text-white/20 mb-3" />
                     <p className="text-sm font-semibold text-white/60 mb-1">{f.label}</p>
                     <p className="text-[11px] font-mono text-white/25">{f.sub}</p>
                  </motion.div>
               ))}
            </div>
         </main>

         <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center">
            <p className="text-[11px] font-mono text-white/15">© {new Date().getFullYear()} Resume Builder</p>
         </footer>
      </div>
   );
}