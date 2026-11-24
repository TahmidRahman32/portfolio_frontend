import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { BACKEND_API_URL } from "@/lib/api-url";
import { authDiagnostic, authDiagnosticError } from "@/lib/auth-diagnostics";

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
   authDiagnostic("oauth.frontend_callback.received", { codePresent: Boolean(code) });
   if (!code) {
      authDiagnostic("oauth.frontend_callback.rejected", { reason: "missing_code" });
      return loginRedirect(request);
   }

   let stage = "exchange_request";
   let exchangeStatus: number | null = null;
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
      exchangeStatus = exchangeResponse.status;
      const exchangeResult = await exchangeResponse.json();
      const accessToken = exchangeResult?.data?.accessToken;
      const refreshToken = exchangeResult?.data?.refreshToken;
      authDiagnostic("oauth.frontend_callback.exchange_response", {
         status: exchangeResponse.status,
         successful: exchangeResponse.ok && exchangeResult?.success === true,
         accessTokenReceived: typeof accessToken === "string",
         refreshTokenReceived: typeof refreshToken === "string",
      });

      if (!exchangeResponse.ok || !exchangeResult?.success || typeof accessToken !== "string" || typeof refreshToken !== "string") {
         authDiagnostic("oauth.frontend_callback.rejected", { reason: "exchange_failed", status: exchangeResponse.status });
         return loginRedirect(request);
      }

      stage = "jwt_secret_validation";
      if (!process.env.JWT_SECRET) {
         authDiagnostic("oauth.frontend_callback.jwt_secret", { configured: false });
         throw new Error("JWT_SECRET is not configured for the frontend");
      }

      stage = "access_token_verification";
      const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      if (typeof verifiedToken === "string" || typeof verifiedToken.exp !== "number") {
         throw new Error("OAuth access token is invalid");
      }
      authDiagnostic("oauth.frontend_callback.access_token_verified", { verified: true });

      stage = "refresh_token_validation";
      const verifiedRefreshToken = jwt.decode(refreshToken);
      if (typeof verifiedRefreshToken !== "object" || !verifiedRefreshToken || typeof verifiedRefreshToken.exp !== "number") {
         throw new Error("OAuth refresh token is invalid");
      }

      const accessTokenMaxAge = Math.max(0, verifiedToken.exp - Math.floor(Date.now() / 1000));
      const refreshTokenMaxAge = Math.max(0, verifiedRefreshToken.exp - Math.floor(Date.now() / 1000));
      if (accessTokenMaxAge === 0 || refreshTokenMaxAge === 0) {
         throw new Error("OAuth tokens are expired");
      }

      stage = "cookie_setting";
      const response = NextResponse.redirect(new URL(getSafeRedirectPath(request.nextUrl.searchParams.get("redirect"), request.nextUrl.origin), request.url));
      const cookieOptions = {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:",
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
      authDiagnostic("oauth.frontend_callback.cookies_set", {
         accessTokenCookieSet: true,
         refreshTokenCookieSet: true,
         httpOnly: true,
         secure: cookieOptions.secure,
         sameSite: cookieOptions.sameSite,
         path: cookieOptions.path,
      });
      return response;
   } catch (error) {
      authDiagnosticError("oauth.frontend_callback.failed", error, { stage, exchangeStatus });
      return loginRedirect(request);
   }
}
