"use client";
import { ChainItem } from "@/components/comonLayout/about/SkillCarousel";
import ModernChainCarousel from "@/components/comonLayout/HeroSection/container/Carousel";
import ViewReview from "@/components/comonLayout/HeroSection/container/Review";
import HeroSection from "@/components/comonLayout/HeroSection/HeroSection";
import ResumePromo from "@/components/comonLayout/HeroSection/ResumePromo";
// import ChainCarousel, { ChainItem } from "@/components/about/SkillCarousel";
// import Carousel from "@/components/HeroSection/container/Carousel";
// import ViewReview from "@/components/HeroSection/container/Review";
// import HeroSection from "@/components/HeroSection/HeroSection";
// import ResumePromo from "@/components/HeroSection/ResumePromo";
// import TemplatesPage from "@/components/HeroSection/Tamplete";
// import ProjectsSection from "@/components/projects/Project";
import { Home, User, Briefcase, Phone, FileText, LayoutDashboard, LogIn, UserPlus, FileBadge, PanelsTopLeft, MessageSquareQuote, LayoutTemplate, Columns3 } from "lucide-react";

const chainData: ChainItem[] = [
   {
      id: 1,
      name: "Home",
      icon: Home,
      details: "Welcome section",
   },
   {
      id: 2,
      name: "About",
      icon: User,
      details: "Learn more about me",
   },
   {
      id: 3,
      name: "Service",
      icon: Briefcase,
      details: "What I offer",
   },
   {
      id: 4,
      name: "Contact",
      icon: Phone,
      details: "Get in touch",
   },
   {
      id: 5,
      name: "Resume",
      icon: FileText,
      details: "View my resume",
   },
   {
      id: 6,
      name: "Dashboard",
      icon: LayoutDashboard,
      details: "Admin dashboard",
   },
   {
      id: 7,
      name: "Login",
      icon: LogIn,
      details: "Access your account",
   },
   {
      id: 8,
      name: "Register",
      icon: UserPlus,
      details: "Create a new account",
   },
   {
      id: 9,
      name: "CV",
      icon: FileBadge,
      details: "Professional CV builder",
   },
   {
      id: 10,
      name: "Footer",
      icon: Columns3,
      details: "Website footer section",
   },
   {
      id: 11,
      name: "Review",
      icon: MessageSquareQuote,
      details: "Client feedback & testimonials",
   },
   {
      id: 12,
      name: "Navbar",
      icon: PanelsTopLeft,
      details: "Top navigation menu",
   },
   {
      id: 13,
      name: "Template",
      icon: LayoutTemplate,
      details: "Ready-made website templates",
   },
];

const HomePage = () => {
  return (
     <div className="m-0 p-0">
        <HeroSection></HeroSection>
        <ResumePromo></ResumePromo>
        <ModernChainCarousel items={chainData} visibleItemCount={3} scrollSpeedMs={2000} onChainSelect={(id, name) => console.log("Selected:", id, name)} />
        <ViewReview></ViewReview>
     </div>
  );
};
export default HomePage;