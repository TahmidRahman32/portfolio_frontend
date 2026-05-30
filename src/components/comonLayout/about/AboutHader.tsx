// "use client"; // Add this at the top

// import Image from "next/image";
// import { backOut, easeInOut, motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// // You can replace this with your actual background image
// // import aboutBg from "../../../public/about-bg.jpg";

// const AboutHeader = () => {
//    const [ref, inView] = useInView({
//       triggerOnce: true,
//       threshold: 0.1,
//    });

//    // Animation variants

//    const statsVariants = {
//       hidden: { opacity: 0, scale: 0.8 },
//       visible: {
//          opacity: 1,
//          scale: 1,
//          transition: {
//             duration: 0.6,
//             ease: backOut,
//          },
//       },
//    };

//    const floatingVariants = {
//       floating: {
//          y: [-10, 10, -10],
//          transition: {
//             duration: 4,
//             repeat: Infinity,
//             ease: easeInOut,
//          },
//       },
//    };

//    return (
//       <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="relative  my-3  flex items-center justify-center overflow-hidden">
//          {/* Background Image with Overlay - Using CSS background for demo */}
//          <div className="absolute inset-0 z-0">
//             {/* Using CSS background instead of Next.js Image for demo */}
//             <div
//                className="w-full h-full"
//                style={{
//                   backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%231e1b4b" width="1200" height="800"/><g fill="%2336368a" opacity="0.4"><circle cx="800" cy="400" r="200"/><circle cx="400" cy="600" r="150"/></g></svg>')`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                }}
//             />

//             {/* Dark Overlay for better text readability */}
//             <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

//             {/* Animated Gradient Overlay */}
//             <motion.div
//                className="absolute inset-0 bg-[#4b1614] dark:bg-[#4b1614]"
//                animate={{
//                   background: [
//                      "linear-gradient(45deg, rgba(30, 58, 138, 0.2) 0%, rgba(88, 28, 135, 0.3) 50%, rgba(190, 24, 93, 0.2) 100%)",
//                      "linear-gradient(135deg, rgba(190, 24, 93, 0.2) 0%, rgba(30, 58, 138, 0.2) 50%, rgba(88, 28, 135, 0.3) 100%)",
//                      "linear-gradient(225deg, rgba(88, 28, 135, 0.3) 0%, rgba(190, 24, 93, 0.2) 50%, rgba(30, 58, 138, 0.2) 100%)",
//                   ],
//                }}
//                transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                }}
//             />
//          </div>

//          {/* Main Content */}
//          <motion.div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
//             {/* Title Section */}
//             <motion.div className="mb-12">
//                <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
//                   About Me
//                </motion.h1>
//                <motion.div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-8" initial={{ width: 0 }} animate={inView ? { width: 96 } : { width: 0 }} transition={{ delay: 0.5, duration: 1 }} />
//                <motion.p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-200">
//                   Passionate Full Stack Developer crafting digital experiences that blend <span className="text-cyan-400 font-semibold">innovation</span> with <span className="text-purple-400 font-semibold">functionality</span>
//                </motion.p>
//             </motion.div>

//             {/* Stats Section */}
//             <motion.div className="md:grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto md:mb-16 hidden">
//                {[
//                   { number: "3+", label: "Years Experience" },
//                   { number: "50+", label: "Projects Completed" },
//                   { number: "100%", label: "Client Satisfaction" },
//                   { number: "24/7", label: "Code Enthusiast" },
//                ].map((stat, index) => (
//                   <motion.div
//                      key={stat.label}
//                      variants={statsVariants}
//                      whileHover={{
//                         scale: 1.1,
//                         y: -5,
//                         transition: { type: "spring", stiffness: 300 },
//                      }}
//                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl"
//                   >
//                      <motion.div variants={floatingVariants} animate="floating" className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
//                         {stat.number}
//                      </motion.div>
//                      <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
//                   </motion.div>
//                ))}
//             </motion.div>

//             {/* CTA Section */}
//             <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                <motion.button
//                   whileHover={{
//                      scale: 1.05,
//                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-gradient-to-r from-[#7e0d09] to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
//                >
//                   Download Resume
//                </motion.button>
//                <motion.button
//                   whileHover={{
//                      scale: 1.05,
//                      boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-full font-semibold backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300"
//                >
//                   View My Work
//                </motion.button>
//             </motion.div>

//             {/* Scroll Indicator */}
//             <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
//                   <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
//                </motion.div>
//             </motion.div>
//          </motion.div>

//          {/* Floating Elements */}
//          <motion.div variants={floatingVariants} animate="floating" className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60" />
//          <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 1 }} className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full opacity-40" />
//          <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 2 }} className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full opacity-50" />
//       </motion.section>
//    );
// };

// export default AboutHeader;

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
   initial: { opacity: 0, y: 24 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.75, ease, delay },
});

const stats = [
   { n: "3+", l: "Years Experience" },
   { n: "50+", l: "Projects Completed" },
   { n: "100%", l: "Client Satisfaction" },
   { n: "24/7", l: "Code Enthusiast" },
];

const AboutHeader = () => {
   const ref = useRef<HTMLElement>(null);
   const inView = useInView(ref, { once: true, margin: "-60px" });

   return (
      <motion.section ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06] ">
         {/* Noise */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />
         {/* Grid */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{
               backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
               backgroundSize: "60px 60px",
            }}
         />
         {/* Subtle top glow */}
         <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

         <div className="relative z-10 px-6 md:px-16 py-20 md:py-28 flex flex-col items-center text-center">
            {/* Badge */}
            <motion.span
               {...fadeUp(0)}
               animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
               className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
            >
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
               Full-Stack Developer
            </motion.span>

            {/* Heading */}
            <motion.h1
               initial={{ opacity: 0, y: 28 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, ease, delay: 0.08 }}
               style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
               className="text-5xl md:text-7xl font-normal text-white tracking-tight leading-[1.05] mb-6"
            >
               About <span className="italic text-white/30">Me</span>
            </motion.h1>

            {/* Animated underline */}
            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={inView ? { scaleX: 1, opacity: 1 } : {}} transition={{ duration: 0.9, ease, delay: 0.22 }} className="w-16 h-px bg-white/20 mb-8 origin-center" />

            {/* Sub-copy */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease, delay: 0.18 }} className="text-base md:text-lg font-mono text-white/35 max-w-2xl leading-relaxed mb-14">
               Passionate about crafting digital experiences that blend <span className="text-white/60">innovation</span> with <span className="text-white/60">functionality</span> — one component at a time.
            </motion.p>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease, delay: 0.28 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mb-14">
               {stats.map((s, i) => (
                  <motion.div
                     key={s.l}
                     initial={{ opacity: 0, y: 16 }}
                     animate={inView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.6, ease, delay: 0.32 + i * 0.07 }}
                     whileHover={{ y: -3, transition: { duration: 0.25 } }}
                     className="flex flex-col items-center gap-1 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05] transition-colors duration-300 cursor-default"
                  >
                     <span className="text-2xl md:text-3xl font-bold text-white/80 tracking-tight">{s.n}</span>
                     <span className="text-[11px] font-mono text-white/25 uppercase tracking-wider text-center">{s.l}</span>
                  </motion.div>
               ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay: 0.5 }} className="flex flex-col sm:flex-row gap-3">
               <a href="/resume.pdf" download className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black text-sm font-semibold tracking-tight hover:bg-white/90 transition-colors duration-200">
                  <Download size={15} />
                  Download Resume
               </a>
               <Link
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-all duration-200"
               >
                  View My Work
                  <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
               </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.6 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
               <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">Scroll</span>
               <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
         </div>
      </motion.section>
   );
};

export default AboutHeader;