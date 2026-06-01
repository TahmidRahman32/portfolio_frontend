// // lib/oauth-handler.ts
// "use client";

// /**
//  * Initiates OAuth flow for Google or GitHub login
//  * Redirects user to backend OAuth endpoint
//  */
// export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
//    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

//    // Build OAuth URL with redirect parameter
//    const oauthUrl = new URL(`/auth/${provider}`, API_URL);
 

//    if (redirectTo) {
//       oauthUrl.searchParams.set("redirect", redirectTo);
//    }

//    console.log(`🔄 Initiating ${provider} OAuth login...`);
//    console.log(`📡 Redirecting to: ${oauthUrl.toString()}`);

//    // Redirect user to OAuth endpoint
//    // The backend will handle the OAuth flow with Passport
//    // and redirect back to the callback URL
//     window.location.href = oauthUrl.toString();
//    //  window.location.href = "http://localhost:5000/api/v1/auth/google?redirect=%2Fdashboard";
// }

// /**
//  * Check if we're returning from OAuth callback
//  * Extract any error messages from URL params
//  */
// export function getOAuthCallbackStatus() {
//    if (typeof window === "undefined") return null;

//    const params = new URLSearchParams(window.location.search);
//    const error = params.get("error");
//    const code = params.get("code");

//    return {
//       error: error ? decodeURIComponent(error) : null,
//       code: code,
//       isCallback: !!error || !!code,
//    };
// }

// /**
//  * Clear OAuth callback params from URL
//  */
// export function clearOAuthParams() {
//    if (typeof window === "undefined") return;

//    const url = new URL(window.location.toString());
//    url.searchParams.delete("error");
//    url.searchParams.delete("code");
//    url.searchParams.delete("state");

//    window.history.replaceState({}, document.title, url.toString());
// }


// lib/oauth-handler.ts (or components/services/auth/oauth-handler.ts)
"use client";

/**
 * Initiates OAuth flow for Google or GitHub login
 * Redirects user to backend OAuth endpoint
 */
export function initiateOAuthLogin(provider: "google" | "github", redirectTo?: string) {
  // Use the full API URL that includes the auth path
  // Backend routes are at: /api/v1/auth/google and /api/v1/auth/github
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  // Construct the full OAuth endpoint URL
  // If API_URL is "http://localhost:5000/api/v1"
  // We want: "http://localhost:5000/api/v1/auth/google?redirect=/dashboard"
  const oauthUrl = `${API_URL}/auth/${provider}`;
  
  // Add redirect parameter if provided
  const urlWithParams = redirectTo 
    ? `${oauthUrl}?redirect=${encodeURIComponent(redirectTo)}`
    : oauthUrl;

  // console.log(`🔄 Initiating ${provider} OAuth login...`);
  // console.log(`📡 Redirecting to: ${urlWithParams}`);

  // Redirect user to OAuth endpoint
  // The backend will handle the OAuth flow with Passport
  // and redirect back to the callback URL
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