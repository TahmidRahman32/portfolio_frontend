// "use client";
// import Image from "next/image";
// import { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import image1 from "../../../public/image/web-profile-Photoroom.png";

// import Box1 from "./container/Box1";

// // Register ScrollTrigger
// if (typeof window !== "undefined") {
//    gsap.registerPlugin(ScrollTrigger);
// }

// const HeroSection = () => {
//    const sectionRef = useRef<HTMLDivElement>(null);
//    const imageRef = useRef<HTMLDivElement>(null);
//    const glowRef = useRef<HTMLDivElement>(null);
//    const textRef = useRef<HTMLDivElement>(null);

//    useEffect(() => {
//       const ctx = gsap.context(() => {
//          // Section entrance animation
//          gsap.fromTo(
//             sectionRef.current,
//             { opacity: 0, y: 50 },
//             {
//                opacity: 1,
//                y: 0,
//                duration: 1,
//                scrollTrigger: {
//                   trigger: sectionRef.current,
//                   start: "top 80%",
//                   end: "bottom 20%",
//                   toggleActions: "play none none reverse",
//                },
//             }
//          );

//          // Image animation
//          gsap.fromTo(
//             imageRef.current,
//             { scale: 0.8, opacity: 0.9, rotation: -10 },
//             {
//                scale: 1,
//                opacity: 1,
//                rotation: 0,
//                duration: 1.2,
//                ease: "back.out(1.7)",
//                scrollTrigger: {
//                   trigger: imageRef.current,
//                   start: "top 80%",
//                   toggleActions: "play none none reverse",
//                },
//             }
//          );

//          // Glow pulse animation
//          gsap.to(glowRef.current, {
//             scale: 1.1,
//             opacity: 0.5,
//             duration: 2,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//          });

//          // Image hover effect
//          if (imageRef.current) {
//             imageRef.current.addEventListener("mouseenter", () => {
//                gsap.to(imageRef.current, {
//                   scale: 1.05,
//                   y: -12,
//                   rotation: -3,
//                   boxShadow: "0 0 40px #a3120d, 0 0 60px #a3120d40",
//                   duration: 0.3,
//                   ease: "power2.out",
//                });
//             });

//             imageRef.current.addEventListener("mouseleave", () => {
//                gsap.to(imageRef.current, {
//                   scale: 1,
//                   y: 0,
//                   rotation: 0,
//                   boxShadow: "0 0 25px #a3120d",
//                   duration: 0.3,
//                   ease: "power2.out",
//                });
//             });
//          }
//       });

//       return () => ctx.revert();
//    }, []);

//    return (
//       <div ref={sectionRef} className="container mx-auto justify-between items-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 p-4 bg-[#4b1614] dark:bg-[#4b1614] md:my-6 md:rounded-3xl ">
//          {/* Left Column - Box1 */}
//          <div className="flex flex-col justify-between">
//             <div className="transform transition-all duration-500 hover:scale-105">
//                <Box1 />
//             </div>
//          </div>

//          {/* Middle Column - Image and Text */}
//          <div className="flex flex-col items-center">
//             <div className="relative flex justify-center items-center md:h-[450px]">
//                {/* Glow Shadow */}
//                <div ref={glowRef} className="absolute w-[400px] lg:w-[480px] h-[300px] lg:h-[350px] rounded-full bg-[#a3120d]/30 blur-2xl scale-105" />

//                {/* Main Image */}
//                <div ref={imageRef} className="relative z-10 rounded-full border-2 border-[hsl(2,79%,36%)] shadow-[0_0_25px_#a3120d] w-[200px] lg:w-[350px] h-[200px] lg:h-[350px] overflow-hidden cursor-pointer">
//                   <Image src={image1} height={1000} width={1000} alt="Gaziur Rahman Tahmid - Full Stack Developer" className="object-cover w-[120%] h-[120%] scale-110" priority />
//                </div>
//             </div>

//             {/* Text Content */}
//             <div ref={textRef} className="text-center mt-1 font-serif lg:w-[450px]">
//                <h1 className="text-3xl font-bold text-white">Gaziur Rahman Tahmid</h1>
//                <h5 className="text-3xl font-primary-f font-bold font-primaryG bg-gradient-to-r from-[#511364] via-[#A08D6D] to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Full Stack</h5>
//                <p className="text-white">Developer</p>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default HeroSection;
"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import image1 from "../../../public/image/web-profile-Photoroom.png";
import image1 from "../../../../public/image/web-profile-Photoroom.png";

import Box1 from "./container/Box1";

const HeroSection = () => {
   const sectionRef = useRef<HTMLDivElement>(null);
   const imageRef = useRef<HTMLDivElement>(null);
   const nameRef = useRef<HTMLDivElement>(null);
   const lineRef = useRef<HTMLDivElement>(null);
   const tagRef = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
         // Staggered entrance
         gsap.fromTo([tagRef.current, nameRef.current, lineRef.current], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.2 });

         // Image entrance
         gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.1 });

         // Floating idle
         gsap.to(imageRef.current, {
            y: -10,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.2,
         });

         // Hover tilt
         if (imageRef.current) {
            imageRef.current.addEventListener("mouseenter", () => {
               gsap.to(imageRef.current, { scale: 1.04, duration: 0.35, ease: "power2.out" });
            });
            imageRef.current.addEventListener("mouseleave", () => {
               gsap.to(imageRef.current, { scale: 1, duration: 0.35, ease: "power2.out" });
            });
         }
      });
      return () => ctx.revert();
   }, []);

   return (
      <div ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06] ">
         {/* Noise texture overlay */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />

         {/* Faint radial glow top-right */}
         <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full z-0" style={{ background: "radial-gradient(circle, rgba(220,180,80,0.07) 0%, transparent 70%)" }} />

         {/* Grid lines */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{
               backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
               backgroundSize: "60px 60px",
            }}
         />

         <div className="relative mt-12 z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            {/* ── Left: Box1 ── */}
            <div className="flex flex-col justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
               <Box1 />
            </div>

            {/* ── Right: Photo + Name ── */}
            <div className="flex flex-col items-center justify-center p-8 md:p-12 gap-8">
               {/* Badge */}
               <span ref={tagRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for work
               </span>

               {/* Photo */}
               <div ref={imageRef} className="relative cursor-pointer" style={{ filter: "drop-shadow(0 0 40px rgba(220,180,80,0.12))" }}>
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.06]" />
                  {/* Dashed ring */}
                  <div
                     className="absolute inset-0 rounded-full scale-[1.14]"
                     style={{
                        border: "1px dashed rgba(255,255,255,0.06)",
                        animation: "spin 30s linear infinite",
                     }}
                  />
                  <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border border-white/10">
                     <Image src={image1} fill alt="Gaziur Rahman Tahmid – Full Stack Developer" className="object-cover scale-110" priority />
                  </div>
               </div>

               {/* Name block */}
               <div ref={nameRef} className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                     Gaziur Rahman Tahmid
                  </h1>

                  <div ref={lineRef} className="flex items-center justify-center gap-3">
                     <span className="h-px w-8 bg-white/20" />
                     <p className="text-sm font-mono tracking-[0.22em] uppercase text-white/40">Full-Stack Developer</p>
                     <span className="h-px w-8 bg-white/20" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
