import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/auth-utils";
import type { UserRole } from "./lib/auth-utils";

export function proxy(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   const accessToken = request.cookies.get("accessToken")?.value;
   const refreshToken = request.cookies.get("refreshToken")?.value;
   let userRole: UserRole | null = null;

   if (accessToken && process.env.JWT_SECRET) {
      try {
         const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
         if (typeof verifiedToken !== "string") {
            const role = verifiedToken.role;
            if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "USER") {
               userRole = role;
            } else {
               throw new Error("Access token has no valid user role");
            }
         }
      } catch {
         if (!refreshToken) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            return response;
         }
      }
   } else if (accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   if (userRole && isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
   }

   const routeOwner = getRouteOwner(pathname);
   if (routeOwner === null) return NextResponse.next();

   if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
   }

   if (!userRole && refreshToken) return NextResponse.next();

   if (routeOwner !== "COMMON" && userRole !== routeOwner) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
   ],
};
