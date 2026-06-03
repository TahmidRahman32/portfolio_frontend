
import { Button } from "@/components/ui/button";
// import { Facebook, Github, Instagram, LucideLinkedin} from "lucide-react";
import { AuroraTextEffect } from "../nameSection/UiStyle";
import { motion } from "framer-motion";
import {  FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";


interface Footer7Props {
   socialLinks?: Array<{
      icon: React.ReactElement;
      href: string;
      label: string;
   }>;
}

const defaultSocialLinks = [
   { icon: <FaInstagram className="size-7" />, href: "https://www.instagram.com/ausaf_tahmid", label: "Instagram" },
   { icon: <FaFacebook className="size-7" />, href: "https://www.facebook.com/ahmed.ausaf.tahmid", label: "Facebook" },
   { icon: <FaGithub className="size-7" />, href: "https://github.com/TahmidRahman32?tab=repositories", label: "GitHub" },
   { icon: <FaLinkedin className="size-7" />, href: "https://www.linkedin.com/in/gaziur-rahman-a194a8331", label: "LinkedIn" },
];

const Box1 = ({ socialLinks = defaultSocialLinks }: Footer7Props) => {
   return (
      <div className="space-y-7 text-center flex flex-col justify-center  md:h-[554]">
         {/* <Image src={cvImage} width={300} height={200} alt="cv Image" className="object-cover h-60 rounded-4xl"></Image>

         <p className="font-serif text-secondary-foreground">A CV is not just a document; it’s a story of my journey and growth.</p>
         <Button>Check My Cv</Button>
         <div className="border-t border-gray-300 my-4"></div> */}
         <div className="space-y-10">
            <h1 className="md:text-5xl font-bold text-white">
               Crafting Web & UI
               <AuroraTextEffect text="Experiences"></AuroraTextEffect>
            </h1>
            <p className="text-gray-300 mx-auto md:w-3/4 font-primary-c">
               As a Full-Stack Developer, I specialize in designing and developing scalable, modern web applications with clean architecture and seamless user experiences. I’m passionate about combining robust backend systems with intuitive,
               responsive interfaces that bring ideas to life.
            </p>
         </div>
         <div className="flex justify-center ">
            {/* <ul className="text-accent flex items-center space-x-6">
               {socialLinks.map((social, idx) => (
                  <li key={idx} className="hover:text- font-medium p-1 rounded-full text-black bg-white transition-colors duration-300">
                     <Link target="_blank" rel="noopener noreferrer" title={social.label} href={social.href} aria-label={social.label}>
                        {social.icon}
                     </Link>
                  </li>
               ))}
            </ul> */}
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
         </div>
         <motion.a
            href="/contact"
            aria-label="Contact Me"
            whileHover={{ scale: 1.2, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            className="w-28 h-10 rounded-full bg-white/10 hover:bg-blue-100/20 border border-white/10 hover:border-blue-100/50 flex items-center justify-center text-gray-200 hover:text-blue-400 transition-all duration-300 lg:absolute bottom-22 lg:bottom-32 left-1/4 transform -translate-x-1/2 ml-[50%] lg:ml-0 "
         >
           Contact Me
         </motion.a>
         
      </div>
   );
};

export default Box1;
