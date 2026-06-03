

"use client";

/**
 * Initiates OAuth flow for Google or GitHub login
 * Redirects user to backend OAuth endpoint
 */
export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

   // ✅ Important: Use the root domain for OAuth (without /api/v1)
   const baseURL = API_URL.replace("/api/v1", "");
   const oauthUrl = `${baseURL}/api/v1/auth/${provider}`;
   console.log(oauthUrl, "check url")

   // ✅ Pass redirect path as state parameter
   const urlWithParams = redirectTo ? `${oauthUrl}?redirect=${encodeURIComponent(redirectTo)}` : oauthUrl;

   console.log(`🔵 Initiating ${provider} OAuth login...`);
   console.log(`📡 OAuth endpoint: ${oauthUrl}`);
   console.log(`🔄 Will redirect to: ${redirectTo}`);

   // Redirect user to OAuth endpoint
   window.location.href = urlWithParams;
}

/**
 * Check if we're returning from OAuth callback
 */
export function getOAuthCallbackStatus() {
   if (typeof window === "undefined") return null;

   const params = new URLSearchParams(window.location.search);
   const error = params.get("error");

   return {
      error: error ? decodeURIComponent(error) : null,
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

/**
 * ✅ FIXED: Verify OAuth authentication by checking if user can access protected endpoint
 */
export async function verifyOAuthAuthentication(): Promise<boolean> {
   try {
      console.log("🔐 Verifying OAuth authentication...");

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API_URL}/auth/me`, {
         method: "GET",
         credentials: "include", // ✅ CRITICAL: Send cookies
         headers: {
            "Content-Type": "application/json",
         },
      });

      console.log(`📡 Verification response status: ${response.status}`);

      if (response.ok) {
         const data = await response.json();
         console.log("✅ OAuth authentication verified!", data);
         return true;
      }

      if (response.status === 401) {
         console.error("❌ Not authenticated - 401 response");
         return false;
      }

      console.error(`❌ Verification failed - Status: ${response.status}`);
      return false;
   } catch (error) {
      console.error("❌ Verification error:", error);
      return false;
   }
}

/**
 * Get currently authenticated user
 */
export async function getCurrentUser() {
   try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API_URL}/auth/me`, {
         method: "GET",
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