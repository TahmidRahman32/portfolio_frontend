"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail, FileText, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
   href: string;
   icon: React.ReactNode;
   label: string;
   index: number;
   onClick: () => void;
}

const MenuItem = ({ href, icon, label, index, onClick }: MenuItemProps) => {
   return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} exit={{ opacity: 0, x: -20 }}>
         <Link href={href} onClick={onClick}>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-pointer">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/10 group-hover:from-blue-600/40 group-hover:to-indigo-600/20 transition-all duration-300">
                     <div className="text-blue-400 group-hover:text-blue-300 transition-colors">{icon}</div>
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{label}</span>
               </div>
               <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
         </Link>
      </motion.div>
   );
};

export default function MobileMenu() {
   const [isOpen, setIsOpen] = useState(false);

   const menuItems = [
      { href: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
      { href: "/about", icon: <User className="w-5 h-5" />, label: "About" },
      { href: "/service", icon: <Briefcase className="w-5 h-5" />, label: "Services" },
      { href: "/contact", icon: <Mail className="w-5 h-5" />, label: "Contact" },
      { href: "/resume", icon: <FileText className="w-5 h-5" />, label: "Resume" },
      { href: "/user/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
   ];

   const handleClose = () => setIsOpen(false);

   return (
      <>
         {/* Menu Trigger Button */}
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative h-10 w-10 rounded-lg hover:bg-white/10 transition-colors">
               <AnimatePresence mode="wait">
                  {isOpen ? (
                     <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <X className="w-5 h-5 text-gray-300" />
                     </motion.div>
                  ) : (
                     <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="w-5 h-5 text-gray-300" />
                     </motion.div>
                  )}
               </AnimatePresence>
            </Button>
         </motion.div>

         {/* Mobile Menu Backdrop & Content */}
         <AnimatePresence>
            {isOpen && (
               <>
                  {/* Backdrop */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" />

                  {/* Menu Panel */}
                  <motion.div
                     initial={{ x: "100%", opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: "100%", opacity: 0 }}
                     transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                     }}
                     className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl border-l border-gray-800 z-50 md:hidden overflow-y-auto"
                  >
                     {/* Header */}
                     <div className="sticky top-0 px-4 py-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                           <h2 className="text-lg font-bold text-white">Menu</h2>
                           <p className="text-xs text-gray-400 mt-1">Navigate to any section</p>
                        </motion.div>
                     </div>

                     {/* Menu Items */}
                     <motion.div
                        className="px-4 py-6 space-y-1"
                        initial="hidden"
                        animate="visible"
                        variants={{
                           hidden: { opacity: 0 },
                           visible: {
                              opacity: 1,
                              transition: {
                                 staggerChildren: 0.05,
                              },
                           },
                        }}
                     >
                        {menuItems.map((item, index) => (
                           <MenuItem key={item.href} {...item} index={index} onClick={handleClose} />
                        ))}
                     </motion.div>

                     {/* Footer Info */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 bg-gradient-to-t from-gray-900/80 to-transparent"
                     >
                        <div className="flex flex-col gap-2">
                           <p className="text-xs text-gray-400">Need help? Reach out via contact page</p>
                           <div className="flex gap-2">
                              <a href="https://github.com/TahmidRahman32" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                                 GitHub
                              </a>
                              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                                 LinkedIn
                              </a>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </>
   );
}
