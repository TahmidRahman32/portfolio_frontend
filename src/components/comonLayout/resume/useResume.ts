

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createResume, fetchResume, deleteResumeData, ResumeData as ApiResumeData } from "./resumeActions";
// import { createResume, fetchResume, deleteResumeData, ResumeData as ApiResumeData } from "@/app/actions/resumeActions";

// ── Types ──────────────────────────────────────────────────────────────────────
export type ApiStatus = "idle" | "loading" | "saving" | "saved" | "error";

export interface UseResumeApiReturn {
   apiStatus: ApiStatus;
   isSaving: boolean;
   lastSaved: Date | null;
   hasSaved: boolean;
   saveResume: (data: ApiResumeData) => Promise<boolean>;
   loadResume: () => Promise<ApiResumeData | null>;
   deleteResume: () => Promise<boolean>;
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useResumeApi(): UseResumeApiReturn {
   const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
   const [lastSaved, setLastSaved] = useState<Date | null>(null);
   const [hasSaved, setHasSaved] = useState(false);
   const toastIdRef = useRef<string | number | null>(null);

   // ── Save ───────────────────────────────────────────────────────────────────
   const saveResume = useCallback(async (data: ApiResumeData): Promise<boolean> => {
      setApiStatus("saving");

      // Show persistent loading toast
      toastIdRef.current = toast.loading("Saving your resume…", {
         description: "Please wait while we securely store your data.",
      });

      try {
         const result = await createResume(data);
           console.log(result, "save resume")
         if (result.success) {
            setApiStatus("saved");
            setLastSaved(new Date());
            setHasSaved(true);

            toast.success("Resume saved!", {
               id: toastIdRef.current,
               description: "Your resume has been saved successfully.",
               duration: 3000,
            });

            return true;
         } else {
            setApiStatus("error");

            // Handle specific error codes
            const msg = getErrorMessage(result.code, result.message);
            toast.error("Failed to save", {
               id: toastIdRef.current,
               description: msg,
               duration: 5000,
               action: result.code === "NO_TOKEN" ? { label: "Login", onClick: () => (window.location.href = "/login") } : { label: "Retry", onClick: () => saveResume(data) },
            });

            return false;
         }
      } catch (err) {
         setApiStatus("error");
         toast.error("Something went wrong", {
            id: toastIdRef.current,
            description: "Unexpected error. Please try again.",
            duration: 5000,
         });
         return false;
      }
   }, []);

   // ── Load ───────────────────────────────────────────────────────────────────
   const loadResume = useCallback(async (): Promise<ApiResumeData | null> => {
      setApiStatus("loading");
      const loadToast = toast.loading("Loading your resume…");

      try {
         const result = await fetchResume();
         console.log(result, "resume actions")

         if (result.success && result.data) {
            setApiStatus("idle");
            toast.success("Resume loaded", {
               id: loadToast,
               description: "Your saved resume has been restored.",
               duration: 2500,
            });
            return result.data as ApiResumeData;
         } else {
            setApiStatus("idle");

            if (result.code === "NOT_FOUND") {
               toast.info("No saved resume found", {
                  id: loadToast,
                  description: "Start filling in your details to create one.",
                  duration: 3000,
               });
            } else if (result.code === "NO_TOKEN") {
               toast.warning("Not logged in", {
                  id: loadToast,
                  description: "Login to save and load your resume.",
                  duration: 4000,
                  action: { label: "Login", onClick: () => (window.location.href = "/login") },
               });
            } else {
               toast.dismiss(loadToast);
            }
            return null;
         }
      } catch {
         setApiStatus("error");
         toast.error("Failed to load resume", {
            id: loadToast,
            description: "Check your connection and try again.",
            duration: 4000,
         });
         return null;
      }
   }, []);

   // ── Delete ─────────────────────────────────────────────────────────────────
   const deleteResume = useCallback(async (): Promise<boolean> => {
      const confirmed = window.confirm("Are you sure you want to delete your saved resume? This cannot be undone.");
      if (!confirmed) return false;

      const delToast = toast.loading("Deleting resume…");

      try {
         const result = await deleteResumeData();

         if (result.success) {
            setLastSaved(null);
            setHasSaved(false);
            setApiStatus("idle");
            toast.success("Resume deleted", {
               id: delToast,
               description: "Your resume has been permanently removed.",
               duration: 3000,
            });
            return true;
         } else {
            toast.error("Could not delete", {
               id: delToast,
               description: result.message || "Please try again.",
               duration: 4000,
            });
            return false;
         }
      } catch {
         toast.error("Delete failed", {
            id: delToast,
            description: "Unexpected error. Please try again.",
            duration: 4000,
         });
         return false;
      }
   }, []);

   return {
      apiStatus,
      isSaving: apiStatus === "saving",
      lastSaved,
      hasSaved,
      saveResume,
      loadResume,
      deleteResume,
   };
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getErrorMessage(code?: string, fallback?: string): string {
   switch (code) {
      case "NO_TOKEN":
         return "You need to be logged in to save your resume.";
      case "VALIDATION_ERROR":
         return fallback || "Please check all required fields.";
      case "HTTP_401":
         return "Session expired. Please log in again.";
      case "HTTP_403":
         return "You don't have permission to perform this action.";
      case "HTTP_500":
         return "Server error. Please try again in a moment.";
      case "FETCH_ERROR":
         return "Network error. Check your connection.";
      default:
         return fallback || "Something went wrong. Please try again.";
   }
}