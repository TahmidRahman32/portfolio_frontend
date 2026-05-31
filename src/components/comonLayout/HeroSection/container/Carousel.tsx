// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { LucideIcon, TrendingUp, Search, X, Sparkles, Zap, ArrowRight, ArrowLeft } from "lucide-react";

// // NOTE: Placeholder for your custom Input component
// const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

// // --- Core Data Interface ---
// export interface ChainItem {
//    id: string | number;
//    name: string;
//    icon: LucideIcon;
//    details?: string;
//    logo?: string;
//    gradient?: string; // Optional gradient for background
// }

// // --- Internal Animated Type ---
// type AnimatedChainItem = ChainItem & {
//    distanceFromCenter: number;
//    originalIndex: number;
// };

// // --- Component Props Interfaces ---
// interface CarouselItemProps {
//    chain: AnimatedChainItem;
//    side: "left" | "right";
//    isActive: boolean;
// }

// interface ChainCarouselProps {
//    items: ChainItem[];
//    scrollSpeedMs?: number;
//    visibleItemCount?: number;
//    className?: string;
//    onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
// }

// // --- Modern Carousel Item Component ---
// const ModernCarouselItem: React.FC<CarouselItemProps> = ({ chain, side, isActive }) => {
//    const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
//    const distance = Math.abs(distanceFromCenter);

//    // Enhanced visual effects
//    const opacity = 1 - distance / 3;
//    const scale = 1 - distance * 0.15;
//    const yOffset = distanceFromCenter * 60;
//    const xOffset = side === "left" ? -distance * 40 : distance * 40;
//    const blur = distance * 2;
//    const zIndex = 100 - distance;

//    return (
//       <motion.div
//          className={`absolute flex items-center gap-4 backdrop-blur-sm border
//             ${isActive ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/40 shadow-lg shadow-blue-500/20" : "bg-white/5 border-white/10"}
//             rounded-2xl px-6 py-4 transition-all duration-300
//             ${side === "left" ? "flex-row-reverse" : "flex-row"}`}
//          animate={{
//             opacity,
//             scale,
//             y: yOffset,
//             x: xOffset,
//             filter: `blur(${blur}px)`,
//          }}
//          style={{ zIndex }}
//          transition={{
//             duration: 0.5,
//             ease: [0.25, 0.1, 0.25, 1],
//          }}
//          whileHover={{
//             scale: scale * 1.05,
//             y: yOffset - 5,
//             transition: { duration: 0.2 },
//          }}
//       >
//          {/* Icon/Logo Container */}
//          <div className={`relative ${isActive ? "scale-110" : "scale-100"} transition-transform duration-300`}>
//             <div className={`rounded-2xl p-3 ${isActive ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30" : "bg-gray-800/60 border border-white/10"}`}>
//                {logo ? <img src={logo} alt={`${name} logo`} className="size-8 rounded-lg object-cover" /> : <FallbackIcon className={`size-8 ${isActive ? "text-white" : "text-gray-300"}`} />}
//             </div>

//             {/* Active indicator */}
//             {isActive && (
//                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -top-1 -right-1">
//                   <Sparkles className="size-4 text-yellow-400 fill-yellow-400" />
//                </motion.div>
//             )}
//          </div>

//          {/* Text Content */}
//          <div className={`flex flex-col mx-2 ${side === "left" ? "text-right" : "text-left"}`}>
//             <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-200"} whitespace-nowrap`}>{name}</span>
//             <span className={`text-xs transition-colors duration-300 ${isActive ? "text-blue-200" : "text-gray-400"}`}>{details}</span>
//          </div>

//          {/* Active arrow indicator */}
//          {isActive && (
//             <motion.div initial={{ opacity: 0, x: side === "left" ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} className={`absolute ${side === "left" ? "left-2" : "right-2"} -bottom-6`}>
//                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-400" />
//             </motion.div>
//          )}
//       </motion.div>
//    );
// };

// // --- Main Modernized Component ---
// const ModernChainCarousel: React.FC<ChainCarouselProps> = ({ items, scrollSpeedMs = 2000, visibleItemCount = 7, className = "", onChainSelect }) => {
//    const [currentIndex, setCurrentIndex] = useState(0);
//    const [isPaused, setIsPaused] = useState(false);
//    const [searchTerm, setSearchTerm] = useState("");
//    const [showDropdown, setShowDropdown] = useState(false);
//    const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

//    const rightSectionRef = useRef<HTMLDivElement>(null);
//    const isInView = useInView(rightSectionRef, { margin: "-100px 0px -100px 0px" });
//    const totalItems = items.length;

//    // Enhanced auto-scroll with direction tracking
//    useEffect(() => {
//       if (isPaused || totalItems === 0) return;

//       const interval = setInterval(() => {
//          setDirection(1);
//          setCurrentIndex((prev) => (prev + 1) % totalItems);
//       }, scrollSpeedMs);

//       return () => clearInterval(interval);
//    }, [isPaused, totalItems, scrollSpeedMs]);

//    // Scroll listener with enhanced pause duration
//    useEffect(() => {
//       let timeoutId: NodeJS.Timeout;
//       const handleScroll = () => {
//          setIsPaused(true);
//          clearTimeout(timeoutId);
//          timeoutId = setTimeout(() => {
//             setIsPaused(false);
//          }, 600);
//       };

//       window.addEventListener("scroll", handleScroll, { passive: true });
//       return () => {
//          window.removeEventListener("scroll", handleScroll);
//          clearTimeout(timeoutId);
//       };
//    }, []);

//    // Manual navigation
//    const navigate = (dir: -1 | 1) => {
//       setDirection(dir);
//       setCurrentIndex((prev) => {
//          if (dir === 1) return (prev + 1) % totalItems;
//          return prev === 0 ? totalItems - 1 : prev - 1;
//       });
//       setIsPaused(true);
//       setTimeout(() => setIsPaused(false), 3000);
//    };

//    // Memoized function for carousel items
//    const getVisibleItems = useCallback((): AnimatedChainItem[] => {
//       const visibleItems: AnimatedChainItem[] = [];
//       if (totalItems === 0) return [];

//       const itemsToShow = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
//       const half = Math.floor(itemsToShow / 2);

//       for (let i = -half; i <= half; i++) {
//          let index = currentIndex + i;
//          if (index < 0) index += totalItems;
//          if (index >= totalItems) index -= totalItems;

//          visibleItems.push({
//             ...items[index],
//             originalIndex: index,
//             distanceFromCenter: i,
//          });
//       }
//       return visibleItems;
//    }, [currentIndex, items, totalItems, visibleItemCount]);

//    // Filtered list for search dropdown
//    const filteredItems = useMemo(() => {
//       return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
//    }, [items, searchTerm]);

//    // Handler for selecting an item from the dropdown
//    const handleSelectChain = (id: ChainItem["id"], name: string) => {
//       const index = items.findIndex((c) => c.id === id);
//       if (index !== -1) {
//          setDirection(index > currentIndex ? 1 : -1);
//          setCurrentIndex(index);
//          setIsPaused(true);
//          if (onChainSelect) {
//             onChainSelect(id, name);
//          }
//       }
//       setSearchTerm(name);
//       setShowDropdown(false);
//    };

//    const currentItem = items[currentIndex];

//    return (
//       <div id="explore-section" className={`relative  overflow-hidden ${className}`}>
//          {/* Animated Background */}
//          <div className="absolute inset-0 md:my-4 container mx-auto md:rounded-2xl bg-[#4b1614] dark:bg-[#4b1614] mt-1 md:mt-0">
//             {/* Animated particles/background elements */}
//             <div className="absolute inset-0">
//                <motion.div
//                   animate={{
//                      scale: [1, 1.2, 1],
//                      opacity: [0.1, 0.3, 0.1],
//                   }}
//                   transition={{
//                      duration: 8,
//                      repeat: Infinity,
//                      ease: "easeInOut",
//                   }}
//                   className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
//                />
//                <motion.div
//                   animate={{
//                      scale: [1.2, 1, 1.2],
//                      opacity: [0.15, 0.25, 0.15],
//                   }}
//                   transition={{
//                      duration: 6,
//                      repeat: Infinity,
//                      ease: "easeInOut",
//                      delay: 2,
//                   }}
//                   className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
//                />
//                <motion.div
//                   animate={{
//                      scale: [1, 1.1, 1],
//                      opacity: [0.1, 0.2, 0.1],
//                   }}
//                   transition={{
//                      duration: 7,
//                      repeat: Infinity,
//                      ease: "easeInOut",
//                      delay: 4,
//                   }}
//                   className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
//                />
//             </div>
//          </div>

//          <div className="relative z-10 py-20">
//             <div className="flex flex-col xl:flex-row container mx-auto px-4 md:px-8 gap-12 justify-center items-center">
//                {/* Left Carousel Section */}
//                <motion.div
//                   className="relative w-full max-w-md xl:max-w-2xl h-[500px] flex items-center justify-center hidden xl:flex"
//                   onMouseEnter={() => !searchTerm && setIsPaused(true)}
//                   onMouseLeave={() => !searchTerm && setIsPaused(false)}
//                   initial={{ x: -100, opacity: 0 }}
//                   animate={isInView ? { x: 0, opacity: 1 } : {}}
//                   transition={{
//                      type: "spring",
//                      stiffness: 60,
//                      damping: 20,
//                      duration: 0.8,
//                   }}
//                >
//                   {/* Gradient overlays */}
//                   <div className="absolute inset-0 z-10 pointer-events-none">
//                      <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-slate-900 to-transparent" />
//                      <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-slate-900 to-transparent" />
//                   </div>

//                   {getVisibleItems().map((chain) => (
//                      <ModernCarouselItem key={`left-${chain.id}`} chain={chain} side="left" isActive={chain.distanceFromCenter === 0} />
//                   ))}
//                </motion.div>

//                {/* Center Content Section */}
//                <motion.div initial={{ y: 50, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.7 }} className="flex flex-col text-center items-center gap-8 max-w-2xl">
//                   {/* Header */}
//                   <div className="space-y-4">
//                      <motion.h2 initial={{ scale: 0.9, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white">
//                         Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ecosystems</span>
//                      </motion.h2>
//                      <motion.p initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.6 }} className="text-xl text-gray-300 max-w-lg">
//                         Discover and connect with various blockchain networks and platforms
//                      </motion.p>
//                   </div>

//                   {/* Current Item Display */}
//                   <AnimatePresence mode="wait">
//                      {currentItem && (
//                         <motion.div
//                            key={currentItem.id}
//                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
//                            animate={{ scale: 1, opacity: 1, y: 0 }}
//                            exit={{ scale: 0.8, opacity: 0, y: -20 }}
//                            transition={{ duration: 0.5 }}
//                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-md w-full"
//                         >
//                            <div className="flex flex-col items-center gap-4">
//                               <div className="relative">
//                                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
//                                     {currentItem.logo ? <img src={currentItem.logo} alt={`${currentItem.name} logo`} className="size-16 rounded-xl object-cover" /> : <currentItem.icon className="size-16 text-white" />}
//                                  </div>
//                                  <motion.div
//                                     animate={{
//                                        rotate: [0, 360],
//                                     }}
//                                     transition={{
//                                        duration: 20,
//                                        repeat: Infinity,
//                                        ease: "linear",
//                                     }}
//                                     className="absolute -inset-2 border-2 border-blue-400/30 rounded-2xl"
//                                  />
//                               </div>

//                               <div className="text-center space-y-2">
//                                  <h3 className="text-2xl font-bold text-white">{currentItem.name}</h3>
//                                  <p className="text-gray-300">{currentItem.details}</p>
//                               </div>

//                               {/* Navigation Controls */}
//                               <div className="flex gap-4 mt-4">
//                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(-1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
//                                     <ArrowLeft className="size-5 text-white" />
//                                  </motion.button>

//                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
//                                     <ArrowRight className="size-5 text-white" />
//                                  </motion.button>
//                               </div>
//                            </div>
//                         </motion.div>
//                      )}
//                   </AnimatePresence>

//                   {/* Enhanced Search Bar */}
//                   <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.9, duration: 0.6 }} className="relative max-w-lg w-full">
//                      <div className="relative">
//                         <Input
//                            type="text"
//                            value={searchTerm}
//                            placeholder="Search ecosystems..."
//                            onChange={(e) => {
//                               const val = e.target.value;
//                               setSearchTerm(val);
//                               setShowDropdown(val.length > 0);
//                               if (val === "") setIsPaused(false);
//                            }}
//                            onFocus={() => {
//                               if (searchTerm.length > 0) setShowDropdown(true);
//                               setIsPaused(true);
//                            }}
//                            onBlur={() => {
//                               setTimeout(() => setShowDropdown(false), 200);
//                            }}
//                            className="w-full outline-none text-white bg-white/10 backdrop-blur-lg
//                               placeholder-gray-400 text-lg rounded-2xl border border-white/20
//                               pr-12 pl-12 py-4 cursor-pointer transition-all duration-300
//                               hover:border-white/30 focus:border-blue-400 focus:bg-white/15"
//                         />
//                         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
//                         {searchTerm && (
//                            <button
//                               onClick={() => {
//                                  setSearchTerm("");
//                                  setShowDropdown(false);
//                                  setIsPaused(false);
//                               }}
//                               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                            >
//                               <X className="size-5" />
//                            </button>
//                         )}
//                      </div>

//                      {/* Enhanced Dropdown */}
//                      <AnimatePresence>
//                         {showDropdown && filteredItems.length > 0 && (
//                            <motion.div
//                               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                               animate={{ opacity: 1, y: 0, scale: 1 }}
//                               exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                               className="absolute left-0 right-0 mt-3 bg-white/10 backdrop-blur-lg
//                                  rounded-2xl border border-white/20 z-20 max-h-80 overflow-y-auto
//                                  shadow-2xl"
//                            >
//                               {filteredItems.slice(0, 8).map((chain, index) => (
//                                  <motion.div
//                                     key={chain.id}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                     onMouseDown={(e) => {
//                                        e.preventDefault();
//                                        handleSelectChain(chain.id, chain.name);
//                                     }}
//                                     className="flex items-center gap-3 px-4 py-4 cursor-pointer
//                                        hover:bg-white/10 transition-all duration-200 m-2 rounded-xl"
//                                  >
//                                     <div className="p-2 bg-white/10 rounded-lg">{chain.logo ? <img src={chain.logo} alt={`${chain.name} logo`} className="size-6 rounded object-cover" /> : <chain.icon size={20} className="text-blue-400" />}</div>
//                                     <div className="flex-1">
//                                        <span className="text-white font-medium">{chain.name}</span>
//                                        <span className="block text-sm text-gray-400">{chain.details}</span>
//                                     </div>
//                                     <Zap className="size-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                  </motion.div>
//                               ))}
//                            </motion.div>
//                         )}
//                      </AnimatePresence>
//                   </motion.div>
//                </motion.div>

//                {/* Right Carousel Section */}
//                <motion.div
//                   ref={rightSectionRef}
//                   className="relative w-full max-w-md xl:max-w-2xl h-[500px] flex items-center justify-center"
//                   onMouseEnter={() => !searchTerm && setIsPaused(true)}
//                   onMouseLeave={() => !searchTerm && setIsPaused(false)}
//                   initial={{ x: 100, opacity: 0 }}
//                   animate={isInView ? { x: 0, opacity: 1 } : {}}
//                   transition={{
//                      type: "spring",
//                      stiffness: 60,
//                      damping: 20,
//                      duration: 0.8,
//                   }}
//                >
//                   {/* Gradient overlays */}
//                   <div className="absolute inset-0 z-10 pointer-events-none">
//                      <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-slate-900 to-transparent" />
//                      <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-slate-900 to-transparent" />
//                   </div>

//                   {getVisibleItems().map((chain) => (
//                      <ModernCarouselItem key={`right-${chain.id}`} chain={chain} side="right" isActive={chain.distanceFromCenter === 0} />
//                   ))}
//                </motion.div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default ModernChainCarousel;

"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LucideIcon, Search, X, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
export interface ChainItem {
   id: string | number;
   name: string;
   icon: LucideIcon;
   details?: string;
   logo?: string;
}

type AnimatedChainItem = ChainItem & {
   distanceFromCenter: number;
   originalIndex: number;
};

interface CarouselItemProps {
   chain: AnimatedChainItem;
   side: "left" | "right";
   isActive: boolean;
}

interface ChainCarouselProps {
   items: ChainItem[];
   scrollSpeedMs?: number;
   visibleItemCount?: number;
   className?: string;
   onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

// ── Carousel Item ──────────────────────────────────────────────────────────────
const CarouselItem: React.FC<CarouselItemProps> = ({ chain, side, isActive }) => {
   const { distanceFromCenter, name, details, logo, icon: FallbackIcon } = chain;
   const dist = Math.abs(distanceFromCenter);
   const opacity = Math.max(0, 1 - dist * 0.32);
   const scale = 1 - dist * 0.1;
   const yOffset = distanceFromCenter * 56;
   const blur = dist > 1 ? (dist - 1) * 1.5 : 0;

   return (
      <motion.div
         className={`absolute flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors duration-300 ${
            isActive ? "bg-white/[0.07] border-white/20" : "bg-white/[0.02] border-white/[0.06]"
         } ${side === "left" ? "flex-row-reverse text-right" : "flex-row text-left"}`}
         animate={{
            opacity,
            scale,
            y: yOffset,
            filter: `blur(${blur}px)`,
            zIndex: 100 - dist,
         }}
         transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
         {/* Icon */}
         <div className={`flex-none w-9 h-9 rounded-lg flex items-center justify-center border ${isActive ? "border-white/20 bg-white/[0.08]" : "border-white/[0.07] bg-white/[0.03]"}`}>
            {logo ? <img src={logo} alt={name} className="w-5 h-5 rounded object-cover" /> : <FallbackIcon size={16} className={isActive ? "text-white/80" : "text-white/30"} />}
         </div>

         {/* Text */}
         <div className="flex flex-col min-w-0">
            <span className={`text-sm font-medium truncate ${isActive ? "text-white/90" : "text-white/40"}`}>{name}</span>
            {details && <span className={`text-[11px] font-mono truncate ${isActive ? "text-white/35" : "text-white/20"}`}>{details}</span>}
         </div>

         {/* Active dot */}
         {isActive && <span className={`flex-none w-1.5 h-1.5 rounded-full bg-white/50 ${side === "right" ? "order-first" : ""}`} />}
      </motion.div>
   );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const ModernChainCarousel: React.FC<ChainCarouselProps> = ({ items, scrollSpeedMs = 2200, visibleItemCount = 7, className = "", onChainSelect }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);

   const rightRef = useRef<HTMLDivElement>(null);
   const inView = useInView(rightRef, { margin: "-80px 0px -80px 0px" });
   const total = items.length;

   // Auto-scroll
   useEffect(() => {
      if (isPaused || total === 0) return;
      const id = setInterval(() => {
         setCurrentIndex((p) => (p + 1) % total);
      }, scrollSpeedMs);
      return () => clearInterval(id);
   }, [isPaused, total, scrollSpeedMs]);

   // Pause on scroll
   useEffect(() => {
      let t: ReturnType<typeof setTimeout>;
      const onScroll = () => {
         setIsPaused(true);
         clearTimeout(t);
         t = setTimeout(() => setIsPaused(false), 700);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
         window.removeEventListener("scroll", onScroll);
         clearTimeout(t);
      };
   }, []);

   const navigate = (dir: -1 | 1) => {
      setCurrentIndex((p) => (dir === 1 ? (p + 1) % total : p === 0 ? total - 1 : p - 1));
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
   };

   const getVisibleItems = useCallback((): AnimatedChainItem[] => {
      if (total === 0) return [];
      const count = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
      const half = Math.floor(count / 2);
      const result: AnimatedChainItem[] = [];
      for (let i = -half; i <= half; i++) {
         let idx = currentIndex + i;
         if (idx < 0) idx += total;
         if (idx >= total) idx -= total;
         result.push({ ...items[idx], originalIndex: idx, distanceFromCenter: i });
      }
      return result;
   }, [currentIndex, items, total, visibleItemCount]);

   const filteredItems = useMemo(() => items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())), [items, searchTerm]);

   const handleSelect = (id: ChainItem["id"], name: string) => {
      const idx = items.findIndex((c) => c.id === id);
      if (idx !== -1) {
         setCurrentIndex(idx);
         setIsPaused(true);
         onChainSelect?.(id, name);
      }
      setSearchTerm(name);
      setShowDropdown(false);
   };

   const current = items[currentIndex];

   return (
      <div className={`relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06]  ${className}`}>
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
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
         />

         <div className="relative z-10 py-3 md:py-16 px-4 md:px-8">
            {/* Header */}
            <motion.div initial={{ opacity: 1, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }} className="text-center mb-12">
               <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">Ecosystem Explorer</span>
               <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3">
                  Explore Ecosystems
               </h2>
               <p className="text-sm font-mono text-white/30 max-w-md mx-auto">Discover and connect with blockchain networks and platforms</p>
            </motion.div>

            {/* Three-column layout */}
            <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
               {/* Left carousel */}
               <div className="hidden xl:flex relative w-64 h-[420px] items-center justify-center flex-none" onMouseEnter={() => !searchTerm && setIsPaused(true)} onMouseLeave={() => !searchTerm && setIsPaused(false)}>
                  <div className="absolute inset-0 z-10 pointer-events-none">
                     <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-[#0A0A0A] to-transparent" />
                     <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  </div>
                  {getVisibleItems().map((chain) => (
                     <CarouselItem key={`l-${chain.id}`} chain={chain} side="left" isActive={chain.distanceFromCenter === 0} />
                  ))}
               </div>

               {/* Center panel */}
               <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                  {/* Current item card */}
                  <AnimatePresence mode="wait">
                     {current && (
                        <motion.div
                           key={current.id}
                           initial={{ opacity: 0, scale: 0.94, y: 10 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.94, y: -10 }}
                           transition={{ duration: 0.35, ease }}
                           className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center"
                        >
                           <div className="inline-flex w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.05] items-center justify-center mb-4">
                              {current.logo ? <img src={current.logo} alt={current.name} className="w-9 h-9 rounded-lg object-cover" /> : <current.icon size={28} className="text-white/60" />}
                           </div>
                           <h3 className="text-lg font-semibold text-white/90 mb-1">{current.name}</h3>
                           {current.details && <p className="text-sm font-mono text-white/30">{current.details}</p>}

                           {/* Nav */}
                           <div className="flex items-center justify-center gap-3 mt-6">
                              <button
                                 onClick={() => navigate(-1)}
                                 className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                              >
                                 <ArrowLeft size={15} />
                              </button>

                              {/* Progress dots */}
                              <div className="flex gap-1.5">
                                 {items.slice(0, Math.min(items.length, 8)).map((_, i) => (
                                    <button
                                       key={i}
                                       onClick={() => {
                                          setCurrentIndex(i);
                                          setIsPaused(true);
                                       }}
                                       className={`rounded-full transition-all duration-300 ${i === currentIndex % Math.min(items.length, 8) ? "w-4 h-1.5 bg-white/60" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"}`}
                                    />
                                 ))}
                              </div>

                              <button
                                 onClick={() => navigate(1)}
                                 className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                              >
                                 <ArrowRight size={15} />
                              </button>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* Search */}
                  <div className="relative w-full">
                     <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                     <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search ecosystems..."
                        onChange={(e) => {
                           setSearchTerm(e.target.value);
                           setShowDropdown(e.target.value.length > 0);
                           if (!e.target.value) setIsPaused(false);
                        }}
                        onFocus={() => {
                           if (searchTerm.length > 0) setShowDropdown(true);
                           setIsPaused(true);
                        }}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-9 py-3 text-sm text-white/70 placeholder-white/20 font-mono outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
                     />
                     {searchTerm && (
                        <button
                           onClick={() => {
                              setSearchTerm("");
                              setShowDropdown(false);
                              setIsPaused(false);
                           }}
                           className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                        >
                           <X size={14} />
                        </button>
                     )}

                     {/* Dropdown */}
                     <AnimatePresence>
                        {showDropdown && filteredItems.length > 0 && (
                           <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.97 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl z-30 overflow-hidden shadow-2xl"
                           >
                              {filteredItems.slice(0, 7).map((chain) => (
                                 <div
                                    key={chain.id}
                                    onMouseDown={(e) => {
                                       e.preventDefault();
                                       handleSelect(chain.id, chain.name);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.05] cursor-pointer border-b border-white/[0.04] last:border-none transition-colors duration-150"
                                 >
                                    <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center flex-none">
                                       {chain.logo ? <img src={chain.logo} alt={chain.name} className="w-4 h-4 rounded object-cover" /> : <chain.icon size={13} className="text-white/40" />}
                                    </div>
                                    <div>
                                       <p className="text-sm text-white/70 font-medium">{chain.name}</p>
                                       {chain.details && <p className="text-[11px] font-mono text-white/25">{chain.details}</p>}
                                    </div>
                                    <ChevronRight size={12} className="ml-auto text-white/15" />
                                 </div>
                              ))}
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>

               {/* Right carousel */}
               <div ref={rightRef} className="hidden xl:flex relative w-64 h-[420px] items-center justify-center flex-none" onMouseEnter={() => !searchTerm && setIsPaused(true)} onMouseLeave={() => !searchTerm && setIsPaused(false)}>
                  <div className="absolute inset-0 z-10 pointer-events-none">
                     <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-[#0A0A0A] to-transparent" />
                     <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  </div>
                  {getVisibleItems().map((chain) => (
                     <CarouselItem key={`r-${chain.id}`} chain={chain} side="right" isActive={chain.distanceFromCenter === 0} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModernChainCarousel;