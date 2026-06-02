
// "use client";

// /**
//  * Initiates OAuth flow for Google or GitHub login
//  * Redirects user to backend OAuth endpoint
//  */
// export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
//   // Use the full API URL that includes the auth path
//   // Backend routes are at: /api/v1/auth/google and /api/v1/auth/github
//   const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";
  
//   // Construct the full OAuth endpoint URL
//   // If API_URL is "http://localhost:5000/api/v1"
//   // We want: "http://localhost:5000/api/v1/auth/google?redirect=/dashboard"
//   const oauthUrl = `${API_URL}/auth/${provider}`;
  
//   // Add redirect parameter if provided
//   const urlWithParams = redirectTo 
//     ? `${oauthUrl}?redirect=${encodeURIComponent(redirectTo)}`
//     : oauthUrl;

//   // console.log(`🔄 Initiating ${provider} OAuth login...`);
//   // console.log(`📡 Redirecting to: ${urlWithParams}`);

//   // Redirect user to OAuth endpoint
//   // The backend will handle the OAuth flow with Passport
//   // and redirect back to the callback URL
//   window.location.href = urlWithParams;
// }

// /**
//  * Check if we're returning from OAuth callback
//  * Extract any error messages from URL params
//  */
// export function getOAuthCallbackStatus() {
//   if (typeof window === "undefined") return null;

//   const params = new URLSearchParams(window.location.search);
//   const error = params.get("error");
//   const code = params.get("code");

//   return {
//     error: error ? decodeURIComponent(error) : null,
//     code: code,
//     isCallback: !!error || !!code,
//   };
// }

// /**
//  * Clear OAuth callback params from URL
//  */
// export function clearOAuthParams() {
//   if (typeof window === "undefined") return;

//   const url = new URL(window.location.toString());
//   url.searchParams.delete("error");
//   url.searchParams.delete("code");
//   url.searchParams.delete("state");

//   window.history.replaceState({}, document.title, url.toString());
// }

// lib/oauth-handler.ts (or components/services/auth/oauth-handler.ts)
// components/services/auth/oauth-handler.ts - COMPLETE VERSION WITH ALL FUNCTIONS

"use client";

import { serverFetch } from "@/lib/server-fetch";

/**
 * Initiates OAuth flow for Google or GitHub login
 * Redirects user to backend OAuth endpoint
 */
export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  const oauthUrl = `${API_URL}/auth/${provider}`;
  
  const urlWithParams = redirectTo 
    ? `${oauthUrl}?redirect=${encodeURIComponent(redirectTo)}`
    : oauthUrl;

  console.log(`🔄 Initiating ${provider} OAuth login...`);
  console.log(`📡 Redirecting to: ${urlWithParams}`);

  window.location.href = urlWithParams;
}

/**
 * Check if we're returning from OAuth callback
 * Extract any error messages from URL params
 */
export function getOAuthCallbackStatus() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  const code = params.get("code");

  return {
    error: error ? decodeURIComponent(error) : null,
    code: code,
    isCallback: !!error || !!code,
  };
}

/**
 * Clear OAuth callback params from URL
 */
export function clearOAuthParams() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.toString());
  url.searchParams.delete("error");
  url.searchParams.delete("code");
  url.searchParams.delete("state");

  window.history.replaceState({}, document.title, url.toString());
}

/**
 * ✅ FIXED: Verify that OAuth authentication was successful
 * 
 * This function:
 * 1. Calls a protected endpoint that requires authentication
 * 2. If successful, backend has set auth cookies
 * 3. Returns true if authentication verified
 * 4. Returns false if not authenticated
 * 
 * Why this is needed:
 * - After OAuth callback, the backend sets auth cookies
 * - But we need to verify the cookies are actually set and valid
 * - We do this by calling a protected endpoint
 * - If it returns 200, user is authenticated
 * - If it returns 401, authentication failed
 */
export async function verifyOAuthAuthentication(): Promise<boolean> {
  try {
    console.log("🔐 Verifying OAuth authentication...");

    // Call a protected endpoint that requires authentication
    // This endpoint will fail if cookies are not set or invalid
    const response = await serverFetch.get("/auth/me", {
       credentials: "include",
       cache: "force-cache",
       next: { tags: ["user-info"] },
    });

    // If we get 200, user is authenticated
    if (response.ok) {
      console.log("✅ OAuth authentication verified!");
      return true;
    }

    // If we get 401, user is not authenticated
    if (response.status === 401) {
      console.error("❌ OAuth authentication failed - 401 Unauthorized");
      return false;
    }

    // For other errors, log and return false
    console.error(`❌ OAuth verification failed - Status: ${response.status}`);
    return false;
  } catch (error) {
    console.error("❌ OAuth verification error:", error);
    return false;
  }
}

/**
 * Check if user has valid auth cookies
 * Similar to verifyOAuthAuthentication but without throwing errors
 */
export async function hasAuthCookies(): Promise<boolean> {
  try {
     const response = await serverFetch.get("/auth/me", {
        credentials: "include",
        cache: "force-cache",
        next: { tags: ["user-info"] },
     });

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get current authenticated user info from backend
 * Only works if user is authenticated (cookies are set)
 */
export async function getCurrentUser() {
  try {
    const response = await serverFetch.get("/auth/me", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}