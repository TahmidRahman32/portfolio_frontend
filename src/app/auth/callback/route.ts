import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { BACKEND_API_URL } from "@/lib/api-url";

function getSafeRedirectPath(path: string | null, origin: string): string {
   if (!path || !path.startsWith("/") || path.startsWith("//")) return "/user/dashboard";

   try {
      const destination = new URL(path, origin);
      if (destination.origin !== origin) return "/user/dashboard";
      return `${destination.pathname}${destination.search}${destination.hash}`;
   } catch {
      return "/user/dashboard";
   }
}

function loginRedirect(request: NextRequest): NextResponse {
   const destination = new URL("/login", request.url);
   destination.searchParams.set("error", "OAuth login failed");
   return NextResponse.redirect(destination);
}

export async function GET(request: NextRequest) {
   const code = request.nextUrl.searchParams.get("code");
   if (!code) return loginRedirect(request);

   try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      let exchangeResponse: Response;
      try {
         exchangeResponse = await fetch(`${BACKEND_API_URL}/auth/oauth/exchange`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
            cache: "no-store",
            signal: controller.signal,
         });
      } finally {
         clearTimeout(timeoutId);
      }
      const exchangeResult = await exchangeResponse.json();
      const accessToken = exchangeResult?.data?.accessToken;
      const refreshToken = exchangeResult?.data?.refreshToken;

      if (!exchangeResponse.ok || !exchangeResult?.success || typeof accessToken !== "string" || typeof refreshToken !== "string") {
         console.error("OAuth token exchange failed", exchangeResult?.message || exchangeResponse.statusText);
         return loginRedirect(request);
      }

      if (!process.env.JWT_SECRET) {
         throw new Error("JWT_SECRET is not configured for the frontend");
      }

      const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      if (typeof verifiedToken === "string" || typeof verifiedToken.exp !== "number") {
         throw new Error("OAuth access token is invalid");
      }
      const verifiedRefreshToken = jwt.decode(refreshToken);
      if (typeof verifiedRefreshToken !== "object" || !verifiedRefreshToken || typeof verifiedRefreshToken.exp !== "number") {
         throw new Error("OAuth refresh token is invalid");
      }

      const accessTokenMaxAge = Math.max(0, verifiedToken.exp - Math.floor(Date.now() / 1000));
      const refreshTokenMaxAge = Math.max(0, verifiedRefreshToken.exp - Math.floor(Date.now() / 1000));
      if (accessTokenMaxAge === 0 || refreshTokenMaxAge === 0) {
         throw new Error("OAuth tokens are expired");
      }
      const response = NextResponse.redirect(new URL(getSafeRedirectPath(request.nextUrl.searchParams.get("redirect"), request.nextUrl.origin), request.url));
      const cookieOptions = {
         httpOnly: true,
         secure: request.nextUrl.protocol === "https:",
         sameSite: "lax" as const,
         path: "/",
      };

      response.cookies.set("accessToken", accessToken, {
         ...cookieOptions,
         maxAge: accessTokenMaxAge,
      });
      response.cookies.set("refreshToken", refreshToken, {
         ...cookieOptions,
         maxAge: refreshTokenMaxAge,
      });
      response.headers.set("Cache-Control", "no-store");
      response.headers.set("Referrer-Policy", "no-referrer");
      return response;
   } catch (error) {
      console.error("OAuth callback exchange failed", error);
      return loginRedirect(request);
   }
}
