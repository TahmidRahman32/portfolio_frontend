// app/resume/page.tsx or components/ResumeEditor.tsx

"use client";

import { useState } from "react";
import { toast } from "sonner";
import {  createResume, deleteResumeData, fetchResume } from "./resumeActions";
// import { createOrUpdateResume, fetchResume, deleteResumeData } from "@/app/actions/resumeActions";

interface ResumeData {
   id?: string;
   summary: string;
   personalInfo?: any;
   education?: any[];
   workExperience?: any[];
   skills?: any[];
   projects?: any[];
   certifications?: any[];
}

export default function ResumeEditor() {
   const [resume, setResume] = useState<ResumeData | null>(null);
   const [isLoading, setIsLoading] = useState(false);

   /**
    * Load resume from server
    */
   const handleLoad = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Loading resume...");

      try {
         const result = await fetchResume();

         if (result.success) {
            setResume(result.data);
            toast.dismiss(toastId);
            toast.success("Resume loaded successfully!", {
               description: `Last updated: ${new Date(result.data.updatedAt).toLocaleDateString()}`,
            });
         } else {
            toast.dismiss(toastId);

            // Handle specific error codes
            if (result.code === "NO_TOKEN") {
               toast.error("Authentication Required", {
                  description: "Please login to load your resume.",
               });
            } else if (result.code === "NOT_FOUND") {
               toast.info("No Resume Found", {
                  description: "You haven't created a resume yet. Create one now!",
               });
            } else {
               toast.error("Failed to Load Resume", {
                  description: result.message,
               });
            }
         }
      } catch (error) {
         toast.dismiss(toastId);
         toast.error("Error Loading Resume", {
            description: "An unexpected error occurred. Please try again.",
         });
         console.error("Load error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   /**
    * Save/Update resume
    */
   const handleSave = async () => {
      if (!resume) {
         toast.warning("Resume is Empty", {
            description: "Please fill in resume details first.",
         });
         return;
      }

      setIsLoading(true);
      const toastId = toast.loading("Saving resume...");

      try {
         const result = await createResume(resume);

         if (result.success) {
            setResume(result.data);
            toast.dismiss(toastId);
            toast.success("Resume Saved Successfully!", {
               description: "Your resume has been saved to your profile.",
               duration: 3000,
            });
         } else {
            toast.dismiss(toastId);

            // Handle specific error codes
            if (result.code === "NO_TOKEN") {
               toast.error("Authentication Required", {
                  description: "Please login to save your resume.",
               });
            } else {
               toast.error("Failed to Save Resume", {
                  description: result.message,
               });
            }
         }
      } catch (error) {
         toast.dismiss(toastId);
         toast.error("Error Saving Resume", {
            description: "An unexpected error occurred. Please try again.",
         });
         console.error("Save error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   /**
    * Delete resume with confirmation
    */
   const handleDelete = async () => {
      if (!resume) {
         toast.warning("No Resume to Delete", {
            description: "Load a resume first before deleting.",
         });
         return;
      }

      // Show confirmation toast with action buttons
      toast.warning("Delete Resume?", {
         description: "This action cannot be undone. All your resume data will be permanently deleted.",
         duration: 5000,
         action: {
            label: "Delete",
            onClick: async () => {
               await performDelete();
            },
         },
         cancel: {
            label: "Cancel",
            onClick: () => {
               toast.info("Deletion cancelled", {
                  duration: 2000,
               });
            },
         },
      });
   };

   /**
    * Perform actual deletion
    */
   const performDelete = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Deleting resume...");

      try {
         const result = await deleteResumeData();

         if (result.success) {
            setResume(null);
            toast.dismiss(toastId);
            toast.success("Resume Deleted", {
               description: "Your resume has been permanently deleted.",
               duration: 3000,
            });
         } else {
            toast.dismiss(toastId);

            if (result.code === "NO_TOKEN") {
               toast.error("Authentication Required", {
                  description: "Please login to delete your resume.",
               });
            } else {
               toast.error("Failed to Delete Resume", {
                  description: result.message,
               });
            }
         }
      } catch (error) {
         toast.dismiss(toastId);
         toast.error("Error Deleting Resume", {
            description: "An unexpected error occurred. Please try again.",
         });
         console.error("Delete error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   /**
    * Update resume summary
    */
   const handleSummaryChange = (newSummary: string) => {
      setResume((prev) => (prev ? { ...prev, summary: newSummary } : { summary: newSummary }));
   };

   /**
    * Update personal info
    */
   const handlePersonalInfoChange = (newPersonalInfo: any) => {
      setResume((prev) => (prev ? { ...prev, personalInfo: newPersonalInfo } : { personalInfo: newPersonalInfo, summary: "" }));
   };

   return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
               <p className="text-lg text-gray-600">Create, edit, and manage your professional resume</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
               <button onClick={handleLoad} disabled={isLoading} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isLoading ? "Loading..." : "📥 Load Resume"}
               </button>

               <button onClick={handleSave} disabled={isLoading || !resume} className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isLoading ? "Saving..." : "💾 Save Resume"}
               </button>

               <button onClick={handleDelete} disabled={isLoading || !resume} className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isLoading ? "Deleting..." : "🗑️ Delete Resume"}
               </button>
            </div>

            {/* Resume Content Area */}
            {resume ? (
               <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                  {/* Summary Section */}
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
                     <textarea
                        value={resume.summary || ""}
                        onChange={(e) => handleSummaryChange(e.target.value)}
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter your professional summary..."
                     />
                  </div>

                  {/* Personal Info Section */}
                  <div className="border-t pt-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                           type="text"
                           placeholder="Full Name"
                           defaultValue={resume.personalInfo?.fullName || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 fullName: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="email"
                           placeholder="Email"
                           defaultValue={resume.personalInfo?.email || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 email: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="tel"
                           placeholder="Phone"
                           defaultValue={resume.personalInfo?.phone || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 phone: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="text"
                           placeholder="Address"
                           defaultValue={resume.personalInfo?.address || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 address: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="url"
                           placeholder="LinkedIn URL"
                           defaultValue={resume.personalInfo?.linkedin || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 linkedin: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="url"
                           placeholder="GitHub URL"
                           defaultValue={resume.personalInfo?.github || ""}
                           onChange={(e) =>
                              handlePersonalInfoChange({
                                 ...resume.personalInfo,
                                 github: e.target.value,
                              })
                           }
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>

                  {/* Education Section */}
                  <div className="border-t pt-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                     <p className="text-gray-600 text-sm">Add your educational background here</p>
                  </div>

                  {/* Experience Section */}
                  <div className="border-t pt-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
                     <p className="text-gray-600 text-sm">Add your work experience here</p>
                  </div>

                  {/* Skills Section */}
                  <div className="border-t pt-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                     <p className="text-gray-600 text-sm">Add your professional skills here</p>
                  </div>
               </div>
            ) : (
               <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                     <span className="text-3xl">📄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resume Loaded</h3>
                  <p className="text-gray-600 mb-6">Click "Load Resume" to fetch your existing resume or create a new one</p>
                  <button onClick={handleLoad} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                     📥 Load Your Resume
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}
