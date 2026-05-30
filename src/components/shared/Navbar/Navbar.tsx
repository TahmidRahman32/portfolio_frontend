
import { MailIcon, SearchIcon } from "lucide-react";
// import NotificationMenu from "@/components/notification-menu";
// import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { ModeToggle } from "../ThemeToggle";
// import SparkleNavbar from "../lightswind/sparkle-navbar";
import Link from "next/link";
import MobileMenu from "@/components/globalInventory/moblie-menu";
import SparkleNavbar from "@/components/lightswind/sparkle-navbar";
import NotificationMenu from "@/components/globalInventory/notification-menu";
import { ModeToggle } from "@/components/globalInventory/ThemeToggle";
import { getUserInfo } from "@/components/services/auth/getUserInfo";
import { UserInfo } from "@/Types/user.interfece";
import NavDropdownMenu from "@/components/globalInventory/NavDropdownMenu";
import { getCookie } from "@/components/services/auth/tokenHandlers";
// import MobileMenu from "../moblie-menu";

const teams = ["Acme Inc.", "coss.com", "Junon"];

// Navigation links array to be used in both desktop and mobile menus

export default async function Navbar() {
  const userInfo = (await getUserInfo()) as UserInfo;
  const accessToken = await getCookie("accessToken");
   return (
      <div className="container mx-auto ">
         <header className=" px-4 md:px-6 shadow container mx-auto md:rounded-full dark:bg-input fixed z-50 ">
            <div className="flex h-16 items-center justify-between gap-4">
               {/* Left side */}
               <div className="flex flex-1 items-center gap-2">
                  {/* Mobile menu trigger */}
                  <div className="flex  items-center md:hidden">
                     {" "}
                     <MobileMenu />
                  </div>

                  <div className="md:flex items-center gap-6 hidden">
                     {/* Search form */}
                     <div className="relative">
                        <Input className="peer h-8 ps-8 pe-2" placeholder="Search..." type="search" />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                           <SearchIcon size={16} />
                        </div>
                     </div>
                  </div>
               </div>
               {/* Middle area */}
               <div className="hidden md:flex md:flex-1 md:justify-center gap-4">
                  <SparkleNavbar items={["Home", "About", "Services", "Contact", "Resume", "Dashboard"]} routes={["/", "/about", "/services", "/contact", "/resume", "admin/dashboard"]} color="#080808" />
               </div>

               {/* Right side */}
               <div className="flex flex-1 items-center justify-end gap-4">
                  <div className="flex items-center gap-2">
                     {/* <NotificationMenu /> */}
                     {/* <ModeToggle /> */}
                  </div>
                  {/* User menu */}
                  {/* <UserMenu /> */}
                 {accessToken && <NavDropdownMenu userinfo={userInfo} />}
               </div>
            </div>
         </header>
      </div>
   );
}
