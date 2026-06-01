// // import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// import { Facebook, Instagram, LucideLinkedin, TwitterIcon } from "lucide-react";
// import Link from "next/link";

// interface Footer7Props {
//    logo?: {
//       url: string;
//       alt: string;
//       title: string;
//    };
//    sections?: Array<{
//       title: string;
//       links: Array<{ name: string; href: string }>;
//    }>;
//    description?: string;
//    socialLinks?: Array<{
//       icon: React.ReactElement;
//       href: string;
//       label: string;
//    }>;
//    copyright?: string;
//    legalLinks?: Array<{
//       name: string;
//       href: string;
//    }>;
// }

// const defaultSocialLinks = [
//    { icon: <Instagram className="size-5" />, href: "https://www.instagram.com/ausaf_tahmid/?hl=en", label: "Instagram" },
//    { icon: <Facebook className="size-5" />, href: "https://www.facebook.com/ahmed.ausaf.tahmid/", label: "Facebook" },
//    { icon: <TwitterIcon className="size-5" />, href: "#", label: "Twitter" },
//    { icon: <LucideLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
// ];

// const defaultLegalLinks = [
//    { name: "Terms and Conditions", href: "#" },
//    { name: "Privacy Policy", href: "#" },
// ];

// const Footer7 = ({
//    logo = {
//       url: "",
//       alt: "logo",
//       title: "gaziur.tahmid@gmail.com",
//    },
//    description = "A collection of components for your startup business or side project.",
//    socialLinks = defaultSocialLinks,
//    copyright = "© 2025 Personal Website. All rights reserved.",
//    legalLinks = defaultLegalLinks,
// }: Footer7Props) => {
//    return (
//       <section className="py-4 bg-[#080808]">
//          <div className="container mx-auto  px-4">
//             <div className="flex w-full flex-col  justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
//                <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
//                   {/* Logo */}
//                   <div className="flex items-center gap-2 justify-center lg:justify-start">
//                      <h2 className="text-xl font-semibold font-primary-f">{logo.title}</h2>
//                   </div>
//                   <p className="text-muted-foreground  md:max-w-full text-sm text-center md:text-left">{description}</p>
//                   <ul className="text-muted-foreground flex items-center space-x-6 justify-center">
//                      {socialLinks.map((social, idx) => (
//                         <li key={idx} className="hover:text-primary font-medium">
//                            <a href={social.href} aria-label={social.label}>
//                               {social.icon}
//                            </a>
//                         </li>
//                      ))}
//                   </ul>
//                </div>
//                <div>
//                   <div className=" w-full md:gap-6 grid md:grid-cols-4 lg:gap-10 ">
//                      <Link href={"/about"} className="font-primary-n hover:underline hover:text-blue-600 md:text-xl hover:scale-110 md:p-4 rounded-2xl  hover:shadow-xl transition-all duration-300 group ">
//                         About
//                      </Link>
//                      <Link href={"/services"} className="font-primary-n hover:underline hover:text-blue-600 md:text-xl hover:scale-110 md:p-4 rounded-2xl  hover:shadow-xl transition-all duration-300 group ">
//                         Services
//                      </Link>
//                      <Link href={"/contact"} className="font-primary-n hover:underline hover:text-blue-600 md:text-xl hover:scale-110 md:p-4 rounded-2xl  hover:shadow-xl transition-all duration-300 group ">
//                         Contact
//                      </Link>
//                      <Link href={"/resume"} className="font-primary-n hover:underline hover:text-blue-600 md:text-xl hover:scale-110 md:p-4 rounded-2xl  hover:shadow-xl transition-all duration-300 group ">
//                         Resume
//                      </Link>
//                   </div>
//                   <p className="text-sm mt-6 text-gray-400">
//                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus provident corrupti doloribus modi, sunt aliquam quasi accusamus quas magni, quos ea dignissimos saepe cum mollitia id error. Eaque, eligendi quasi.
//                   </p>
//                </div>
//             </div>
//             <div className="text-muted-foreground text-center mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
//                <p className="order-2 lg:order-1">{copyright}</p>
//                <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
//                   {legalLinks.map((link, idx) => (
//                      <li key={idx} className="hover:text-primary">
//                         <a href={link.href}> {link.name}</a>
//                      </li>
//                   ))}
//                </ul>
//             </div>
//          </div>
//       </section>
//    );
// };

// export { Footer7 };
"use client"

import {  Mail, Phone, MapPin, InspectionPanel } from "lucide-react";
import Link from "next/link";
import  { motion, } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

interface FooterLink {
   name: string;
   href: string;
}

interface FooterSection {
   title: string;
   links: FooterLink[];
}

interface FooterProps {
   logo?: {
      url: string;
      alt: string;
      title: string;
   };
   sections?: FooterSection[];
   description?: string;
   socialLinks?: Array<{
      icon: React.ReactElement;
      href: string;
      label: string;
   }>;
   copyright?: string;
   legalLinks?: FooterLink[];
   contact?: {
      email?: string;
      phone?: string;
      address?: string;
   };
}

const defaultSocialLinks = [
   { icon: <FaInstagram className="size-7" />, href: "https://www.instagram.com/ausaf_tahmid", label: "Instagram" },
   { icon: <FaFacebook className="size-7" />, href: "https://www.facebook.com/ahmed.ausaf.tahmid", label: "Facebook" },
   { icon: <FaGithub className="size-7" />, href: "https://github.com/TahmidRahman32?tab=repositories", label: "GitHub" },
   { icon: <FaLinkedin className="size-7" />, href: "https://www.linkedin.com/in/gaziur-rahman-a194a8331", label: "LinkedIn" },
];

const defaultSections: FooterSection[] = [
   {
      title: "Product",
      links: [
         { name: "Features", href: "#" },
         { name: "Pricing", href: "#" },
         { name: "Security", href: "#" },
         { name: "Enterprise", href: "#" },
      ],
   },
 
   {
      title: "Resources",
      links: [
         { name: "Documentation", href: "#" },
         { name: "Help Center", href: "#" },
         { name: "Community", href: "#" },
         { name: "Status", href: "#" },
      ],
   },
];

const defaultLegalLinks: FooterLink[] = [
   { name: "Terms & Conditions", href: "#" },
   { name: "Privacy Policy", href: "#" },
   { name: "Cookie Policy", href: "#" },
];

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         delayChildren: 0.2,
      },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: "easeOut" as const,
      },
   },
};

export function ModernFooter({
   logo = {
      url: "",
      alt: "Portfolio website",
      title: "Portfolio Website",
   },
   description = "Building exceptional digital experiences with cutting-edge technology and innovative solutions.",
   socialLinks = defaultSocialLinks,
   copyright = "© 2025 Portfolio. All rights reserved.",
   legalLinks = defaultLegalLinks,
   sections = defaultSections,
   contact = {
      email: "gaziur.tahmid@gmail.com",
      phone: "+880 1234 567 890",
      address: "Dhaka, Bangladesh",
   },
}: FooterProps) {
   return (
      <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black dark:from-gray-950 dark:to-black text-gray-300">
         {/* Decorative elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
         </div>

         <div className="relative z-10">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
               <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                  {/* Brand Section */}
                  <motion.div variants={itemVariants} className="lg:col-span-1">
                     <div className="mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-400 bg-clip-text text-transparent uppercase">{logo.title}</h2>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

                     {/* Social Links */}
                     <div className="flex items-center gap-4">
                        {socialLinks.map((social, idx) => (
                           <motion.a
                              key={idx}
                              href={social.href}
                              aria-label={social.label}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                           >
                              {social.icon}
                           </motion.a>
                        ))}
                     </div>
                  </motion.div>

                  {/* Footer Sections */}
                  {sections.map((section, idx) => (
                     <motion.div key={idx} variants={itemVariants}>
                        <h3 className="text-white font-semibold mb-6 text-lg">{section.title}</h3>
                        <ul className="space-y-3">
                           {section.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                 <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300 relative group inline-block">
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </motion.div>
                  ))}

                  {/* Contact Section */}
                  <motion.div variants={itemVariants} className="lg:col-span-1">
                     <h3 className="text-white font-semibold mb-6 text-lg">Get in Touch</h3>
                     <ul className="space-y-4">
                        {contact.email && (
                           <li className="flex items-start gap-3 group cursor-pointer">
                              <Mail className="w-5 h-5 text-blue-400 mt-0.5 group-hover:text-blue-300 transition-colors" />
                              <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                 {contact.email}
                              </a>
                           </li>
                        )}
                        {contact.phone && (
                           <li className="flex items-start gap-3 group cursor-pointer">
                              <Phone className="w-5 h-5 text-blue-400 mt-0.5 group-hover:text-blue-300 transition-colors" />
                              <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                 {contact.phone}
                              </a>
                           </li>
                        )}
                        {contact.address && (
                           <li className="flex items-start gap-3 group cursor-pointer">
                              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 group-hover:text-blue-300 transition-colors" />
                              <span className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{contact.address}</span>
                           </li>
                        )}
                     </ul>
                  </motion.div>
               </motion.div>

               {/* Divider */}
               <div className="relative h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

               {/* Bottom Footer */}
               <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Copyright */}
                  <motion.p variants={itemVariants} className="text-gray-500 text-sm">
                     {copyright}
                  </motion.p>

                  {/* Legal Links */}
                  <motion.ul variants={itemVariants} className="flex flex-wrap gap-6 text-sm">
                     {legalLinks.map((link, idx) => (
                        <li key={idx}>
                           <Link href={link.href} className="text-gray-500 hover:text-gray-300 transition-colors duration-300 relative group inline-block">
                              {link.name}
                              <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300" />
                           </Link>
                        </li>
                     ))}
                  </motion.ul>
               </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               whileHover={{ y: -5 }}
               whileTap={{ y: 0 }}
               className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-40"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
               </svg>
            </motion.button>
         </div>
      </footer>
   );
}

export default ModernFooter;