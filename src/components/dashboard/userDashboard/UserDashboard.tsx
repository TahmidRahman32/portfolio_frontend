// // // app/dashboard/page.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { motion } from "framer-motion";

// // import Image from "next/image";
// // import { SessionConfig } from "../sessions";
// // import { ArrowLeft } from "lucide-react";

// // export default function Dashboard() {
// //    const [activeTab, setActiveTab] = useState("overview");
// //    const [isLoading, setIsLoading] = useState(true);
// //    const session = SessionConfig();
// //    console.log(session?.data?.user)
// //    const imageUrl = session?.data?.user?.image || "/default-avatar.png";
// //    // Mock user data
// //    const userData = {
// //       name: "Alex Johnson",
// //       email: "alex.johnson@example.com",
// //       plan: "Pro",
// //       resumeCount: 3,
// //       lastLogin: "2024-01-15",
// //    };

// //    // Mock resumes data
// //    const resumes = [
// //       {
// //          id: 1,
// //          name: "Software Engineer Resume",
// //          template: "Modern",
// //          lastEdited: "2 hours ago",
// //          preview: "/resumes/1.jpg",
// //          isPublic: true,
// //       },
// //       {
// //          id: 2,
// //          name: "Product Manager Resume",
// //          template: "Professional",
// //          lastEdited: "1 day ago",
// //          preview: "/resumes/2.jpg",
// //          isPublic: false,
// //       },
// //       {
// //          id: 3,
// //          name: "Frontend Developer",
// //          template: "Creative",
// //          lastEdited: "3 days ago",
// //          preview: "/resumes/3.jpg",
// //          isPublic: true,
// //       },
// //    ];

// //    // Mock stats data
// //    const stats = [
// //       {
// //          title: "Resumes Created",
// //          value: "3",
// //          change: "+2 this month",
// //          icon: "📄",
// //          color: "blue",
// //       },
// //       {
// //          title: "Profile Views",
// //          value: "147",
// //          change: "+12% this week",
// //          icon: "👁️",
// //          color: "green",
// //       },
// //       {
// //          title: "Downloaded",
// //          value: "8",
// //          change: "+3 today",
// //          icon: "📥",
// //          color: "purple",
// //       },
// //       {
// //          title: "Templates Used",
// //          value: "2",
// //          change: "Modern, Professional",
// //          icon: "🎨",
// //          color: "orange",
// //       },
// //    ];

// //    useEffect(() => {
// //       // Simulate loading
// //       const timer = setTimeout(() => setIsLoading(false), 1000);
// //       return () => clearTimeout(timer);
// //    }, []);

// //    if (isLoading) {
// //       return <DashboardSkeleton />;
// //    }

// //    return (
// //       <div className="min-h-screen bg-gradient-to-br from-red-900 to-blue-500">
// //          {/* Header */}
// //          <header className="bg-white shadow-sm border-b border-gray-200">
// //             <div className="container mx-auto px-4">
// //                <div className="flex items-center justify-between h-16">
// //                   <div className="flex items-center gap-3">
// //                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
// //                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                         </svg>
// //                      </motion.div>
// //                      <div>
// //                         <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
// //                         <p className="text-gray-600 text-sm">ResumeBuilder</p>
// //                      </div>
// //                   </div>

// //                   <div className="flex items-center gap-4">
// //                      <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                            <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth={2}
// //                               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
// //                            />
// //                         </svg>
// //                         <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
// //                      </button>

// //                      <div className="flex items-center gap-3">
// //                         <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
// //                            {session?.data?.user?.image ? (
// //                               <Image height={40} width={40} src={imageUrl} alt="User Avatar" className=" rounded-full" />
// //                            ) : (
// //                               userData.name
// //                                  .split(" ")
// //                                  .map((n) => n[0])
// //                                  .join("")
// //                            )}
// //                         </div>
// //                         <div className="hidden sm:block text-left">
// //                            <p className="text-sm font-medium text-gray-900">{session?.data?.user?.name}</p>
// //                            <p className="text-xs text-gray-600">Pro Plan</p>
// //                         </div>
// //                      </div>
// //                   </div>
// //                </div>
// //             </div>
// //          </header>

// //          <div className="container mx-auto px-4 py-8">
// //             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //                {/* Sidebar */}
// //                <div className="lg:col-span-1">
// //                   <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-purple-200/20 dark:bg-purple-400/10  rounded-2xl shadow-sm border border-gray-200 p-6">
// //                      {/* User Profile Summary */}
// //                      <div className="text-center mb-8">
// //                         <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-foreground font-bold text-xl">
// //                            {session?.data?.user?.image ? (
// //                               <Image height={64} width={64} src={imageUrl} alt="User Avatar" className="rounded-2xl" />
// //                            ) : (
// //                               userData.name
// //                                  .split(" ")
// //                                  .map((n) => n[0])
// //                                  .join("")
// //                            )}
// //                         </div>
// //                         <h2 className="font-bold text-foreground">{session?.data?.user?.name}</h2>
// //                         <p className="text-foreground text-sm mb-2">{session?.data?.user?.email}</p>
// //                         <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-foreground text-xs font-semibold rounded-full">{userData.plan} Plan</span>
// //                      </div>

// //                      {/* Navigation */}
// //                      <nav className="space-y-2">
// //                         {[
// //                            { id: "overview", label: "Overview", icon: "📊" },
// //                            { id: "resumes", label: "My Resumes", icon: "📄" },
// //                            { id: "templates", label: "Templates", icon: "🎨" },
// //                            { id: "analytics", label: "Analytics", icon: "📈" },
// //                            { id: "settings", label: "Settings", icon: "⚙️" },
// //                         ].map((item) => (
// //                            <button
// //                               key={item.id}
// //                               onClick={() => setActiveTab(item.id)}
// //                               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
// //                                  activeTab === item.id ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200" : "text-foreground hover:bg-gray-500"
// //                               }`}
// //                            >
// //                               <span className="text-lg">{item.icon}</span>
// //                               <span className="font-medium">{item.label}</span>
// //                            </button>
// //                         ))}
// //                      </nav>

// //                      {/* Quick Stats */}
// //                      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
// //                         <h3 className="font-bold text-sm mb-2">Resume Storage</h3>
// //                         <div className="flex justify-between items-center text-xs mb-2">
// //                            <span>{userData.resumeCount} of 10 used</span>
// //                            <span>30%</span>
// //                         </div>
// //                         <div className="w-full bg-blue-400 rounded-full h-2">
// //                            <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: "30%" }}></div>
// //                         </div>
// //                      </div>
// //                   </motion.div>
// //                </div>

// //                {/* Main Content */}
// //                <div className="lg:col-span-3">
// //                   {/* Welcome Section */}
// //                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
// //                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
// //                         <div>
// //                            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name.split(" ")[0]}! 👋</h1>
// //                            <p className="text-blue-100 text-lg">Ready to create your next amazing resume?</p>
// //                         </div>
// //                         <div className="flex flex-col gap-4">
// //                            <Link href="/resume" className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
// //                               + Create New Resume
// //                            </Link>
// //                            <Link href="/" className="mt-4 text-center md:mt-0 px-6 py-3 bg-gradient-to-r from-red-900 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
// //                               <ArrowLeft size={18} />
// //                               Back to Home
// //                            </Link>
// //                         </div>
// //                      </div>
// //                   </motion.div>

// //                   {/* Stats Grid */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //                      {stats.map((stat, index) => (
// //                         <motion.div
// //                            key={stat.title}
// //                            initial={{ opacity: 0, y: 20 }}
// //                            animate={{ opacity: 1, y: 0 }}
// //                            transition={{ delay: index * 0.1 }}
// //                            whileHover={{ y: -5, scale: 1.02 }}
// //                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
// //                         >
// //                            <div className="flex items-center justify-between mb-4">
// //                               <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center text-white text-xl`}>{stat.icon}</div>
// //                            </div>
// //                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
// //                            <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
// //                            <p className="text-green-600 text-xs font-semibold">{stat.change}</p>
// //                         </motion.div>
// //                      ))}
// //                   </div>

// //                   {/* Recent Resumes */}
// //                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-purple-200/60 dark:bg-slate-400/80 rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
// //                      <div className="flex justify-between items-center mb-6">
// //                         <h2 className="text-xl font-bold text-foreground">Recent Resumes</h2>
// //                         <Link href="/resume-builder" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2">
// //                            View All
// //                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                            </svg>
// //                         </Link>
// //                      </div>

// //                      <div className="space-y-4">
// //                         {resumes.map((resume, index) => (
// //                            <motion.div
// //                               key={resume.id}
// //                               initial={{ opacity: 0, x: -20 }}
// //                               animate={{ opacity: 1, x: 0 }}
// //                               transition={{ delay: 0.5 + index * 0.1 }}
// //                               whileHover={{ scale: 1.01 }}
// //                               className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200"
// //                            >
// //                               <div className="flex items-center gap-4">
// //                                  <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-gray-300 flex items-center justify-center">
// //                                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                                     </svg>
// //                                  </div>
// //                                  <div>
// //                                     <h3 className="font-semibold text-gray-900">{resume.name}</h3>
// //                                     <div className="flex items-center gap-4 text-sm text-gray-600">
// //                                        <span>{resume.template} Template</span>
// //                                        <span>•</span>
// //                                        <span>Edited {resume.lastEdited}</span>
// //                                        {resume.isPublic && (
// //                                           <>
// //                                              <span>•</span>
// //                                              <span className="text-purple-00 font-semibold">Public</span>
// //                                           </>
// //                                        )}
// //                                     </div>
// //                                  </div>
// //                               </div>

// //                               <div className="flex items-center gap-3">
// //                                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
// //                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                                     </svg>
// //                                  </button>
// //                                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
// //                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
// //                                     </svg>
// //                                  </button>
// //                                  <Link href={`/resume-builder?edit=${resume.id}`} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
// //                                     Edit
// //                                  </Link>
// //                               </div>
// //                            </motion.div>
// //                         ))}
// //                      </div>
// //                   </motion.div>

// //                   {/* Quick Actions & Templates */}
// //                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //                      {/* Quick Actions */}
// //                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //                         <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
// //                         <div className="grid grid-cols-2 gap-4">
// //                            {[
// //                               { icon: "🚀", label: "New Resume", color: "blue", href: "/resume-builder" },
// //                               { icon: "🎨", label: "Templates", color: "purple", href: "/resume-builder/templates" },
// //                               { icon: "📊", label: "Analytics", color: "green", href: "/dashboard/analytics" },
// //                               { icon: "⚙️", label: "Settings", color: "gray", href: "/dashboard/settings" },
// //                            ].map((action, index) => (
// //                               <Link key={action.label} href={action.href} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
// //                                  <div className={`w-10 h-10 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition-transform`}>
// //                                     {action.icon}
// //                                  </div>
// //                                  <h3 className="font-semibold text-gray-900">{action.label}</h3>
// //                               </Link>
// //                            ))}
// //                         </div>
// //                      </motion.div>

// //                      {/* Recent Templates */}
// //                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //                         <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Templates</h2>
// //                         <div className="space-y-4">
// //                            {[
// //                               { name: "Modern", used: true, emoji: "🔄" },
// //                               { name: "Professional", used: true, emoji: "💼" },
// //                               { name: "Executive", used: false, emoji: "👔" },
// //                               { name: "Creative", used: false, emoji: "🎨" },
// //                            ].map((template, index) => (
// //                               <div key={template.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
// //                                  <div className="flex items-center gap-3">
// //                                     <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-lg">{template.emoji}</div>
// //                                     <div>
// //                                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
// //                                        <p className="text-sm text-gray-600">{template.used ? "Used in your resumes" : "Try this template"}</p>
// //                                     </div>
// //                                  </div>
// //                                  <Link href={`/resume-builder?template=${template.name.toLowerCase()}`} className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
// //                                     {template.used ? "Reuse" : "Try"}
// //                                  </Link>
// //                               </div>
// //                            ))}
// //                         </div>
// //                      </motion.div>
// //                   </div>
// //                </div>
// //             </div>
// //          </div>
// //       </div>
// //    );
// // }

// // // Skeleton Loading Component
// // function DashboardSkeleton() {
// //    return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //          <div className="container mx-auto px-4 py-8">
// //             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //                {/* Sidebar Skeleton */}
// //                <div className="lg:col-span-1">
// //                   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
// //                      <div className="text-center mb-8">
// //                         <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
// //                         <div className="h-4 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
// //                         <div className="h-3 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
// //                         <div className="h-6 bg-gray-300 rounded w-16 mx-auto"></div>
// //                      </div>
// //                      <div className="space-y-2">
// //                         {[...Array(5)].map((_, i) => (
// //                            <div key={i} className="h-12 bg-gray-300 rounded-xl"></div>
// //                         ))}
// //                      </div>
// //                   </div>
// //                </div>

// //                {/* Main Content Skeleton */}
// //                <div className="lg:col-span-3 space-y-8">
// //                   {/* Welcome Section Skeleton */}
// //                   <div className="bg-gray-300 rounded-2xl p-8 animate-pulse"></div>

// //                   {/* Stats Grid Skeleton */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                      {[...Array(4)].map((_, i) => (
// //                         <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
// //                            <div className="w-12 h-12 bg-gray-300 rounded-2xl mb-4"></div>
// //                            <div className="h-6 bg-gray-300 rounded w-16 mb-2"></div>
// //                            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
// //                            <div className="h-3 bg-gray-300 rounded w-20"></div>
// //                         </div>
// //                      ))}
// //                   </div>

// //                   {/* Recent Resumes Skeleton */}
// //                   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
// //                      <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
// //                      <div className="space-y-4">
// //                         {[...Array(3)].map((_, i) => (
// //                            <div key={i} className="h-20 bg-gray-300 rounded-xl"></div>
// //                         ))}
// //                      </div>
// //                   </div>
// //                </div>
// //             </div>
// //          </div>
// //       </div>
// //    );
// // }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
// import { FileText, Eye, Download, Layers, BarChart2, Settings, Home, Bell,  Plus, ChevronRight, Pencil } from "lucide-react";
// import { ArrowLeft } from "lucide-react";

// const ease = [0.22, 1, 0.36, 1] as const;

// const stats = [
//    { label: "Resumes", value: "3", sub: "+2 this month", icon: FileText },
//    { label: "Profile Views", value: "147", sub: "+12% this week", icon: Eye },
//    { label: "Downloads", value: "8", sub: "+3 today", icon: Download },
//    { label: "Templates", value: "2", sub: "Modern · Pro", icon: Layers },
// ];

// const navItems = [
//    { id: "overview", label: "Overview", icon: BarChart2 },
//    { id: "resumes", label: "My Resumes", icon: FileText },
//    { id: "templates", label: "Templates", icon: Layers },
//    { id: "settings", label: "Settings", icon: Settings },
// ];

// const quickActions = [
//    { label: "New Resume", icon: Plus, href: "/resume", color: "text-white/50" },
//    { label: "Templates", icon: Layers, href: "/resume-builder/templates", color: "text-white/50" },
//    { label: "Analytics", icon: BarChart2, href: "/dashboard/analytics", color: "text-white/50" },
//    { label: "Settings", icon: Settings, href: "/dashboard/settings", color: "text-white/50" },
// ];

// const recTemplates = [
//    { name: "Modern", used: true, emoji: "◈" },
//    { name: "Professional", used: true, emoji: "◻" },
//    { name: "Executive", used: false, emoji: "▣" },
//    { name: "Creative", used: false, emoji: "◆" },
// ];

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton() {
//    return (
//       <div className="min-h-screen bg-[#080808] flex items-center justify-center">
//          <div className="text-center space-y-3">
//             <div className="w-10 h-10 border border-white/10 border-t-white/30 rounded-full animate-spin mx-auto" />
//             <p className="text-xs font-mono text-white/20">Loading dashboard…</p>
//          </div>
//       </div>
//    );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function Dashboard( {myResumes}: {myResumes: any} ) {
//    const [activeTab, setActiveTab] = useState("overview");
//    const [loading, setLoading] = useState(true);

//    const mainRef = useRef<HTMLDivElement>(null);
//    const inView = useInView(mainRef, { once: true, margin: "-40px" });

//    useEffect(() => {
//       const t = setTimeout(() => setLoading(false), 900);
//       return () => clearTimeout(t);
//    }, []);

//    if (loading) return <Skeleton />;

//    return (
//       <div className="min-h-screen bg-[#080808]">
//          {/* Noise */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
//             style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//             }}
//          />
//          {/* Grid */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
//             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
//          />

//          {/* ── Top nav ── */}
//          <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-sm">
//             <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
//                <div className="flex items-center gap-3">
//                   <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
//                      <FileText size={13} className="text-white/40" />
//                   </div>
//                   <span className="text-sm font-semibold text-white/50 hidden sm:block">Dashboard</span>
//                </div>

//                <div className="flex items-center gap-3">
//                   <button className="relative w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/15 transition-all duration-200">
//                      <Bell size={14} />
//                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400/70" />
//                   </button>

//                   <Link
//                      href="/"
//                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/30 text-[11px] font-mono uppercase tracking-widest hover:border-white/15 hover:text-white/50 transition-all duration-200"
//                   >
//                      <Home size={11} /> Home
//                   </Link>

//                   {/* Avatar */}
//                   <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06]">
//                      {/* <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 bg-white/[0.05] flex items-center justify-center">
//                         {imageUrl ? <Image src={imageUrl} alt={userName} width={28} height={28} className="object-cover" /> : <span className="text-[11px] font-mono text-white/40">{initials}</span>}
//                      </div> */}
//                      <div className="hidden sm:block">
//                         {/* <p className="text-xs font-semibold text-white/55 leading-tight">{userName}</p> */}
//                         <p className="text-[10px] font-mono text-white/25">Pro Plan</p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </header>

//          <div className="relative z-10 max-w-7xl mx-auto px-5 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//                {/* ── Sidebar ── */}
//                <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease }} className="lg:col-span-1">
//                   <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
//                      {/* User card */}
//                      <div className="text-center mb-6 pb-6 border-b border-white/[0.05]">
//                         {/* <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center mx-auto mb-3">
//                            {imageUrl ? <Image src={imageUrl} alt={userName} width={56} height={56} className="object-cover" /> : <span className="text-lg font-mono text-white/40">{initials}</span>}
//                         </div> */}
//                         {/* <p className="text-sm font-semibold text-white/70">{userName}</p> */}
//                         {/* <p className="text-[11px] font-mono text-white/25 mt-0.5">{userEmail}</p> */}
//                         <span className="inline-block mt-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider">Pro Plan</span>
//                      </div>

//                      {/* Nav */}
//                      <nav className="space-y-1 mb-6">
//                         {navItems.map((item) => {
//                            const Icon = item.icon;
//                            const active = activeTab === item.id;
//                            return (
//                               <button
//                                  key={item.id}
//                                  onClick={() => setActiveTab(item.id)}
//                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
//                                     active ? "bg-white/[0.07] border-white/[0.14] text-white/80" : "border-transparent text-white/30 hover:bg-white/[0.04] hover:text-white/55"
//                                  }`}
//                               >
//                                  <Icon size={14} className="flex-none" />
//                                  <span className="text-xs font-mono tracking-wide">{item.label}</span>
//                               </button>
//                            );
//                         })}
//                      </nav>

//                      {/* Storage */}
//                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-3">Storage</p>
//                         <div className="flex justify-between text-[11px] font-mono text-white/30 mb-2">
//                            <span>3 of 10 resumes</span>
//                            <span>30%</span>
//                         </div>
//                         <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
//                            <motion.div className="h-full bg-white/30 rounded-full" initial={{ width: 0 }} animate={{ width: "30%" }} transition={{ duration: 1, ease, delay: 0.5 }} />
//                         </div>
//                      </div>
//                   </div>
//                </motion.aside>

//                {/* ── Main ── */}
//                <div ref={mainRef} className="lg:col-span-3 space-y-5">
//                   {/* Welcome banner */}
//                   <motion.div
//                      initial={{ opacity: 0, y: 20 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ duration: 0.65, ease, delay: 0.1 }}
//                      className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-7 overflow-hidden"
//                   >
//                      <div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
//                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
//                         <div>
//                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">Welcome back</p>
//                            {/* <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-3xl md:text-4xl font-normal text-white/85 leading-tight">
//                               Hey, {userName.split(" ")[0]} 👋
//                            </h1> */}
//                            <p className="text-sm font-mono text-white/30 mt-2">Ready to build your next resume?</p>
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2.5 flex-none">
//                            <Link href="/resume" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200">
//                               <Plus size={14} /> New Resume
//                            </Link>
//                            <Link
//                               href="/"
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/45 text-sm font-medium hover:border-white/20 hover:text-white/65 transition-all duration-200"
//                            >
//                               <ArrowLeft size={13} /> Back
//                            </Link>
//                         </div>
//                      </div>
//                   </motion.div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//                      {stats.map((s, i) => {
//                         const Icon = s.icon;
//                         return (
//                            <motion.div
//                               key={s.label}
//                               initial={{ opacity: 1, y: 16 }}
//                               animate={inView ? { opacity: 1, y: 0 } : {}}
//                               transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.07 }}
//                               whileHover={{ y: -3, transition: { duration: 0.22 } }}
//                               className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-white/[0.13] hover:bg-white/[0.05] transition-all duration-300 cursor-default"
//                            >
//                               <div className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center mb-4 group-hover:border-white/15 transition-colors">
//                                  <Icon size={14} className="text-white/35" />
//                               </div>
//                               <p className="text-2xl font-bold text-white/70 tracking-tight mb-0.5">{s.value}</p>
//                               <p className="text-[11px] font-mono text-white/25">{s.label}</p>
//                               <p className="text-[10px] font-mono text-white/15 mt-1">{s.sub}</p>
//                            </motion.div>
//                         );
//                      })}
//                   </div>

//                   {/* Recent Resumes */}
//                   <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease, delay: 0.38 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6">
//                      <div className="flex items-center justify-between mb-5">
//                         <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/30">Recent Resumes</p>
//                         <Link href="/resume-builder" className="inline-flex items-center gap-1 text-[11px] font-mono text-white/25 hover:text-white/50 transition-colors">
//                            View all <ChevronRight size={11} />
//                         </Link>
//                      </div>

//                      <div className="space-y-2">
//                         {myResumes?.map((r, i) => (
//                            <motion.div
//                               key={r.id}
//                               initial={{ opacity: 1, x: -16 }}
//                               animate={inView ? { opacity: 1, x: 0 } : {}}
//                               transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.08 }}
//                               className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200"
//                            >
//                               {/* Doc icon */}
//                               <div className="flex-none w-10 h-12 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
//                                  <FileText size={14} className="text-white/20" />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                  <p className="text-sm font-semibold text-white/65 group-hover:text-white/80 transition-colors truncate">{r.name}</p>
//                                  <p className="text-[11px] font-mono text-white/25 mt-0.5">
//                                     {r.template} · {r.edited}
//                                     {r.pub && <span className="ml-2 text-white/20">· Public</span>}
//                                  </p>
//                               </div>
//                               <div className="flex items-center gap-1.5 flex-none">
//                                  <button className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150">
//                                     <Eye size={13} />
//                                  </button>
//                                  <button className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150">
//                                     <Download size={13} />
//                                  </button>
//                                  <Link
//                                     href={`/resume-builder?edit=${r.id}`}
//                                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/35 text-[11px] font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-150"
//                                  >
//                                     <Pencil size={10} /> Edit
//                                  </Link>
//                               </div>
//                            </motion.div>
//                         ))}
//                      </div>
//                   </motion.div>

//                   {/* Bottom row */}
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                      {/* Quick actions */}
//                      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.55 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Quick Actions</p>
//                         <div className="grid grid-cols-2 gap-2.5">
//                            {quickActions.map((a) => {
//                               const Icon = a.icon;
//                               return (
//                                  <Link
//                                     key={a.label}
//                                     href={a.href}
//                                     className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-200"
//                                  >
//                                     <Icon size={16} className="text-white/25 group-hover:text-white/55 transition-colors" />
//                                     <span className="text-[11px] font-mono text-white/30 group-hover:text-white/55 transition-colors">{a.label}</span>
//                                  </Link>
//                               );
//                            })}
//                         </div>
//                      </motion.div>

//                      {/* Recommended templates */}
//                      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.62 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Recommended Templates</p>
//                         <div className="space-y-2">
//                            {recTemplates.map((t) => (
//                               <div key={t.name} className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-200">
//                                  <div className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-base text-white/30">{t.emoji}</div>
//                                  <div className="flex-1 min-w-0">
//                                     <p className="text-xs font-semibold text-white/55 group-hover:text-white/70 transition-colors">{t.name}</p>
//                                     <p className="text-[10px] font-mono text-white/20">{t.used ? "Used in your resumes" : "Try this template"}</p>
//                                  </div>
//                                  <Link
//                                     href={`/resume-builder?template=${t.name.toLowerCase()}`}
//                                     className="px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25 hover:border-white/20 hover:text-white/50 transition-all duration-150"
//                                  >
//                                     {t.used ? "Reuse" : "Try"}
//                                  </Link>
//                               </div>
//                            ))}
//                         </div>
//                      </motion.div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }
// app/dashboard/page.tsx (FIXED)
// JSX FIXED to match actual data structure
// No function changes - only JSX updates

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
// import { FileText, Eye, Download, Layers, BarChart2, Settings, Home, Bell, Plus, ChevronRight, Pencil, RefreshCw } from "lucide-react";
// import { ArrowLeft } from "lucide-react";
// import ResumeModal from "./Resumemodal";
// import { useResumeApi } from "@/components/comonLayout/resume/useResume";

// const ease = [0.22, 1, 0.36, 1] as const;

// // ── Format date ────────────────────────────────────────────────────────────────
// function formatDate(dateString: string): string {
//    try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffMs = now.getTime() - date.getTime();
//       const diffHours = Math.floor(diffMs / 3600000);
//       const diffDays = Math.floor(diffMs / 86400000);

//       if (diffHours < 24) return `${diffHours}h ago`;
//       if (diffDays < 7) return `${diffDays}d ago`;

//       return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//    } catch {
//       return "recently";
//    }
// }

// // ── Transform resume data ──────────────────────────────────────────────────────
// function transformResume(resume: any) {
//    return {
//       id: resume.id,
//       name: resume.personalInfo?.fullName || "Untitled Resume",
//       template: "Professional",
//       edited: formatDate(resume.updatedAt),
//       pub: true,
//       ...resume, // Include full resume data for modal
//    };
// }

// const stats = [
//    { label: "Resumes", value: "3", sub: "+2 this month", icon: FileText },
//    { label: "Profile Views", value: "147", sub: "+12% this week", icon: Eye },
//    { label: "Downloads", value: "8", sub: "+3 today", icon: Download },
//    { label: "Templates", value: "2", sub: "Modern · Pro", icon: Layers },
// ];

// const navItems = [
//    { id: "overview", label: "Overview", icon: BarChart2 },
//    { id: "resumes", label: "My Resumes", icon: FileText },
//    { id: "templates", label: "Templates", icon: Layers },
//    { id: "settings", label: "Settings", icon: Settings },
// ];

// const quickActions = [
//    { label: "New Resume", icon: Plus, href: "/resume", color: "text-white/50" },
//    { label: "Templates", icon: Layers, href: "/resume-builder/templates", color: "text-white/50" },
//    { label: "Analytics", icon: BarChart2, href: "/dashboard/analytics", color: "text-white/50" },
//    { label: "Settings", icon: Settings, href: "/dashboard/settings", color: "text-white/50" },
// ];

// const recTemplates = [
//    { name: "Modern", used: true, emoji: "◈" },
//    { name: "Professional", used: true, emoji: "◻" },
//    { name: "Executive", used: false, emoji: "▣" },
//    { name: "Creative", used: false, emoji: "◆" },
// ];

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton() {
//    return (
//       <div className="min-h-screen bg-[#080808] flex items-center justify-center">
//          <div className="text-center space-y-3">
//             <div className="w-10 h-10 border border-white/10 border-t-white/30 rounded-full animate-spin mx-auto" />
//             <p className="text-xs font-mono text-white/20">Loading dashboard…</p>
//          </div>
//       </div>
//    );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function Dashboard({ myResumes }: { myResumes: any }) {
//    console.log("My resumes:", myResumes);
//    const [activeTab, setActiveTab] = useState("overview");
//    const [loading, setLoading] = useState(true);
//    const [showResumeModal, setShowResumeModal] = useState(false);
//    const [selectedResume, setSelectedResume] = useState<any>(null);

//    const mainRef = useRef<HTMLDivElement>(null);
//    const inView = useInView(mainRef, { once: true, margin: "-40px" });

//    // Transform resume data from API
//    const resumes = myResumes?.data?.map(transformResume) || [];
//    const resumeCount = resumes.length;
//    const storagePercent = Math.round((resumeCount / 10) * 100);
//    const { apiStatus, isSaving, lastSaved, hasSaved, saveResume, loadResume, deleteResume } = useResumeApi();

//    // Handle modal open
//    const handleOpenModal = (resume: any) => {
//       setSelectedResume(resume);
//       setShowResumeModal(true);
//    };

//    // Handle modal close
//    const handleCloseModal = () => {
//       setShowResumeModal(false);
//       setSelectedResume(null);
//    };

//    useEffect(() => {
//       const t = setTimeout(() => setLoading(false), 900);
//       return () => clearTimeout(t);
//    }, []);
//    useEffect(() => {
//       (async () => {
//         await loadResume();

//       })();
//    }, []); // eslint-disable-line

//    if (loading) return <Skeleton />;

//    return (
//       <div className="min-h-screen bg-[#080808]">
//          {/* Noise */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
//             style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//             }}
//          />
//          {/* Grid */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
//             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
//          />

//          {/* ── Resume Modal (Rendered at top level) ── */}
//          <ResumeModal resume={selectedResume} isOpen={showResumeModal} onClose={handleCloseModal} />

//          {/* ── Top nav ── */}
//          <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-sm">
//             <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
//                <div className="flex items-center gap-3">
//                   <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
//                      <FileText size={13} className="text-white/40" />
//                   </div>
//                   <span className="text-sm font-semibold text-white/50 hidden sm:block">Dashboard</span>
//                </div>

//                <div className="flex items-center gap-3">
//                   <button className="relative w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/15 transition-all duration-200">
//                      <Bell size={14} />
//                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400/70" />
//                   </button>

//                   <Link
//                      href="/"
//                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/30 text-[11px] font-mono uppercase tracking-widest hover:border-white/15 hover:text-white/50 transition-all duration-200"
//                   >
//                      <Home size={11} /> Home
//                   </Link>

//                   {/* Avatar */}
//                   <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06]">
//                      <div className="hidden sm:block">
//                         <p className="text-[10px] font-mono text-white/25">Pro Plan</p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </header>

//          <div className="relative z-10 max-w-7xl mx-auto px-5 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//                {/* ── Sidebar ── */}
//                <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease }} className="lg:col-span-1">
//                   <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
//                      {/* User card */}
//                      <div className="text-center mb-6 pb-6 border-b border-white/[0.05]">
//                         <span className="inline-block mt-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider">Pro Plan</span>
//                      </div>

//                      {/* Nav */}
//                      <nav className="space-y-1 mb-6">
//                         {navItems.map((item) => {
//                            const Icon = item.icon;
//                            const active = activeTab === item.id;
//                            return (
//                               <button
//                                  key={item.id}
//                                  onClick={() => setActiveTab(item.id)}
//                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
//                                     active ? "bg-white/[0.07] border-white/[0.14] text-white/80" : "border-transparent text-white/30 hover:bg-white/[0.04] hover:text-white/55"
//                                  }`}
//                               >
//                                  <Icon size={14} className="flex-none" />
//                                  <span className="text-xs font-mono tracking-wide">{item.label}</span>
//                               </button>
//                            );
//                         })}
//                      </nav>

//                      {/* Storage */}
//                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-3">Storage</p>
//                         <div className="flex justify-between text-[11px] font-mono text-white/30 mb-2">
//                            <span>{resumeCount} of 10 resumes</span>
//                            <span>{storagePercent}%</span>
//                         </div>
//                         <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
//                            <motion.div className="h-full bg-white/30 rounded-full" initial={{ width: 0 }} animate={{ width: `${storagePercent}%` }} transition={{ duration: 1, ease, delay: 0.5 }} />
//                         </div>
//                      </div>
//                   </div>
//                </motion.aside>

//                {/* ── Main ── */}
//                <div ref={mainRef} className="lg:col-span-3 space-y-5">
//                   {/* Welcome banner */}
//                   <motion.div
//                      initial={{ opacity: 0, y: 20 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ duration: 0.65, ease, delay: 0.1 }}
//                      className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-7 overflow-hidden"
//                   >
//                      <div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
//                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
//                         <div>
//                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">Welcome back</p>
//                            <p className="text-sm font-mono text-white/30 mt-2">Ready to build your next resume?</p>
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2.5 flex-none">
//                            <Link href="/resume" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200">
//                               <Plus size={14} /> New Resume
//                            </Link>
//                            <Link
//                               href="/"
//                               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/45 text-sm font-medium hover:border-white/20 hover:text-white/65 transition-all duration-200"
//                            >
//                               <ArrowLeft size={13} /> Back
//                            </Link>
//                         </div>
//                      </div>
//                   </motion.div>

//                   {/* Recent Resumes */}
//                   <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease, delay: 0.38 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6">
//                      <div className="flex items-center justify-between mb-5">
//                         <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/30">Recent Resumes {resumeCount > 0 && <span className="text-white/20">({resumeCount})</span>}</p>
//                         <button
//                            onClick={() => loadResume()}
//                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200"
//                         >
//                            <RefreshCw size={12} /> Load Resumes
//                         </button>
//                      </div>

//                      {resumes.length === 0 ? (
//                         <div className="text-center py-8">
//                            <FileText size={24} className="mx-auto text-white/20 mb-2" />
//                            <p className="text-sm text-white/30">No resumes yet</p>
//                            <p className="text-xs text-white/15 mt-1">Create your first resume to get started</p>
//                         </div>
//                      ) : (
//                         <div className="space-y-2">
//                            {resumes.slice(0, 5).map((r: any, i: number) => (
//                               <motion.div
//                                  key={r.id}
//                                  initial={{ opacity: 1, x: -16 }}
//                                  animate={inView ? { opacity: 1, x: 0 } : {}}
//                                  transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.08 }}
//                                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200"
//                               >
//                                  {/* Doc icon */}
//                                  <div className="flex-none w-10 h-12 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
//                                     <FileText size={14} className="text-white/20" />
//                                  </div>
//                                  <div className="flex-1 min-w-0">
//                                     <p className="text-sm font-semibold text-white/65 group-hover:text-white/80 transition-colors truncate">{r.name}</p>
//                                     <p className="text-[11px] font-mono text-white/25 mt-0.5">
//                                        {r.template} · {r.edited}
//                                        {r.pub && <span className="ml-2 text-white/20">· Public</span>}
//                                     </p>
//                                  </div>
//                                  <div className="flex items-center gap-1.5 flex-none">
//                                     {/* View Button */}
//                                     <button
//                                        onClick={() => handleOpenModal(r)}
//                                        className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150 cursor-pointer"
//                                        title="View Resume"
//                                     >
//                                        <Eye size={13} />
//                                     </button>

//                                     {/* Download Button */}
//                                     <button
//                                        className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150 cursor-pointer"
//                                        title="Download Resume"
//                                     >
//                                        <Download size={13} />
//                                     </button>

//                                     {/* Edit Button */}
//                                     <Link
//                                        href={`/resume-builder?edit=${r.id}`}
//                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/35 text-[11px] font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-150"
//                                     >
//                                        <Pencil size={10} /> Edit
//                                     </Link>
//                                  </div>
//                               </motion.div>
//                            ))}
//                         </div>
//                      )}
//                   </motion.div>

//                   {/* Bottom row */}
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                      {/* Quick actions */}
//                      <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.55 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Quick Actions</p>
//                         <div className="grid grid-cols-2 gap-2.5">
//                            {quickActions.map((a) => {
//                               const Icon = a.icon;
//                               return (
//                                  <Link
//                                     key={a.label}
//                                     href={a.href}
//                                     className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-200"
//                                  >
//                                     <Icon size={16} className="text-white/25 group-hover:text-white/55 transition-colors" />
//                                     <span className="text-[11px] font-mono text-white/30 group-hover:text-white/55 transition-colors">{a.label}</span>
//                                  </Link>
//                               );
//                            })}
//                         </div>
//                      </motion.div>

//                      {/* Recommended templates */}
//                      <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.62 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
//                         <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Recommended Templates</p>
//                         <div className="space-y-2">
//                            {recTemplates.map((t) => (
//                               <div key={t.name} className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-200">
//                                  <div className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-base text-white/30">{t.emoji}</div>
//                                  <div className="flex-1 min-w-0">
//                                     <p className="text-xs font-semibold text-white/55 group-hover:text-white/70 transition-colors">{t.name}</p>
//                                     <p className="text-[10px] font-mono text-white/20">{t.used ? "Used in your resumes" : "Try this template"}</p>
//                                  </div>
//                                  <Link
//                                     href={`/resume-builder?template=${t.name.toLowerCase()}`}
//                                     className="px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/25 hover:border-white/20 hover:text-white/50 transition-all duration-150"
//                                  >
//                                     {t.used ? "Reuse" : "Try"}
//                                  </Link>
//                               </div>
//                            ))}
//                         </div>
//                      </motion.div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FileText, Eye, Download, Layers, BarChart2, Settings, Home, Bell, Plus, ChevronRight, Pencil, RefreshCw } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import ResumeModal from "./Resumemodal";
import { useResumeApi } from "@/components/comonLayout/resume/useResume";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Format date ────────────────────────────────────────────────────────────────
function formatDate(dateString: string): string {
   try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
   } catch {
      return "recently";
   }
}

// ── Transform resume data ──────────────────────────────────────────────────────
function transformResume(resume: any) {
   return {
      id: resume.id,
      name: resume.personalInfo?.fullName || "Untitled Resume",
      template: "Professional",
      edited: formatDate(resume.updatedAt),
      pub: true,
      ...resume,
   };
}

const stats = [
   { label: "Resumes", value: "3", sub: "+2 this month", icon: FileText },
   { label: "Profile Views", value: "147", sub: "+12% this week", icon: Eye },
   { label: "Downloads", value: "8", sub: "+3 today", icon: Download },
   { label: "Templates", value: "2", sub: "Modern · Pro", icon: Layers },
];

const navItems = [
   { id: "overview", label: "Overview", icon: BarChart2 },
   { id: "resumes", label: "My Resumes", icon: FileText },
   { id: "templates", label: "Templates", icon: Layers },
   { id: "settings", label: "Settings", icon: Settings },
];

const quickActions = [
   { label: "New Resume", icon: Plus, href: "/resume", color: "text-white/50" },
   { label: "Templates", icon: Layers, href: "/resume", color: "text-white/50" },
   { label: "Analytics", icon: BarChart2, href: "/dashboard/analytics", color: "text-white/50" },
   { label: "Settings", icon: Settings, href: "/dashboard/settings", color: "text-white/50" },
];

// ✅ TEMPLATE LIST - Maps to Resume Builder templates
const recTemplates = [
   { name: "Modern", id: "modern", used: true, emoji: "◈", description: "Clean and contemporary design" },
   { name: "Professional", id: "professional", used: true, emoji: "◻", description: "Corporate-style layout" },
   { name: "Minimal", id: "minimal", used: false, emoji: "📄", description: "Simple and focused" },
   { name: "Creative", id: "creative", used: false, emoji: "◆", description: "Unique and bold design" },
];

// ── Skeleton ───────────────────────────────────────────────────────────────────
function Skeleton() {
   return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
         <div className="text-center space-y-3">
            <div className="w-10 h-10 border border-white/10 border-t-white/30 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-white/20">Loading dashboard…</p>
         </div>
      </div>
   );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Dashboard({ myResumes }: { myResumes: any }) {
   const [activeTab, setActiveTab] = useState("overview");
   const [loading, setLoading] = useState(true);
   const [showResumeModal, setShowResumeModal] = useState(false);
   const [selectedResume, setSelectedResume] = useState<any>(null);

   const mainRef = useRef<HTMLDivElement>(null);
   const inView = useInView(mainRef, { once: true, margin: "-40px" });

   const resumes = myResumes?.data?.map(transformResume) || [];
   const resumeCount = resumes.length;
   const storagePercent = Math.round((resumeCount / 10) * 100);
   const { loadResume } = useResumeApi();

   // Handle modal open
   const handleOpenModal = (resume: any) => {
      setSelectedResume(resume);
      setShowResumeModal(true);
   };

   // Handle modal close
   const handleCloseModal = () => {
      setShowResumeModal(false);
      setSelectedResume(null);
   };

   useEffect(() => {
      const t = setTimeout(() => setLoading(false), 900);
      return () => clearTimeout(t);
   }, []);

   useEffect(() => {
      (async () => {
         await loadResume();
      })();
   }, []); // eslint-disable-line

   if (loading) return <Skeleton />;

   return (
      <div className="min-h-screen bg-[#080808]">
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

         {/* ── Resume Modal ── */}
         <ResumeModal resume={selectedResume} isOpen={showResumeModal} onClose={handleCloseModal} />

         {/* ── Top nav ── */}
         <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                     <FileText size={13} className="text-white/40" />
                  </div>
                  <span className="text-sm font-semibold text-white/50 hidden sm:block">Dashboard</span>
               </div>

               <div className="flex items-center gap-3">
                  <button className="relative w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/15 transition-all duration-200">
                     <Bell size={14} />
                     <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400/70" />
                  </button>

                  <Link
                     href="/"
                     className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/30 text-[11px] font-mono uppercase tracking-widest hover:border-white/15 hover:text-white/50 transition-all duration-200"
                  >
                     <Home size={11} /> Home
                  </Link>

                  <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06]">
                     <div className="hidden sm:block">
                        <p className="text-[10px] font-mono text-white/25">Pro Plan</p>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <div className="relative z-10 max-w-7xl mx-auto px-5 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
               {/* ── Sidebar ── */}
               <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease }} className="lg:col-span-1">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5 sticky top-6">
                     <div className="text-center mb-6 pb-6 border-b border-white/[0.05]">
                        <span className="inline-block mt-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider">Pro Plan</span>
                     </div>

                     <nav className="space-y-1 mb-6">
                        {navItems.map((item) => {
                           const Icon = item.icon;
                           const active = activeTab === item.id;
                           return (
                              <button
                                 key={item.id}
                                 onClick={() => setActiveTab(item.id)}
                                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
                                    active ? "bg-white/[0.07] border-white/[0.14] text-white/80" : "border-transparent text-white/30 hover:bg-white/[0.04] hover:text-white/55"
                                 }`}
                              >
                                 <Icon size={14} className="flex-none" />
                                 <span className="text-xs font-mono tracking-wide">{item.label}</span>
                              </button>
                           );
                        })}
                     </nav>

                     <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-3">Storage</p>
                        <div className="flex justify-between text-[11px] font-mono text-white/30 mb-2">
                           <span>{resumeCount} of 10 resumes</span>
                           <span>{storagePercent}%</span>
                        </div>
                        <div className="w-full h-px bg-white/[0.07] rounded-full overflow-hidden">
                           <motion.div className="h-full bg-white/30 rounded-full" initial={{ width: 0 }} animate={{ width: `${storagePercent}%` }} transition={{ duration: 1, ease, delay: 0.5 }} />
                        </div>
                     </div>
                  </div>
               </motion.aside>

               {/* ── Main ── */}
               <div ref={mainRef} className="lg:col-span-3 space-y-5">
                  {/* Welcome banner */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.65, ease, delay: 0.1 }}
                     className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-7 overflow-hidden"
                  >
                     <div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                        <div>
                           <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">Welcome back</p>
                           <p className="text-sm font-mono text-white/30 mt-2">Ready to build your next resume?</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5 flex-none">
                           <Link href="/resume" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200">
                              <Plus size={14} /> New Resume
                           </Link>
                           <Link
                              href="/"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/45 text-sm font-medium hover:border-white/20 hover:text-white/65 transition-all duration-200"
                           >
                              <ArrowLeft size={13} /> Back
                           </Link>
                        </div>
                     </div>
                  </motion.div>

                  {/* Recent Resumes */}
                  <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease, delay: 0.38 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6">
                     <div className="flex items-center justify-between mb-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/30">Recent Resumes {resumeCount > 0 && <span className="text-white/20">({resumeCount})</span>}</p>
                        <button
                           onClick={() => loadResume()}
                           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/55 transition-all duration-200"
                        >
                           <RefreshCw size={12} /> Load Resumes
                        </button>
                     </div>

                     {resumes.length === 0 ? (
                        <div className="text-center py-8">
                           <FileText size={24} className="mx-auto text-white/20 mb-2" />
                           <p className="text-sm text-white/30">No resumes yet</p>
                           <p className="text-xs text-white/15 mt-1">Create your first resume to get started</p>
                        </div>
                     ) : (
                        <div className="space-y-2">
                           {resumes.slice(0, 5).map((r: any, i: number) => (
                              <motion.div
                                 key={r.id}
                                 initial={{ opacity: 1, x: -16 }}
                                 animate={inView ? { opacity: 1, x: 0 } : {}}
                                 transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.08 }}
                                 className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200"
                              >
                                 <div className="flex-none w-10 h-12 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                                    <FileText size={14} className="text-white/20" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white/65 group-hover:text-white/80 transition-colors truncate">{r.name}</p>
                                    <p className="text-[11px] font-mono text-white/25 mt-0.5">
                                       {r.template} · {r.edited}
                                       {r.pub && <span className="ml-2 text-white/20">· Public</span>}
                                    </p>
                                 </div>
                                 <div className="flex items-center gap-1.5 flex-none">
                                    <button
                                       onClick={() => handleOpenModal(r)}
                                       className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150 cursor-pointer"
                                       title="View Resume"
                                    >
                                       <Eye size={13} />
                                    </button>

                                    <button
                                       className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-150 cursor-pointer"
                                       title="Download Resume"
                                    >
                                       <Download size={13} />
                                    </button>

                                    {/* <Link
                                       href={`/resume-builder?edit=${r.id}`}
                                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/35 text-[11px] font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-150"
                                    >
                                       <Pencil size={10} /> Edit
                                    </Link> */}
                                    <button
                                       onClick={() => handleOpenModal(r)}
                                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/35 text-[11px] font-mono uppercase tracking-widest hover:border-white/20 hover:text-white/60 transition-all duration-150"
                                       title="View Resume"
                                    >
                                       <Pencil size={10} /> Edit
                                    </button>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     )}
                  </motion.div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {/* Quick actions */}
                     <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.55 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Quick Actions</p>
                        <div className="grid grid-cols-2 gap-2.5">
                           {quickActions.map((a) => {
                              const Icon = a.icon;
                              return (
                                 <Link
                                    key={a.label}
                                    href={a.href}
                                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-200"
                                 >
                                    <Icon size={16} className="text-white/25 group-hover:text-white/55 transition-colors" />
                                    <span className="text-[11px] font-mono text-white/30 group-hover:text-white/55 transition-colors">{a.label}</span>
                                 </Link>
                              );
                           })}
                        </div>
                     </motion.div>

                     {/* ✅ Recommended templates - NOW WITH NAVIGATION */}
                     <motion.div initial={{ opacity: 1, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.62 }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-4">Recommended Templates</p>
                        <div className="space-y-2">
                           {recTemplates.map((t) => (
                              <Link
                                 key={t.id}
                                 href={`/resume?template=${t.id}`}
                                 className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
                              >
                                 <div className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-base text-white/30 group-hover:text-white/60 transition-colors">{t.emoji}</div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white/55 group-hover:text-white/70 transition-colors">{t.name}</p>
                                    <p className="text-[10px] font-mono text-white/20">{t.description}</p>
                                 </div>
                                 <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                              </Link>
                           ))}
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
