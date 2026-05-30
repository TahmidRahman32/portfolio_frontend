// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// // import { serverFetch } from "@/lib/server-fetch";
// // import { UserInfo } from "@/types/user.interface";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { getCookie } from "./tokenHandlers";
// import { serverFetch } from "@/lib/server-fetch";
// import { UserInfo } from "@/Types/user.interfece";

// // import { getCookie } from "./tokenHandlers";

// export const getUserInfo = async (): Promise<UserInfo | any> => {
//    let userInfo: UserInfo | any;
//    try {
//       const response = await serverFetch.get("/auth/me", {
//          next: { tags: ["user-info"], revalidate: 180 },
//       });

//       const result = await response.json();

//       if (result.success) {
//          const accessToken = await getCookie("accessToken");

//          if (!accessToken) {
//             throw new Error("No access token found");
//          }

//          const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

//          userInfo = {
//             name: verifiedToken.name || "Unknown User",
//             email: verifiedToken.email,
//             role: verifiedToken.role,
//          };
//       }

//       userInfo = {
//          name: result.data.admin?.name || result.data.user?.name || result.data.name || "Unknown User",
//          ...result.data,
//       };

//       return userInfo;
//    } catch (error: any) {
//       console.log(error);
//       return {
//          id: "",
//          name: "Unknown User",
//          email: "",
//          role: "USER",
//       };
//    }
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
// import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { UserInfo } from "@/Types/user.interfece";
import { cache } from "react";
// import { UserInfo } from "@/Types/user.interfece";

const getUserInfoUncached = async (): Promise<UserInfo | any> => {
   let userInfo: UserInfo | any;
   try {
      const response = await serverFetch.get("/auth/me", {
         cache: "force-cache",
         next: { tags: ["user-info"] },
      });

      const result = await response.json();

      if (result.success) {
         const accessToken = await getCookie("accessToken");

         if (!accessToken) {
            throw new Error("No access token found");
         }

         const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

         userInfo = {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
         };
      }

      userInfo = {
         name: result.data.admin?.name || result.data.user?.name || result.data.super_admin?.name || result.data.name || "Unknown User",
         ...result.data,
      };

      return userInfo;
   } catch (error: any) {
      console.log(error);
      return {
         id: "",
         name: "Unknown User",
         email: "",
         role: "USER",
      };
   }
};

// Wrap with React's cache to deduplicate calls within a single request
export const getUserInfo = cache(getUserInfoUncached);
