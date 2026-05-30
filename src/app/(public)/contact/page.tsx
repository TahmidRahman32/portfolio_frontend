// "use client";

// import { useState, useRef } from "react";
// import { easeOut, motion, useInView } from "framer-motion";
// import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, Clock } from "lucide-react";

// const ContactPage = () => {
//    const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//    });
//    const [isSubmitting, setIsSubmitting] = useState(false);
//    const [isSubmitted, setIsSubmitted] = useState(false);

//    const headerRef = useRef(null);
//    const formRef = useRef(null);
//    const infoRef = useRef(null);

//    const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
//    const formInView = useInView(formRef, { once: true, margin: "-50px" });
//    const infoInView = useInView(infoRef, { once: true, margin: "-50px" });

//    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       setFormData((prev) => ({
//          ...prev,
//          [e.target.name]: e.target.value,
//       }));
//    };

//    const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setIsSubmitting(true);

//       // Simulate form submission
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       setIsSubmitting(false);
//       setIsSubmitted(true);

//       // Reset form after 3 seconds
//       setTimeout(() => {
//          setIsSubmitted(false);
//          setFormData({ name: "", email: "", subject: "", message: "" });
//       }, 3000);
//    };

//    const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//          opacity: 1,
//          transition: {
//             staggerChildren: 0.2,
//          },
//       },
//    };

//    const itemVariants = {
//       hidden: { opacity: 0, y: 30 },
//       visible: {
//          opacity: 1,
//          y: 0,
//          transition: {
//             duration: 0.6,
//             ease: easeOut,
//          },
//       },
//    };

//    const socialLinks = [
//       { icon: Github, href: "https://github.com/TahmidRahman32", label: "GitHub" },
//       { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
//       { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
//    ];

//    const contactInfo = [
//       { icon: Mail, text: "gaziur.tahmid@gmail.com", href: "mailto:gaziur.tahmid@gmail.com" },
//       { icon: Phone, text: "+8801725371032", href: "tel:+8801725371032" },
//       { icon: MapPin, text: "Dhaka, Bangladesh", href: "#" },
//    ];

//    return (
//       <div className="min-h-screen bg-gradient-to-br from-red-900 to-blue-50 dark:from-slate-900 dark:to-[#490b09]">
//          {/* Animated Background Elements */}
//          <div className="fixed inset-0 overflow-hidden pointer-events-none">
//             <motion.div
//                animate={{
//                   x: [0, 100, 0],
//                   y: [0, -50, 0],
//                }}
//                transition={{
//                   duration: 20,
//                   repeat: Infinity,
//                   ease: "linear",
//                }}
//                className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"
//             />
//             <motion.div
//                animate={{
//                   x: [0, -80, 0],
//                   y: [0, 60, 0],
//                }}
//                transition={{
//                   duration: 15,
//                   repeat: Infinity,
//                   ease: "linear",
//                   delay: 1,
//                }}
//                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-3xl"
//             />
//          </div>

//          <div className="relative z-10 container mx-auto px-4 py-20">
//             {/* Header Section */}
//             <motion.div ref={headerRef} initial={{ opacity: 0, y: 50 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
//                <motion.h1 initial={{ scale: 0.9 }} animate={headerInView ? { scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
//                   Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Connect</span>
//                </motion.h1>
//                <motion.p initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
//                   Have a project in mind? Let's discuss how we can bring your ideas to life. I'm always open to new opportunities and interesting challenges.
//                </motion.p>
//             </motion.div>

//             <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//                {/* Contact Form */}
//                <motion.div ref={formRef} variants={containerVariants} initial="hidden" animate={formInView ? "visible" : "hidden"} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
//                   <motion.h2 variants={itemVariants} className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
//                      Send me a message
//                   </motion.h2>

//                   {isSubmitted ? (
//                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
//                         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                         <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h3>
//                         <p className="text-slate-600 dark:text-slate-300">Thank you for reaching out. I'll get back to you soon.</p>
//                      </motion.div>
//                   ) : (
//                      <form onSubmit={handleSubmit} className="space-y-6">
//                         <motion.div variants={itemVariants}>
//                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Full Name
//                            </label>
//                            <input
//                               type="text"
//                               id="name"
//                               name="name"
//                               value={formData.name}
//                               onChange={handleChange}
//                               required
//                               className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
//                               placeholder="Your full name"
//                            />
//                         </motion.div>

//                         <motion.div variants={itemVariants}>
//                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Email Address
//                            </label>
//                            <input
//                               type="email"
//                               id="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               required
//                               className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
//                               placeholder="your.email@example.com"
//                            />
//                         </motion.div>

//                         <motion.div variants={itemVariants}>
//                            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Subject
//                            </label>
//                            <input
//                               type="text"
//                               id="subject"
//                               name="subject"
//                               value={formData.subject}
//                               onChange={handleChange}
//                               required
//                               className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
//                               placeholder="What's this about?"
//                            />
//                         </motion.div>

//                         <motion.div variants={itemVariants}>
//                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Message
//                            </label>
//                            <textarea
//                               id="message"
//                               name="message"
//                               value={formData.message}
//                               onChange={handleChange}
//                               required
//                               rows={5}
//                               className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
//                               placeholder="Tell me about your project..."
//                            />
//                         </motion.div>

//                         <motion.div variants={itemVariants}>
//                            <motion.button
//                               type="submit"
//                               disabled={isSubmitting}
//                               whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
//                               whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
//                               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                            >
//                               {isSubmitting ? (
//                                  <>
//                                     <Clock className="w-5 h-5 animate-spin" />
//                                     Sending...
//                                  </>
//                               ) : (
//                                  <>
//                                     <Send className="w-5 h-5" />
//                                     Send Message
//                                  </>
//                               )}
//                            </motion.button>
//                         </motion.div>
//                      </form>
//                   )}
//                </motion.div>

//                {/* Contact Information */}
//                <motion.div ref={infoRef} variants={containerVariants} initial="hidden" animate={infoInView ? "visible" : "hidden"} className="space-y-8">
//                   {/* Contact Info Cards */}
//                   <motion.div variants={itemVariants} className="space-y-4">
//                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Get in touch</h3>

//                      {contactInfo.map((item, index) => (
//                         <motion.a
//                            key={index}
//                            href={item.href}
//                            variants={itemVariants}
//                            whileHover={{ scale: 1.02, x: 10 }}
//                            className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
//                         >
//                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
//                               <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
//                            </div>
//                            <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">{item.text}</span>
//                         </motion.a>
//                      ))}
//                   </motion.div>

//                   {/* Social Links */}
//                   <motion.div variants={itemVariants} className="pt-8">
//                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Follow me on</h3>
//                      <div className="flex gap-4">
//                         {socialLinks.map((social, index) => (
//                            <motion.a
//                               key={index}
//                               href={social.href}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               variants={itemVariants}
//                               whileHover={{
//                                  scale: 1.1,
//                                  y: -5,
//                                  transition: { duration: 0.2 },
//                               }}
//                               whileTap={{ scale: 0.95 }}
//                               className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
//                            >
//                               <social.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
//                            </motion.a>
//                         ))}
//                      </div>
//                   </motion.div>

//                   {/* Stats */}
//                   <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-8">
//                      {[
//                         { number: "24h", label: "Response Time" },
//                         { number: "50+", label: "Projects Completed" },
//                         { number: "5★", label: "Client Rating" },
//                         { number: "100%", label: "Satisfaction" },
//                      ].map((stat, index) => (
//                         <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/20">
//                            <div className="text-xl font-bold text-slate-800 dark:text-white">{stat.number}</div>
//                            <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
//                         </motion.div>
//                      ))}
//                   </motion.div>
//                </motion.div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default ContactPage;

"use client";

import { useState, useRef } from "react";
import { easeOut, motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactPage = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const headerRef = useRef(null);
   const formRef = useRef(null);
   const infoRef = useRef(null);

   const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
   const formInView = useInView(formRef, { once: true, margin: "-50px" });
   const infoInView = useInView(infoRef, { once: true, margin: "-50px" });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
         setIsSubmitted(false);
         setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
   };

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: easeOut,
         },
      },
   };

   const socialLinks = [
      { icon: FaGithub, href: "https://github.com/TahmidRahman32", label: "GitHub", color: "hover:text-gray-400" },
      { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
      { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-400" },
   ];

   const contactInfo = [
      { icon: Mail, text: "gaziur.tahmid@gmail.com", href: "mailto:gaziur.tahmid@gmail.com", label: "Email" },
      { icon: Phone, text: "+8801725371032", href: "tel:+8801725371032", label: "Phone" },
      { icon: MapPin, text: "Dhaka, Bangladesh", href: "#", label: "Location" },
   ];

   const stats = [
      { number: "24h", label: "Response Time", icon: "⚡" },
      { number: "50+", label: "Projects", icon: "📦" },
      { number: "5★", label: "Rating", icon: "⭐" },
      { number: "100%", label: "Satisfaction", icon: "✓" },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 overflow-hidden">
         {/* Animated Background Elements */}
         <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Gradient blobs */}
            <motion.div
               animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
               }}
               transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
               }}
               className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            />
            <motion.div
               animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
               }}
               transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
               }}
               className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"
            />
            <motion.div
               animate={{
                  scale: [1, 1.2, 1],
               }}
               transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
               }}
               className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"
            />
         </div>

         <div className="relative z-10 container mx-auto px-4 py-20 lg:py-28">
            {/* Header Section */}
            <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={headerInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.1, duration: 0.6 }} className="inline-block mb-6">
                  <span className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-medium">Get In Touch</span>
               </motion.div>

               <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={headerInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">Create</span> Something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">Amazing</span>
               </motion.h1>

               <motion.p initial={{ opacity: 0, y: 10 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Have a project in mind? I'm always excited to collaborate on new and innovative ideas. Let's discuss how we can turn your vision into reality.
               </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
               {/* Contact Form */}
               <motion.div ref={formRef} variants={containerVariants} initial="hidden" animate={formInView ? "visible" : "hidden"} className="group">
                  <div className="relative">
                     {/* Gradient border effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-purple-600/30 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                     <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-gray-700 transition-colors duration-300 shadow-2xl">
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-white">
                           Send me a message
                        </motion.h2>

                        {isSubmitted ? (
                           <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                                 <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                              </motion.div>
                              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                              <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                           </motion.div>
                        ) : (
                           <form onSubmit={handleSubmit} className="space-y-6">
                              <motion.div variants={itemVariants}>
                                 <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                    Full Name
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder:text-gray-500"
                                    placeholder="John Doe"
                                 />
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                 <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                    Email Address
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder:text-gray-500"
                                    placeholder="your.email@example.com"
                                 />
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                 <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                    Subject
                                 </label>
                                 <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder:text-gray-500"
                                    placeholder="Project Inquiry"
                                 />
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                 <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                    Message
                                 </label>
                                 <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder:text-gray-500 resize-none"
                                    placeholder="Tell me about your project..."
                                 />
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                 <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/50"
                                 >
                                    {isSubmitting ? (
                                       <>
                                          <Loader2 className="w-5 h-5 animate-spin" />
                                          Sending...
                                       </>
                                    ) : (
                                       <>
                                          <Send className="w-5 h-5" />
                                          Send Message
                                       </>
                                    )}
                                 </motion.button>
                              </motion.div>
                           </form>
                        )}
                     </div>
                  </div>
               </motion.div>

               {/* Contact Information */}
               <motion.div ref={infoRef} variants={containerVariants} initial="hidden" animate={infoInView ? "visible" : "hidden"} className="space-y-8">
                  {/* Contact Info Cards */}
                  <motion.div variants={itemVariants} className="space-y-4">
                     <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

                     {contactInfo.map((item, index) => (
                        <motion.a
                           key={index}
                           href={item.href}
                           variants={itemVariants}
                           whileHover={{ x: 8 }}
                           className="group flex items-center gap-4 p-5 bg-gray-900/80 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:bg-gray-900/90"
                        >
                           <div className="p-3 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 rounded-lg group-hover:from-blue-600/40 group-hover:to-indigo-600/20 transition-all duration-300">
                              <item.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                           </div>
                           <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                              <p className="text-gray-100 font-medium group-hover:text-blue-400 transition-colors">{item.text}</p>
                           </div>
                        </motion.a>
                     ))}
                  </motion.div>

                  {/* Social Links */}
                  <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800">
                     <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
                     <div className="flex gap-4">
                        {socialLinks.map((social, index) => {
                           const IconComponent = social.icon;
                           return (
                              <motion.a
                                 key={index}
                                 href={social.href}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 variants={itemVariants}
                                 whileHover={{
                                    scale: 1.1,
                                    y: -5,
                                 }}
                                 whileTap={{ scale: 0.95 }}
                                 className="p-4 bg-gray-900/80 border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:bg-gray-900/90"
                                 title={social.label}
                              >
                                 <IconComponent className={`w-6 h-6 text-gray-400 ${social.color} transition-colors duration-300`} />
                              </motion.a>
                           );
                        })}
                     </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800">
                     <h3 className="text-2xl font-bold text-white mb-6">Why Work With Me</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                           <motion.div
                              key={index}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className="p-5 bg-gray-900/80 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-xl text-center transition-all duration-300 hover:bg-gray-900/90"
                           >
                              <div className="text-3xl mb-2">{stat.icon}</div>
                              <div className="text-2xl font-bold text-white">{stat.number}</div>
                              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>
               </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-20 text-center">
               <p className="text-gray-400 mb-6">Ready to start a project? Let's work together!</p>
               <Link href="/contact">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                  >
                     Start A Project
                     <ArrowRight className="w-5 h-5" />
                  </motion.button>
               </Link>
            </motion.div>
         </div>
      </div>
   );
};

export default ContactPage;
