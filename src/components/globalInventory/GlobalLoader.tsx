"use client";

import { useEffect, useState } from "react";

const ACCENT_FROM = "#bd9520";
const ACCENT_TO = "#f59e0b";
const FILL_DURATION = 1800;
const KICKER = "Portfolio";
const DISPLAY_NAME = "Tahmid";
const ROLE = "Full-Stack Developer";
const CAPTION = "Loading...";

export default function GlobalLoader() {
   const [started, setStarted] = useState(false);
   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updatePreference = () => {
         setPrefersReducedMotion(mediaQuery.matches);
         if (mediaQuery.matches) setStarted(true);
      };

      updatePreference();
      mediaQuery.addEventListener("change", updatePreference);
      const startRaf = window.requestAnimationFrame(() => setStarted(true));

      return () => {
         window.cancelAnimationFrame(startRaf);
         mediaQuery.removeEventListener("change", updatePreference);
      };
   }, []);

   return (
      <div
         role="status"
         aria-live="polite"
         aria-label="Loading"
         className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center"
         style={{
            zIndex: 100,
            background: "radial-gradient(circle at top, rgba(189, 149, 32, 0.2), transparent 35%), #06070a",
            color: "#f7f4ee",
         }}
      >
         <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
               backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
               backgroundSize: "34px 34px",
               maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
            }}
         />

         <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
               width: 340,
               height: 340,
               background: `radial-gradient(circle, ${ACCENT_FROM}33 0%, transparent 70%)`,
               filter: "blur(18px)",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
            }}
         />

         <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay">
            <defs>
               <filter id="loaderGrain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
               </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#loaderGrain)" />
         </svg>

         <span aria-hidden="true" className="absolute left-6 top-6 h-3 w-3 border-l border-t border-white/20" />
         <span aria-hidden="true" className="absolute right-6 top-6 h-3 w-3 border-r border-t border-white/20" />
         <span aria-hidden="true" className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-white/20" />
         <span aria-hidden="true" className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-white/20" />

         <div className="relative z-10 flex flex-col items-center gap-5">
            <span className="reveal-item font-mono text-[10px] uppercase tracking-[0.5em] text-white/40" style={{ animationDelay: "0ms" }}>
               {KICKER}
            </span>

            <h1 className="reveal-item whitespace-nowrap font-serif text-6xl leading-none tracking-tight sm:text-7xl" style={{ color: "#f7f4ee", animationDelay: "100ms" }}>
               {DISPLAY_NAME}
            </h1>

            <span className="reveal-item font-mono text-xs uppercase tracking-[0.35em]" style={{ color: ACCENT_FROM, animationDelay: "220ms" }}>
               {ROLE}
            </span>

            <div className="reveal-item mt-2 flex items-center gap-3" style={{ animationDelay: "360ms" }}>
               <span className="h-2 w-px bg-white/25" />
               <div className="relative h-px w-48 overflow-hidden bg-white/15 sm:w-56">
                  <div
                     className="absolute inset-y-0 left-0"
                     style={{
                        width: started ? "100%" : "0%",
                        transition: prefersReducedMotion ? "none" : `width ${FILL_DURATION}ms ease`,
                        background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                     }}
                  />
               </div>
               <span className="h-2 w-px bg-white/25" />
            </div>

            <div className="reveal-item flex items-center gap-3" style={{ animationDelay: "480ms" }}>
               <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border border-white/20 border-t-amber-400" />
               <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">{CAPTION}</span>
            </div>
         </div>

         <style jsx>{`
            @keyframes reveal {
               from {
                  opacity: 0;
                  transform: translateY(8px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
            .reveal-item {
               opacity: 0;
               animation: reveal 0.7s ease forwards;
            }
            @media (prefers-reduced-motion: reduce) {
               .reveal-item {
                  opacity: 1;
                  animation: none;
               }
            }
         `}</style>
      </div>
   );
}
