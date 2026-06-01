// "use client"
// import { logoutUser } from "@/components/services/auth/logoutUser";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { UserInfo } from "@/Types/user.interfece";
// import { ChevronDown } from "lucide-react";
// import profilePhoto from "../../../public/image/account-profile-user-icon--icon-search-engine-10.png"
// import Image from "next/image";

// import Link from "next/link";

// interface NavDropdownMenuProps {
//    // You can add props here if needed, e.g. user info, logout handler, etc.
//    userinfo: UserInfo;
// }
// const NavDropdownMenu = ({ userinfo }: NavDropdownMenuProps) => {
//    const handleLogout = async () => {
//       // Implement your logout logic here, e.g. clear cookies, call logout API, etc.
//       await logoutUser();
//    };
//    return (
//       <div>
//          <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center space-x-2">
//                <span className="text-sm font-medium">{userinfo.name}</span>
//                <ChevronDown size={16} />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className={"w-72"}>
//                <DropdownMenuGroup>
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <div className="flex flex-col justify-center items-center my-5">
//                      <Image src={userinfo.profilePhoto ? userinfo.profilePhoto : profilePhoto} alt="Avatar" className="w-16 h-16 rounded-full border-2 my-2" width={60} height={60} />
//                      <span className="text-sm font-medium">{userinfo.name}</span>
//                      <p>{userinfo.email}</p>
//                   </div>
//                </DropdownMenuGroup>
//                <DropdownMenuSeparator />
//                <DropdownMenuGroup>
//                   <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
//                      <Link href={"/my-profile"}>Profile</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
//                      <Link href={"/my-profile"}>Billing</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
//                      <Link href={"/settings"}>Settings</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                      <Button variant="ghost" onClick={handleLogout} className="w-full text-left bg-red-500">
//                         Logout
//                      </Button>
//                   </DropdownMenuItem>
//                </DropdownMenuGroup>
//             </DropdownMenuContent>
//          </DropdownMenu>
//       </div>
//    );
// };

// export default NavDropdownMenu;

"use client";
import { logoutUser } from "@/components/services/auth/logoutUser";
import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/Types/user.interfece";
import { ChevronDown, LogOut } from "lucide-react";
import profilePhoto from "../../../public/image/account-profile-user-icon--icon-search-engine-10.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface NavDropdownMenuProps {
   userinfo: UserInfo;
}

const NavDropdownMenu = ({ userinfo }: NavDropdownMenuProps) => {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const [isLoggingOut, setIsLoggingOut] = useState(false);

   const handleLogoutClick = () => {
      setShowLogoutModal(true);
   };

   const handleConfirmLogout = async () => {
      setIsLoggingOut(true);
      try {
         await logoutUser();
         // Redirect or handle post-logout logic here
         // window.location.href = '/login'; // Uncomment if needed
      } catch (error) {
         console.error("Logout failed:", error);
      } finally {
         setIsLoggingOut(false);
         setShowLogoutModal(false);
      }
   };

   const handleCancelLogout = () => {
      setShowLogoutModal(false);
   };

   return (
      <>
         <div>
            <DropdownMenu>
               <DropdownMenuTrigger className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{userinfo.name}</span>
                  <ChevronDown size={16} />
               </DropdownMenuTrigger>
               <DropdownMenuContent className={"w-72"}>
                  <DropdownMenuGroup>
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <div className="flex flex-col justify-center items-center my-5">
                        <Image src={userinfo.profilePhoto ? userinfo.profilePhoto : profilePhoto} alt="Avatar" className="w-16 h-16 rounded-full border-2 my-2" width={60} height={60} />
                        <span className="text-sm font-medium">{userinfo.name}</span>
                        <p>{userinfo.email}</p>
                     </div>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
                        <Link href={"/my-profile"}>Profile</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
                        <Link href={"/my-profile"}>Billing</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem className={"font-primary-bebas font-bold py-1"}>
                        <Link href={"/settings"}>Settings</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Button variant="ghost" onClick={handleLogoutClick} className="w-full justify-start text-white hover:text-red-700 border-2 bg-red-600 hover:bg-red-500">
                           <LogOut className="mr-2 h-4 w-4" />
                           Logout
                        </Button>
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         {/* Logout Confirmation Modal */}
         <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>Are you sure you want to log out? You will need to sign in again to access your account.</DialogDescription>
               </DialogHeader>
               <DialogFooter className="gap-2 sm:gap-0 space-x-2">
                  <Button variant="outline" onClick={handleCancelLogout} disabled={isLoggingOut}>
                     Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmLogout} disabled={isLoggingOut}>
                     {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default NavDropdownMenu;
