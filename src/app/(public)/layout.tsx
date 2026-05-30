// import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Footer from "./Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className=" bg-sidebar-ring ">
         <Navbar />
         <div className="min-h-dvh">{children}</div>
         <Footer></Footer>
      </div>
   );
};

export default PublicLayout;
