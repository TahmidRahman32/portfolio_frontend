import { getNewAccessToken } from "@/components/services/auth/auth.service";
import { getCookie } from "@/components/services/auth/tokenHandlers";

const BACKEND_API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace(/\/$/, "");

const createUnavailableResponse = (message: string) =>
   new Response(JSON.stringify({ success: false, message, data: null }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
   });

// /auth/login
const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
   const { headers, ...restOptions } = options;
   const accessToken = await getCookie("accessToken");

   // to stop recursion loop
   if (endpoint !== "/auth/refresh-token") {
      try {
         await getNewAccessToken();
      } catch {
         // Ignore refresh failures and fall back to the main request
      }
   }

   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 5000);

   try {
      const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
         headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
         },
         ...restOptions,
         signal: controller.signal,
      });

      return response;
   } catch (error: any) {
      if (error?.name !== "AbortError") {
         console.warn(`[serverFetch] ${endpoint} failed:`, error?.message || error);
      }

      return createUnavailableResponse(error?.name === "AbortError" ? "Backend request timed out" : "Backend unavailable");
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
