// // components/AboutSection.jsx
// "use client";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import profilePic from "../../../public/image/portfolio-2-size.png";
// import {  Bitcoin, Link, Zap, Globe } from "lucide-react";
// import ChainCarousel, { ChainItem } from "./SkillCarousel";

// const AboutSection = () => {
//    const [animated, setAnimated] = useState(false);

//   useEffect(() => {
//      const id = requestAnimationFrame(() => setAnimated(true));
//      return () => cancelAnimationFrame(id);
//   }, []);

//    const skills = [
//       { name: "JavaScript", level: 90 },
//       { name: "React/Next.js", level: 85 },
//       { name: "TypeScript", level: 80 },
//       { name: "Node.js", level: 75 },
//       { name: "Tailwind CSS", level: 95 },
//       { name: "PostgresSQL", level: 70 },
//    ];

//    const funFacts = [
//       "I've visited 15 countries and love documenting my travels through photography",
//       "I'm a certified coffee enthusiast and can distinguish between 10+ coffee varieties",
//       "I once participated in a 48-hour hackathon and built a complete MVP alone",
//       "I'm learning to play the guitar and can play 5 songs (almost) perfectly",
//    ];

// const chainData: ChainItem[] = [
//    {
//       id: 1,
//       name: "Ethereum",
//       icon: Globe,
//       details: "Mainnet • 12.5M+ transactions",
//       logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", // Working alternative
//    },
//    {
//       id: 2,
//       name: "Bitcoin",
//       icon: Bitcoin,
//       details: "Layer 1 • Store of value",
//       logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", // Working alternative
//    },
//    {
//       id: 3,
//       name: "Polygon",
//       icon: Link,
//       details: "EVM compatible • Low fees",
//       logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png", // Working alternative
//    },
//    {
//       id: 4,
//       name: "Lightning Network",
//       icon: Zap,
//       details: "Bitcoin L2 • Instant payments",
//       // No logo - will use icon
//    },

// ];

//  const [currentFact, setCurrentFact] = useState(0);

// useEffect(() => {
//    const id = requestAnimationFrame(() => setAnimated(true));
//    return () => cancelAnimationFrame(id);
// }, []);

// useEffect(() => {
//    const interval = setInterval(() => {
//       setCurrentFact((prev) => (prev + 1) % funFacts.length);
//    }, 5000);
//    return () => clearInterval(interval);
// }, [funFacts.length]);

//    return (
//       <section id="about" className="py-16 px-4 rounded-2xl bg-[#4b1614] dark:bg-[#4b1614] my-16 container mx-auto  text-white">
//          <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">My Skills & Journey</h2>
//             <p className="text-center text-blue-200 mb-12 max-w-2xl mx-auto">Full Stack Developer passionate about creating digital experiences that make a difference</p>

//             <div className="flex flex-col lg:flex-row gap-12 items-center">
//                {/* Image Column */}
//                <div className="w-full lg:w-2/5 flex justify-center">
//                   <div className="relative">
//                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-lg glow floating ">
//                         <Image src={profilePic} height={1000} width={1000} alt="main Image" className="object-cover w-[120%] h-[120%] scale-110 z-60" />
//                      </div>
//                      <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
//                         <p className="text-sm font-bold">
//                            3+ Years
//                            <br />
//                            Experience
//                         </p>
//                      </div>
//                   </div>
//                </div>

//                {/* Text Column */}
//                <div className="w-full lg:w-3/5">
//                   {/* Bio */}
//                   <div className="mb-10">
//                      <h3 className="text-2xl font-bold mb-4 text-white border-b border-blue-400 pb-2">My Journey</h3>
//                      <div className="space-y-4 text-slate-200">
//                         <p>
//                            I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that blend elegant design with robust functionality. My journey began with a computer science degree and has evolved through
//                            working with startups and established companies alike.
//                         </p>
//                         <p>
//                            I specialize in creating responsive web applications using modern technologies like React, Next.js, Node.js, and cloud platforms. I believe in writing clean, maintainable code and following best practices to deliver
//                            high-quality products that exceed client expectations.
//                         </p>
//                         <p>
//                            When I'm not coding, you can find me contributing to open-source projects, exploring new technologies, or mentoring aspiring developers. I'm always excited to take on new challenges and collaborate on innovative projects.
//                         </p>
//                      </div>
//                   </div>

//                   {/* Skills */}
//                   <div className="mb-10">
//                      <h3 className="text-2xl font-bold mb-6 text-white border-b border-blue-400 pb-2">Skills & Expertise</h3>
//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {skills.map((skill, index) => (
//                            <div key={skill.name} className="mb-2">
//                               <div className="flex justify-between mb-1">
//                                  <span className="font-medium text-slate-200">{skill.name}</span>
//                                  <span className="text-sm text-blue-300">{skill.level}%</span>
//                               </div>
//                               <div className="w-full bg-slate-700 rounded-full h-2.5">
//                                  <div
//                                     className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full skill-bar"
//                                     style={{
//                                        width: animated ? `${skill.level}%` : "0%",
//                                        transition: `width 1s ease-in-out ${index * 0.1}s`,
//                                     }}
//                                  ></div>
//                               </div>
//                            </div>
//                         ))}
//                      </div>
//                   </div>

//                   {/* Fun Fact */}
//                   {/* <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
//                      <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
//                         <span className="text-yellow-400 mr-2">✨</span>
//                         Fun Fact
//                      </h3>
//                      <div className="min-h-[60px] flex items-center">
//                         <p className="text-slate-200 italic transition-opacity duration-500">{funFacts[currentFact]}</p>
//                      </div>
//                      <div className="flex justify-center mt-4 space-x-1">
//                         {funFacts.map((_, index) => (
//                            <button key={index} onClick={() => setCurrentFact(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentFact ? "bg-blue-500" : "bg-slate-600"}`} />
//                         ))}
//                         <ChainCarousel items={chainData} />
//                      </div>
//                   </div> */}

//                   <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
//                      <h3 className="text-2xl font-bold mb-4 text-white flex justify-center items-center">
//                         <span className="text-yellow-400 mr-2">✨</span>
//                         Fun Fact
//                      </h3>
//                      {/* <div className="min-h-[60px] flex items-center">
//                         <p className="text-slate-200 italic transition-opacity duration-500">{funFacts[currentFact]}</p>
//                      </div> */}
//                      {/* <div className="flex justify-center mt-4 space-x-1">
//                         {funFacts.map((_, index) => (
//                            <button key={index} onClick={() => setCurrentFact(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentFact ? "bg-blue-500" : "bg-slate-600"}`} />
//                         ))}
//                      </div> */}
//                      {/* Add the ChainCarousel here */}
//                      <ChainCarousel items={chainData} className="mt-4" />
//                   </div>
//                </div>
//             </div>
//          </div>

//          <style jsx>{`
//             .glow {
//                box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
//             }
//             .floating {
//                animation: floating 3s ease-in-out infinite;
//             }
//             @keyframes floating {
//                0% {
//                   transform: translate(0, 0px);
//                }
//                50% {
//                   transform: translate(0, -10px);
//                }
//                100% {
//                   transform: translate(0, 0px);
//                }
//             }
//          `}</style>
//       </section>
//    );
// };

// export default AboutSection;

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import profilePic from "../../../../public/image/portfolio-2-size.png";
import { Bitcoin, Link, Zap, Globe } from "lucide-react";
import ChainCarousel, { ChainItem } from "./SkillCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Data ───────────────────────────────────────────────────────────────────────
const skills = [
   { name: "JavaScript", level: 90 },
   { name: "React / Next.js", level: 85 },
   { name: "TypeScript", level: 80 },
   { name: "Node.js", level: 75 },
   { name: "Tailwind CSS", level: 95 },
   { name: "PostgreSQL", level: 70 },
];

const chainData: ChainItem[] = [
   { id: 1, name: "Ethereum", icon: Globe, details: "Mainnet · 12.5M+ transactions", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
   { id: 2, name: "Bitcoin", icon: Bitcoin, details: "Layer 1 · Store of value", logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
   { id: 3, name: "Polygon", icon: Link, details: "EVM compatible · Low fees", logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png" },
   { id: 4, name: "Lightning Network", icon: Zap, details: "Bitcoin L2 · Instant payments" },
];

const bio = [
   "I'm a full-stack developer with 3+ years of experience building digital products that balance clean design with solid engineering. My work spans React, Next.js, Node.js, and PostgreSQL — from pixel-perfect UIs to robust backend APIs.",
   "I specialise in responsive web applications, authentication systems, and real-time payment integrations. I care about code that is readable, maintainable, and scalable — not just code that ships.",
   "Outside of work, I contribute to open-source, explore emerging web technologies, and occasionally mentor junior developers breaking into the field.",
];

// ── Skill Bar ──────────────────────────────────────────────────────────────────
const SkillBar = ({ name, level, index, inView }: { name: string; level: number; index: number; inView: boolean }) => (
   <div className="group">
      <div className="flex justify-between items-baseline mb-2">
         <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">{name}</span>
         <span className="text-[11px] font-mono text-white/25">{level}%</span>
      </div>
      <div className="h-px w-full bg-white/[0.07] rounded-full overflow-hidden">
         <motion.div className="h-full bg-white/30 rounded-full" initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : { width: 0 }} transition={{ duration: 1.1, ease, delay: 0.3 + index * 0.08 }} />
      </div>
   </div>
);

// ── Component ──────────────────────────────────────────────────────────────────
const AboutSection = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const skillsRef = useRef<HTMLDivElement>(null);
   const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });
   const skillsInView = useInView(skillsRef, { once: true, margin: "-40px" });

   const fadeUp = (delay = 0) => ({
      initial: { opacity: 0, y: 22 },
      animate: sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
      transition: { duration: 0.75, ease, delay },
   });

   return (
      <section ref={sectionRef} id="about" className="relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06]">
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

         <div className="relative z-10 px-6 md:px-12 py-16 md:py-20">
            {/* ── Section header ── */}
            <div className="text-center mb-14">
               <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                  Skills & Journey
               </motion.span>
               <motion.h2 {...fadeUp(0.08)} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-4">
                  Built from <span className="italic text-white/30">curiosity</span>
               </motion.h2>
               <motion.p {...fadeUp(0.16)} className="text-sm font-mono text-white/30 max-w-xl mx-auto leading-relaxed">
                  Full-Stack Developer passionate about creating digital experiences that make a difference
               </motion.p>
            </div>

            {/* ── Main grid ── */}
            <div className="flex flex-col lg:flex-row gap-10 items-start max-w-5xl mx-auto">
               {/* ── Left: Photo ── */}
               <motion.div initial={{ opacity: 0, x: -24 }} animate={sectionInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease, delay: 0.1 }} className="w-full lg:w-2/5 flex justify-center lg:justify-start">
                  <div className="relative">
                     {/* Floating idle */}
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10">
                           <Image src={profilePic} fill alt="Gaziur Rahman Tahmid" className="object-cover scale-110" />
                           {/* Inner gradient overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                        </div>
                     </motion.div>

                     {/* Badge */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, ease, delay: 0.45 }}
                        className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl border border-white/10 bg-[#111] text-center"
                     >
                        <p className="text-base font-bold text-white/80 leading-tight">3+</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Years exp.</p>
                     </motion.div>
                  </div>
               </motion.div>

               {/* ── Right: Content ── */}
               <div className="w-full lg:w-3/5 space-y-10">
                  {/* Bio */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={sectionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease, delay: 0.2 }}>
                     <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">My Journey</span>
                        <div className="flex-1 h-px bg-white/[0.07]" />
                     </div>
                     <div className="space-y-4">
                        {bio.map((p, i) => (
                           <motion.p
                              key={i}
                              initial={{ opacity: 0, y: 14 }}
                              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.65, ease, delay: 0.26 + i * 0.09 }}
                              className="text-sm font-mono text-white/40 leading-relaxed"
                           >
                              {p}
                           </motion.p>
                        ))}
                     </div>
                  </motion.div>

                  {/* Skills */}
                  <div ref={skillsRef}>
                     <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">Skills & Expertise</span>
                        <div className="flex-1 h-px bg-white/[0.07]" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                        {skills.map((skill, i) => (
                           <SkillBar key={skill.name} {...skill} index={i} inView={skillsInView} />
                        ))}
                     </div>
                  </div>

                  {/* Chain Carousel */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={sectionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease, delay: 0.55 }} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">Ecosystem</span>
                        <div className="flex-1 h-px bg-white/[0.07]" />
                     </div>
                     <ChainCarousel items={chainData} />
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AboutSection;