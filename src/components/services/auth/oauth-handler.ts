

"use client";

import { BACKEND_API_URL } from "@/lib/api-url";

/**
 * Initiates OAuth flow for Google or GitHub login
 * Redirects user to backend OAuth endpoint
 */
export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
   const oauthUrl = new URL(`${BACKEND_API_URL}/auth/${provider}`);
   if (redirectTo) oauthUrl.searchParams.set("redirect", redirectTo);
   window.location.assign(oauthUrl.toString());
}

/**
 * Check if we're returning from OAuth callback
 */
export function getOAuthCallbackStatus() {
   if (typeof window === "undefined") return null;

   const params = new URLSearchParams(window.location.search);
   const error = params.get("error");

   return {
      error,
      isCallback: !!error,
   };
}

/**
 * Clear OAuth callback params from URL
 */
export function clearOAuthParams() {
   if (typeof window === "undefined") return;

   const url = new URL(window.location.toString());
   url.searchParams.delete("error");

   window.history.replaceState({}, document.title, url.toString());
}