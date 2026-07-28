"use client";

import { motion } from "framer-motion";

const Loading = () => {
   return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
         {/* Background decorative elements */}
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.8 }} className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bd9520]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
         </motion.div>

         {/* Main Loader Container */}
         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }} className="relative flex flex-col items-center justify-center gap-8">
            {/* Animated Logo/Icon */}
            <div className="relative w-24 h-24">
               {/* Outer rotating ring */}
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                     duration: 4,
                     repeat: Infinity,
                     ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#bd9520] border-r-[#bd9520]/60"
               />

               {/* Middle pulsing ring */}
               <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="absolute inset-2 rounded-full border border-[#bd9520]/30"
               />

               {/* Inner counter-rotating ring */}
               <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                     duration: 3,
                     repeat: Infinity,
                     ease: "linear",
                  }}
                  className="absolute inset-4 rounded-full border-2 border-transparent border-b-amber-600/60"
               />

               {/* Center pulsing dot */}
               <motion.div
                  animate={{
                     scale: [1, 1.3, 1],
                     opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                     duration: 1.5,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#bd9520] to-amber-600 shadow-lg shadow-[#bd9520]/50"
               />

               {/* Orbiting particles */}
               {[0, 120, 240].map((angle) => (
                  <motion.div
                     key={angle}
                     animate={{
                        rotate: 360,
                     }}
                     transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                     }}
                     style={{
                        originX: "50%",
                        originY: "50%",
                     }}
                     className="absolute inset-0"
                  >
                     <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#bd9520] opacity-60"
                        style={{
                           transform: `rotate(${angle}deg) translateY(-40px)`,
                        }}
                     />
                  </motion.div>
               ))}
            </div>

            {/* Loading Text with animated dots */}
            <div className="text-center space-y-3">
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Preparing your experience</span>
                  <div className="flex gap-1.5">
                     {[0, 1, 2].map((i) => (
                        <motion.span
                           key={i}
                           animate={{
                              y: [0, -8, 0],
                           }}
                           transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: "easeInOut",
                           }}
                           className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#bd9520] to-amber-600"
                        />
                     ))}
                  </div>
               </motion.div>

               {/* Loading progress text */}
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.4 }} className="text-xs text-gray-500 dark:text-gray-400">
                  Just a moment...
               </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
               initial={{ opacity: 0, width: 0 }}
               animate={{ opacity: 1, width: "200px" }}
               transition={{ delay: 0.3, duration: 0.6 }}
               className="h-1 bg-gradient-to-r from-transparent via-[#bd9520]/30 to-transparent rounded-full overflow-hidden"
            >
               <motion.div
                  animate={{
                     x: ["-100%", "100%"],
                  }}
                  transition={{
                     duration: 1.5,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="h-full bg-gradient-to-r from-[#bd9520] to-amber-600 w-1/3 rounded-full"
               />
            </motion.div>
         </motion.div>

         {/* Floating elements background */}
         <motion.div
            animate={{
               y: [0, -20, 0],
            }}
            transition={{
               duration: 4,
               repeat: Infinity,
               ease: "easeInOut",
            }}
            className="absolute bottom-20 left-10 w-20 h-20 rounded-3xl border border-[#bd9520]/10 opacity-30"
         />

         <motion.div
            animate={{
               y: [0, 20, 0],
            }}
            transition={{
               duration: 5,
               repeat: Infinity,
               ease: "easeInOut",
            }}
            className="absolute top-20 right-10 w-16 h-16 rounded-2xl border border-amber-600/10 opacity-30"
         />
      </div>
   );
};

export default Loading;
