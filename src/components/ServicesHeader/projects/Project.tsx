// // components/ProjectsSection.tsx
// "use client";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Type definitions
// interface Project {
//    id: number;
//    title: string;
//    description: string;
//    image: string;
//    category: ProjectCategory;
//    stack: string[];
//    link: string;
//    github: string;
// }

// type ProjectCategory = "frontend" | "backend" | "fullstack" | "all";

// interface Filter {
//    id: ProjectCategory;
//    label: string;
// }

// interface ProjectCardProps {
//    project: Project;
//    getStackIcon: (tech: string) => string;
// }

// // Main component
// const ProjectsSection: React.FC = () => {
//    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
//    const [projects, setProjects] = useState<Project[]>([]);
//    const [isLoading, setIsLoading] = useState<boolean>(true);

//    // Mock data - replace with your actual projects
//    useEffect(() => {
//       // Simulate API fetch
//       setTimeout(() => {
//          const mockProjects: Project[] = [
//             {
//                id: 1,
//                title: "E-Commerce Platform",
//                description: "A full-stack e-commerce solution with payment processing and inventory management.",
//                image: "/api/placeholder/600/400",
//                category: "fullstack",
//                stack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
//                link: "#",
//                github: "#",
//             },
//             {
//                id: 2,
//                title: "Task Management App",
//                description: "A collaborative task management application with real-time updates and team features.",
//                image: "/api/placeholder/600/400",
//                category: "frontend",
//                stack: ["React", "Firebase", "Tailwind CSS", "Context API"],
//                link: "#",
//                github: "#",
//             },
//             {
//                id: 3,
//                title: "REST API Service",
//                description: "A scalable REST API with authentication, rate limiting, and comprehensive documentation.",
//                image: "/api/placeholder/600/400",
//                category: "backend",
//                stack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
//                link: "#",
//                github: "#",
//             },
//             {
//                id: 4,
//                title: "Portfolio Website",
//                description: "A modern, responsive portfolio website with smooth animations and dark mode.",
//                image: "/api/placeholder/600/400",
//                category: "frontend",
//                stack: ["Next.js", "Framer Motion", "Tailwind CSS", "GSAP"],
//                link: "#",
//                github: "#",
//             },
//             {
//                id: 5,
//                title: "Social Media Dashboard",
//                description: "Analytics dashboard for social media metrics with data visualization and reporting.",
//                image: "/api/placeholder/600/400",
//                category: "fullstack",
//                stack: ["React", "Node.js", "Chart.js", "MySQL", "Socket.io"],
//                link: "#",
//                github: "#",
//             },
//             {
//                id: 6,
//                title: "Mobile Fitness App",
//                description: "Cross-platform mobile application for workout tracking and progress monitoring.",
//                image: "/api/placeholder/600/400",
//                category: "fullstack",
//                stack: ["React Native", "Firebase", "Redux", "Expo"],
//                link: "#",
//                github: "#",
//             },
//          ];
//          setProjects(mockProjects);
//          setIsLoading(false);
//       }, 800);
//    }, []);

//    const filteredProjects: Project[] = activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter);

//    const filters: Filter[] = [
//       { id: "all", label: "All Projects" },
//       { id: "frontend", label: "Frontend" },
//       { id: "backend", label: "Backend" },
//       { id: "fullstack", label: "Full Stack" },
//    ];

//    const getStackIcon = (tech: string): string => {
//       const icons: Record<string, string> = {
//          "Next.js": "⚡",
//          React: "⚛️",
//          TypeScript: "📘",
//          "Node.js": "🟢",
//          Express: "🚂",
//          MongoDB: "🍃",
//          PostgreSQL: "🐘",
//          Firebase: "🔥",
//          "Tailwind CSS": "🎨",
//          Prisma: "🛠️",
//          Stripe: "💳",
//          JWT: "🔐",
//          Swagger: "📖",
//          "Chart.js": "📊",
//          MySQL: "🐬",
//          "Socket.io": "🔌",
//          "React Native": "📱",
//          Redux: "📦",
//          Expo: "📲",
//          GSAP: "🎬",
//          "Framer Motion": "✨",
//          "Context API": "🔄",
//       };
//       return icons[tech] || "💻";
//    };

//    if (isLoading) {
//       return (
//          <section id="projects" className="py-16 px-4  from-[#490b09] my-16 container mx-auto to-blue-900">
//             <div className="max-w-6xl mx-auto">
//                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 dark:text-white font-primary-f">My Projects</h2>
//                <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">A collection of my recent work and personal projects</p>
//                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[...Array(6)].map((_, i) => (
//                      <div key={i} className="animate-pulse">
//                         <div className="bg-slate-200 dark:bg-slate-800 h-48 rounded-lg mb-4"></div>
//                         <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
//                         <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
//                         <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
//                      </div>
//                   ))}
//                </div>
//             </div>
//          </section>
//       );
//    }

//    return (
//       <section id="projects" className="py-16 px-4 mx-auto my-16 container rounded-2xl bg-[#4b1614] dark:bg-[#4b1614]">
//          <div className="max-w-6xl mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">My Projects</h2>
//             <p className="text-center text-input  mb-12 max-w-2xl mx-auto">A collection of my recent work and personal projects</p>

//             {/* Filter UI */}
//             <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
//                {filters.map((filter) => (
//                   <button
//                      key={filter.id}
//                      onClick={() => setActiveFilter(filter.id)}
//                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                         activeFilter === filter.id ? "bg-blue-600 text-white shadow-lg" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow"
//                      }`}
//                   >
//                      {filter.label}
//                   </button>
//                ))}
//             </div>

//             {/* Projects Grid */}
//             <AnimatePresence mode="wait">
//                <motion.div key={activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredProjects.map((project) => (
//                      <ProjectCard key={project.id} project={project} getStackIcon={getStackIcon} />
//                   ))}
//                </motion.div>
//             </AnimatePresence>

//             {filteredProjects.length === 0 && (
//                <div className="text-center py-12">
//                   <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found in this category.</p>
//                </div>
//             )}
//          </div>
//       </section>
//    );
// };

// // Project Card Component
// const ProjectCard: React.FC<ProjectCardProps> = ({ project, getStackIcon }) => {
//    const [isHovered, setIsHovered] = useState<boolean>(false);

//    return (
//       <motion.div
//          initial={{ opacity: 0, scale: 0.9 }}
//          animate={{ opacity: 1, scale: 1 }}
//          transition={{ duration: 0.4 }}
//          className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden group cursor-pointer"
//          onMouseEnter={() => setIsHovered(true)}
//          onMouseLeave={() => setIsHovered(false)}
//       >
//          <div className="relative overflow-hidden">
//             {/* Project Thumbnail */}
//             <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
//                <div className="w-4/5 h-32 bg-white/20 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-lg font-semibold text-center px-4">{project.title}</span>
//                </div>
//             </div>

//             {/* Hover Overlay */}
//             <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
//                <div className="p-4 w-full flex gap-2">
//                   <a href={project.link} className="flex-1 bg-white text-slate-900 text-center py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                      View Project
//                   </a>
//                   <a href={project.github} className="px-3 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors">
//                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                      </svg>
//                   </a>
//                </div>
//             </div>

//             {/* Category Badge */}
//             <div
//                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${isHovered ? "opacity-0" : "opacity-100"} ${
//                   project.category === "frontend"
//                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                      : project.category === "backend"
//                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
//                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                }`}
//             >
//                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
//             </div>
//          </div>

//          {/* Project Info */}
//          <div className="p-5">
//             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
//             <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{project.description}</p>

//             {/* Stack Icons */}
//             <div className="flex flex-wrap gap-2">
//                {project.stack.map((tech) => (
//                   <div key={tech} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-sm">
//                      <span>{getStackIcon(tech)}</span>
//                      <span className="text-slate-700 dark:text-slate-300">{tech}</span>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </motion.div>
//    );
// };

// export default ProjectsSection;

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight,  ExternalLink, GitBranch } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Category = "all" | "frontend" | "backend" | "fullstack";

interface Project {
   id: number;
   title: string;
   description: string;
   category: Category;
   stack: string[];
   link: string;
   github: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

// ── Data ───────────────────────────────────────────────────────────────────────
const mockProjects: Project[] = [
   {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack commerce solution with Stripe payments, inventory management, and a real-time admin dashboard.",
      category: "fullstack",
      stack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      link: "#",
      github: "#",
   },
   {
      id: 2,
      title: "Task Management App",
      description: "Collaborative workspace with real-time updates, drag-and-drop boards, and role-based team access.",
      category: "frontend",
      stack: ["React", "Firebase", "Tailwind CSS", "Context API"],
      link: "#",
      github: "#",
   },
   {
      id: 3,
      title: "REST API Service",
      description: "Scalable REST API with JWT auth, rate limiting, Swagger documentation, and 99.9% uptime SLA.",
      category: "backend",
      stack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
      link: "#",
      github: "#",
   },
   {
      id: 4,
      title: "Portfolio Website",
      description: "Modern developer portfolio with GSAP animations, dark mode, and a CMS-backed blog.",
      category: "frontend",
      stack: ["Next.js", "Framer Motion", "Tailwind CSS", "GSAP"],
      link: "#",
      github: "#",
   },
   {
      id: 5,
      title: "Social Media Dashboard",
      description: "Multi-platform analytics dashboard with Chart.js visualisations and live Socket.io feeds.",
      category: "fullstack",
      stack: ["React", "Node.js", "Chart.js", "MySQL", "Socket.io"],
      link: "#",
      github: "#",
   },
   {
      id: 6,
      title: "Mobile Fitness App",
      description: "Cross-platform workout tracker with progress graphs, custom routines, and offline sync.",
      category: "fullstack",
      stack: ["React Native", "Firebase", "Redux", "Expo"],
      link: "#",
      github: "#",
   },
];

const filters: { id: Category; label: string }[] = [
   { id: "all", label: "All" },
   { id: "frontend", label: "Frontend" },
   { id: "backend", label: "Backend" },
   { id: "fullstack", label: "Full Stack" },
];

const categoryDot: Record<Category, string> = {
   all: "bg-white/30",
   frontend: "bg-emerald-400/70",
   backend: "bg-amber-400/70",
   fullstack: "bg-sky-400/70",
};

// ── Project Card ───────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, inView }: { project: Project; index: number; inView: boolean }) => {
   const [hovered, setHovered] = useState(false);

   return (
      <motion.div
         initial={{ opacity: 0, y: 28 }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.65, ease, delay: index * 0.07 }}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden
                 hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-400 backdrop-blur-sm cursor-default"
      >
         {/* Glass inner glow */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />

         {/* ── Thumbnail ── */}
         <div className="relative h-44 overflow-hidden border-b border-white/[0.06]">
            {/* Abstract code-art placeholder */}
            <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center">
               <div className="grid grid-cols-3 gap-2 opacity-[0.07] w-4/5">
                  {Array.from({ length: 9 }).map((_, i) => (
                     <div key={i} className={`h-1.5 rounded-full bg-white ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-3/4" : "w-1/2"}`} />
                  ))}
               </div>
               <span style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="absolute text-xl font-normal text-white/30 tracking-tight">
                  {project.title}
               </span>
            </div>

            {/* Hover overlay with links */}
            <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-3">
               <a href={project.link} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors duration-150">
                  <ExternalLink size={12} /> Live Site
               </a>
               <a href={project.github} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-white text-xs font-medium hover:bg-white/[0.15] transition-colors duration-150">
                  <GitBranch size={12} /> Code
               </a>
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">
               <span className={`w-1.5 h-1.5 rounded-full ${categoryDot[project.category]}`} />
               <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.category}</span>
            </div>
         </div>

         {/* ── Info ── */}
         <div className="flex flex-col gap-4 p-5 flex-1">
            <div>
               <h3 className="text-sm font-semibold text-white/75 group-hover:text-white/90 transition-colors duration-200 mb-2">{project.title}</h3>
               <p className="text-xs font-mono text-white/30 leading-relaxed line-clamp-3">{project.description}</p>
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
               {project.stack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] font-mono text-white/30">
                     {t}
                  </span>
               ))}
            </div>
         </div>
      </motion.div>
   );
};

// ── Loading skeleton ───────────────────────────────────────────────────────────
const Skeleton = () => (
   <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden animate-pulse">
      <div className="h-44 bg-white/[0.03]" />
      <div className="p-5 space-y-3">
         <div className="h-3 bg-white/[0.05] rounded-full w-2/3" />
         <div className="h-2 bg-white/[0.03] rounded-full w-full" />
         <div className="h-2 bg-white/[0.03] rounded-full w-4/5" />
      </div>
   </div>
);

// ── Main ───────────────────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
   const [activeFilter, setActiveFilter] = useState<Category>("all");
   const [projects, setProjects] = useState<Project[]>([]);
   const [loading, setLoading] = useState(true);

   const ref = useRef<HTMLElement>(null);
   const inView = useInView(ref, { once: true, margin: "-60px" });

   useEffect(() => {
      const t = setTimeout(() => {
         setProjects(mockProjects);
         setLoading(false);
      }, 700);
      return () => clearTimeout(t);
   }, []);

   const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

   return (
      <motion.section ref={ref} id="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06] ">
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

         <div className="relative z-10 px-6 md:px-12 py-16 md:py-20">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
               <div>
                  <motion.span
                     initial={{ opacity: 0, y: 16 }}
                     animate={inView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.65, ease }}
                     className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
                  >
                     Selected Work
                  </motion.span>
                  <motion.h2
                     initial={{ opacity: 0, y: 20 }}
                     animate={inView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.7, ease, delay: 0.08 }}
                     style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                     className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight"
                  >
                     My Projects
                     <br />
                     <span className="italic text-white/25">& experiments</span>
                  </motion.h2>
               </div>

               {/* Filter pills */}
               <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, ease, delay: 0.16 }} className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                     <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-200 border ${
                           activeFilter === f.id ? "bg-white text-black border-white" : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/60"
                        }`}
                     >
                        {f.label}
                     </button>
                  ))}
               </motion.div>
            </div>

            {/* ── Grid ── */}
            <AnimatePresence mode="wait">
               {loading ? (
                  <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} />
                     ))}
                  </motion.div>
               ) : (
                  <motion.div key={activeFilter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {filtered.length > 0 ? (
                        filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} inView={inView} />)
                     ) : (
                        <div className="col-span-3 py-20 text-center">
                           <p className="text-sm font-mono text-white/20">No projects in this category yet.</p>
                        </div>
                     )}
                  </motion.div>
               )}
            </AnimatePresence>

            {/* ── Footer CTA ── */}
            <motion.div
               initial={{ opacity: 0, y: 16 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.65, ease, delay: 0.5 }}
               className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
            >
               <p className="text-sm font-mono text-white/25">Want to see more? Check out my GitHub for all public repos.</p>
               <a
                  href="https://github.com"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/70 transition-all duration-200"
               >
                  <GitBranch size={13} />
                  GitHub Profile
                  <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
               </a>
            </motion.div>
         </div>
      </motion.section>
   );
};

export default ProjectsSection;