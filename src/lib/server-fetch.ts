import { getNewAccessToken } from "@/components/services/auth/auth.service";
import { getCookie } from "@/components/services/auth/tokenHandlers";
import { BACKEND_API_URL } from "@/lib/api-url";

const createUnavailableResponse = (message: string) =>
   new Response(JSON.stringify({ success: false, message, data: null }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
   });

// /auth/login
const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
   const { headers, ...restOptions } = options;

   if (endpoint !== "/auth/refresh-token" && endpoint !== "/auth/login" && endpoint !== "/auth/oauth/exchange") {
      await getNewAccessToken();
   }

   const accessToken = await getCookie("accessToken");
   const requestHeaders = new Headers(headers);
   if (accessToken) {
      if (!requestHeaders.has("Cookie")) requestHeaders.set("Cookie", `accessToken=${accessToken}`);
      if (!requestHeaders.has("Authorization")) requestHeaders.set("Authorization", `Bearer ${accessToken}`);
   }
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 5000);

   try {
      const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
         ...restOptions,
         headers: requestHeaders,
         signal: controller.signal,
      });

      return response;
   } catch (error: unknown) {
      const isAbortError = error instanceof Error && error.name === "AbortError";
      if (!isAbortError) {
         console.warn(`[serverFetch] ${endpoint} failed:`, error instanceof Error ? error.message : error);
      }

      return createUnavailableResponse(isAbortError ? "Backend request timed out" : "Backend unavailable");
   } finally {
      clearTimeout(timeoutId);
   }
};

export const serverFetch = {
   get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

   post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

   put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

   patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

   delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};

/**
 *
 * serverFetch.get("/auth/me")
 * serverFetch.post("/auth/login", { body: JSON.stringify({}) })
 */
