// // app/actions/resumeActions.ts

// import { getCookie } from "@/components/services/auth/tokenHandlers";
// // import { getCookie } from "@/auth/tokenHandlers";
// import { serverFetch } from "@/lib/server-fetch";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
// export interface ResumeData {
//    id?: string;
//    title: string;
//    fullName: string;
//    email: string;
//    phone: string;
//    summary?: string;
//    experience: ExperienceEntry[];
//    education: EducationEntry[];
//    skills: SkillEntry[];
//    certifications?: CertificationEntry[];
//    languages?: LanguageEntry[];
//    [key: string]: any;
// }

// export interface ExperienceEntry {
//    id?: string;
//    jobTitle: string;
//    company: string;
//    location?: string;
//    startDate: string;
//    endDate?: string;
//    isCurrent?: boolean;
//    description?: string;
// }

// export interface EducationEntry {
//    id?: string;
//    degree: string;
//    institution: string;
//    field: string;
//    graduationDate: string;
//    gpa?: string;
// }

// export interface SkillEntry {
//    id?: string;
//    name: string;
//    proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
//    category?: string;
// }

// export interface CertificationEntry {
//    id?: string;
//    name: string;
//    issuer: string;
//    issueDate: string;
//    expiryDate?: string;
//    credentialURL?: string;
// }

// export interface LanguageEntry {
//    id?: string;
//    language: string;
//    proficiency: "beginner" | "intermediate" | "advanced" | "fluent" | "native";
// }

// export interface ApiResponse<T = any> {
//    success: boolean;
//    message: string;
//    data?: T;
//    code?: string;
//    error?: string;
// }

// /**
//  * Get authorization token from cookies
//  */
// async function getAuthToken(): Promise<string | null> {
//    try {
//       const token = await getCookie("accessToken");
//       return token;
//    } catch (error) {
//       console.error("Failed to get auth token:", error);
//       return null;
//    }
// }
// function validateResumeData(data: Partial<ResumeData>): { valid: boolean; errors: string[] } {
//    const errors: string[] = [];

//    // Required fields
//    if (!data.title?.trim()) errors.push("Resume title is required");
//    if (!data.fullName?.trim()) errors.push("Full name is required");
//    if (!data.email?.trim()) errors.push("Email address is required");
//    if (!data.phone?.trim()) errors.push("Phone number is required");

//    // Email validation
//    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       errors.push("Invalid email format");
//    }

//    // Phone validation (basic)
//    if (data.phone && !/^\d{10,}/.test(data.phone.replace(/\D/g, ""))) {
//       errors.push("Phone number must contain at least 10 digits");
//    }

//    // At least one section should have content
//    const hasContent = (data.experience?.length ?? 0) > 0 || (data.education?.length ?? 0) > 0 || (data.skills?.length ?? 0) > 0;

//    if (!hasContent) {
//       errors.push("Resume must contain at least one section (experience, education, or skills)");
//    }

//    return {
//       valid: errors.length === 0,
//       errors,
//    };
// }

// type FetchOptions = {
//    headers?: HeadersInit;
//    body?: any;
// };

// /**
//  * Transform frontend resume data to backend format
//  */
// function transformResumeData(data: any): any {
//    return {
//       ...data,
//       education: (data.education || []).map((edu: any) => ({
//          degree: edu.degree || "",
//          institution: edu.institution || "",
//          field: edu.field || "",
//          graduationDate: edu.graduationDate || edu.endDate || "",
//          gpa: edu.gpa,
//       })),
//       skills: (data.skills || []).map((skill: any) => ({
//          name: skill.name || "",
//          proficiency: skill.proficiency || skill.level || "beginner",
//          category: skill.category,
//       })),
//       experience: (data.experience || []).map((exp: any) => ({
//          jobTitle: exp.jobTitle || "",
//          company: exp.company || "",
//          location: exp.location,
//          startDate: exp.startDate || "",
//          endDate: exp.endDate,
//          isCurrent: exp.isCurrent || false,
//          description: exp.description,
//       })),
//    };
// }

// // export async function createResume(resumeData: Omit<ResumeData, "id">): Promise<ApiResponse> {
// //    try {
// //       // 1. Check authentication
// //       const token = await getAuthToken();
// //       console.log("🔐 Token check for create:", token ? "✅ Token found" : "❌ No token");

// //       if (!token) {
// //          return {
// //             success: false,
// //             message: "Authentication required. Please login first.",
// //             code: "NO_TOKEN",
// //          };
// //       }

// //       // 2. Validate data
// //       const validation = validateResumeData(resumeData);
// //       if (!validation.valid) {
// //          return {
// //             success: false,
// //             message: "Validation failed",
// //             code: "VALIDATION_ERROR",
// //             error: validation.errors.join("; "),
// //          };
// //       }

// //       // 3. Make request
// //       console.log("📤 Creating new resume...");

// //       const res = await serverFetch.post(`/resume/create`, {
// //          // headers: {
// //          //    Authorization: `Bearer ${token}`,
// //          //    "Content-Type": "application/json",
// //          // },
// //          body: JSON.stringify(resumeData),
// //       });
// //       // const res = await fetch(`${API_URL}/resume/create`, {
// //       //    method: "POST",
// //       //    headers: {
// //       //       Authorization: `Bearer ${token}`,
// //       //       "Content-Type": "application/json",
// //       //    },
// //       //    body: JSON.stringify(resumeData),
// //       // });

// //       const result = await res.json();
// //       console.log("📤 Create response:", result);

// //       // 4. Handle response
// //       if (!res.ok) {
// //          console.error("❌ Create failed:", result.message);

// //          return {
// //             success: false,
// //             message: result.message || "Failed to create resume",
// //             code: `HTTP_${res.status}`,
// //             error: result.error || result.details,
// //          };
// //       }

// //       console.log("✅ Resume created successfully");

// //       return {
// //          success: true,
// //          message: "Resume created successfully",
// //          data: result.data,
// //       };
// //    } catch (error) {
// //       console.error("❌ Resume creation error:", error);

// //       return {
// //          success: false,
// //          message: "Failed to create resume",
// //          code: "FETCH_ERROR",
// //          error: (error as Error).message,
// //       };
// //    }
// // }

// export async function createResume(resumeData: Omit<ResumeData, "id">): Promise<ApiResponse> {
//    try {
//       const validation = validateResumeData(resumeData);
//       if (!validation.valid) {
//          return {
//             success: false,
//             message: "Validation failed",
//             code: "VALIDATION_ERROR",
//             error: validation.errors.join("; "),
//          };
//       }

//       const res = await serverFetch.post(`/resume/create`, {
//          headers: {
//             "Content-Type": "application/json",
//          },
//          body: JSON.stringify(transformResumeData(resumeData)),
//       });

//       const result = await res.json();

//       console.log("response:", result);

//       if (!res.ok) {
//          return {
//             success: false,
//             message: result.message || "Failed to create resume",
//             code: `HTTP_${res.status}`,
//             error: result.error || result.details,
//          };
//       }

//       return {
//          success: true,
//          message: "Resume created successfully",
//          data: result.data,
//       };
//    } catch (error) {
//       return {
//          success: false,
//          message: "Failed to create resume",
//          code: "FETCH_ERROR",
//          error: (error as Error).message,
//       };
//    }
// }
// /**
//  * Fetch resume for current user
//  * GET /api/v1/resume
//  */
// export async function fetchResume() {
//    try {
//       const res = await serverFetch.get(`/resume/all`, {
//          // headers: {
//          //    "Content-Type": "application/json",
//          // },
//       });

//       const result = await res.json();
//       console.log(result, "resume.......................................................");

//       if (!res.ok) {
//          // 404 = resume not found, which is OK for new users
//          if (res.status === 404) {
//             return {
//                success: false,
//                message: "No resume found. Create one first.",
//                code: "NOT_FOUND",
//             };
//          }

//          return {
//             success: false,
//             message: result.message || "Failed to fetch resume",
//             code: `HTTP_${res.status}`,
//          };
//       }

//       return {
//          success: true,
//          message: "Resume fetched successfully",
//          data: result.data,
//       };
//    } catch (error) {
//       console.error("Resume fetch error:", error);
//       return {
//          success: false,
//          message: "Failed to fetch resume",
//          code: "FETCH_ERROR",
//          error: (error as Error).message,
//       };
//    }
// }

// /**
//  * Delete entire resume
//  * DELETE /api/v1/resume
//  */
// export async function deleteResumeData() {
//    try {
//       const token = await getAuthToken();

//       if (!token) {
//          return {
//             success: false,
//             message: "Authentication required. Please login first.",
//             code: "NO_TOKEN",
//          };
//       }

//       const res = await fetch(`${API_URL}/resume`, {
//          method: "DELETE",
//          headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//          },
//       });

//       const result = await res.json();

//       if (!res.ok) {
//          return {
//             success: false,
//             message: result.message || "Failed to delete resume",
//             code: `HTTP_${res.status}`,
//          };
//       }

//       return {
//          success: true,
//          message: "Resume deleted successfully",
//          data: null,
//       };
//    } catch (error) {
//       console.error("Resume delete error:", error);
//       return {
//          success: false,
//          message: "Failed to delete resume",
//          code: "FETCH_ERROR",
//          error: (error as Error).message,
//       };
//    }
// }

// app/actions/resumeActions.ts (Fixed)

"use server";

import { serverFetch } from "@/lib/server-fetch";

// ─── Resume Data Types ────────────────────────────────────────────────────────

export interface ResumeData {
   id?: string;
   summary: string;
   personalInfo: {
      fullName: string;
      email: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      github?: string;
      website?: string;
      nationality?: string;
      dateOfBirth?: string;
      gender?: string;
      languages?: string;
   };
   education?: EducationEntry[];
   workExperience?: WorkExperienceEntry[];
   skills?: SkillEntry[];
   projects?: ProjectEntry[];
   certifications?: CertificationEntry[];
}

export interface EducationEntry {
   id?: string;
   degree: string;
   institution: string;
   fieldOfStudy?: string;
   startDate: string; // YYYY-MM format
   endDate: string; // YYYY-MM format
   description?: string;
}

export interface WorkExperienceEntry {
   id?: string;
   company: string;
   position: string;
   startDate: string; // YYYY-MM format
   endDate?: string; // YYYY-MM format (null if current)
   current?: boolean;
   description?: string;
}

export interface SkillEntry {
   id?: string;
   name: string;
   level: number; // 1-5 proficiency
   category?: string;
}

export interface ProjectEntry {
   id?: string;
   name: string;
   description: string;
   technologies: string[]; // Array of tech names
   link?: string;
   image?: string;
}

export interface CertificationEntry {
   id?: string;
   title: string;
   issuer: string;
   issueDate: string; // YYYY-MM format
   expiryDate?: string; // YYYY-MM format
   credentialId?: string;
   credentialUrl?: string;
}

export interface ApiResponse<T = any> {
   success: boolean;
   message: string;
   data?: T;
   code?: string;
   details?: any;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateResumeData(data: any): { valid: boolean; errors: string[] } {
   const errors: string[] = [];

   // Optional: summary validation (can be empty)
   // Resume summary is optional during creation

   // Required: personalInfo
   if (!data.personalInfo) {
      errors.push("Personal information is required");
   } else {
      if (!data.personalInfo.fullName?.trim()) {
         errors.push("Full name is required");
      }
      if (!data.personalInfo.email?.trim()) {
         errors.push("Email address is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
         errors.push("Invalid email format");
      }
   }

   // Validate education (optional section, but if present must be complete)
   if (data.education && Array.isArray(data.education) && data.education.length > 0) {
      data.education.forEach((edu: any, idx: number) => {
         // Only validate if entry has data
         if (edu.degree || edu.institution) {
            if (!edu.startDate?.trim()) {
               errors.push(`Education #${idx + 1}: Start date is required`);
            }
            if (!edu.endDate?.trim()) {
               errors.push(`Education #${idx + 1}: End date is required`);
            }
         }
      });
   }

   // Validate skills (optional section, but if present must be complete)
   if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
      data.skills.forEach((skill: any, idx: number) => {
         if (skill.name?.trim()) {
            // Skill level is optional, defaults to current value
            if (typeof skill.level === "number") {
               if (skill.level < 1 || skill.level > 5) {
                  errors.push(`Skill #${idx + 1}: Level must be between 1-5`);
               }
            }
         }
      });
   }

   // Validate projects (optional section)
   if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
      data.projects.forEach((proj: any, idx: number) => {
         if (proj.name?.trim() || proj.description?.trim()) {
            if (!Array.isArray(proj.technologies)) {
               errors.push(`Project #${idx + 1}: Technologies must be an array`);
            }
         }
      });
   }

   return {
      valid: errors.length === 0,
      errors,
   };
}

/**
 * Transform frontend data to match backend schema (if needed)
 * Currently returns data as-is since field names already match
 */
function transformResumeData(data: any): any {
   return {
      summary: data.summary || "",
      personalInfo: {
         fullName: data.personalInfo?.fullName || "",
         email: data.personalInfo?.email || "",
         phone: data.personalInfo?.phone || "",
         address: data.personalInfo?.address || "",
         linkedin: data.personalInfo?.linkedin || "",
         github: data.personalInfo?.github || "",
         website: data.personalInfo?.website || "",
         nationality: data.personalInfo?.nationality || "",
         dateOfBirth: data.personalInfo?.dateOfBirth || "",
         gender: data.personalInfo?.gender || "",
         languages: data.personalInfo?.languages || "",
      },
      education: (data.education || []).map((edu: any) => ({
         degree: edu.degree || "",
         institution: edu.institution || "",
         fieldOfStudy: edu.fieldOfStudy || edu.field || "",
         startDate: edu.startDate || "",
         endDate: edu.endDate || "",
         description: edu.description || "",
      })),
      workExperience: (data.workExperience || []).map((exp: any) => ({
         company: exp.company || "",
         position: exp.position || exp.jobTitle || "",
         startDate: exp.startDate || "",
         endDate: exp.endDate || null,
         current: exp.current || exp.isCurrent || false,
         description: exp.description || "",
      })),
      skills: (data.skills || []).map((skill: any) => ({
         name: skill.name || "",
         level: typeof skill.level === "number" ? skill.level : 3,
         category: skill.category || "",
      })),
      projects: (data.projects || []).map((proj: any) => ({
         name: proj.name || "",
         description: proj.description || "",
         technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
         link: proj.link || "",
         image: proj.image || "",
      })),
      certifications: (data.certifications || []).map((cert: any) => ({
         title: cert.title || "",
         issuer: cert.issuer || "",
         issueDate: cert.issueDate || cert.date || "",
         expiryDate: cert.expiryDate || "",
         credentialId: cert.credentialId || "",
         credentialUrl: cert.credentialUrl || cert.link || "",
      })),
   };
}

// ─── Create Resume ────────────────────────────────────────────────────────────

/**
 * Create a new resume
 * POST /api/v1/resume
 */
export async function createResume(resumeData: any): Promise<ApiResponse> {
   try {
      // 1. Validate data
      const validation = validateResumeData(resumeData);
      // console.log("validation check",validation)
      if (!validation.valid) {
         console.error("Validation errors:", validation.errors);
         return {
            success: false,
            message: validation.errors[0] || "Validation failed",
            code: "VALIDATION_ERROR",
            details: validation.errors,
         };
      }

      // 2. Transform data
      const transformedData = transformResumeData(resumeData);
      // console.log("📤 Creating resume with transformed data:", transformedData);

      // 3. Make API request
      const res = await serverFetch.post(`/resume/create`, {
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(transformedData),
      });

      const result = await res.json();
      // console.log("Response status:", res.status);
      // console.log("Response:", result);

      // 4. Handle response
      if (!res.ok) {
         console.error("❌ Create failed:", result);
         return {
            success: false,
            message: result.message || "Failed to create resume",
            code: result.code || `HTTP_${res.status}`,
            details: result.details || result.data,
         };
      }

      // console.log("✅ Resume created successfully");
      return {
         success: true,
         message: result.message || "Resume created successfully",
         data: result.data,
      };
   } catch (error) {
      console.error("❌ Resume creation error:", error);
      return {
         success: false,
         message: "Failed to create resume",
         code: "FETCH_ERROR",
         details: (error as Error).message,
      };
   }
}

// ─── Fetch Resume ─────────────────────────────────────────────────────────────

/**
 * Fetch resume for current user
 * GET /api/v1/resume
 */
export async function fetchResume(): Promise<ApiResponse> {
   try {
      // console.log("📥 Fetching resume...");

      const res = await serverFetch.get(`/resume/my`, {
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await res.json();
      // console.log("Fetch response:", result);

      // 404 = resume not found (OK for new users)
      if (res.status === 404) {
         return {
            success: false,
            message: "No resume found. Create one to get started.",
            code: "NOT_FOUND",
         };
      }

      // Other errors
      if (!res.ok) {
         // console.error("❌ Fetch failed:", result);
         return {
            success: false,
            message: result.message || "Failed to fetch resume",
            code: result.code || `HTTP_${res.status}`,
            details: result.details,
         };
      }

      // console.log("✅ Resume fetched successfully");
      return {
         success: true,
         message: "Resume fetched successfully",
         data: result.data,
      };
   } catch (error) {
      console.error("❌ Resume fetch error:", error);
      return {
         success: false,
         message: "Failed to fetch resume",
         code: "FETCH_ERROR",
         details: (error as Error).message,
      };
   }
}

// ─── Update Resume ────────────────────────────────────────────────────────────

/**
 * Update resume (partial update allowed)
 * PUT /api/v1/resume
 */
export async function updateResume(resumeData: Partial<ResumeData>): Promise<ApiResponse> {
   try {
      // console.log("📝 Updating resume...");

      const transformedData = transformResumeData(resumeData);

      const res = await serverFetch.put(`/resume`, {
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(transformedData),
      });

      const result = await res.json();
      // console.log("Update response:", result);

      if (!res.ok) {
         console.error("❌ Update failed:", result);
         return {
            success: false,
            message: result.message || "Failed to update resume",
            code: result.code || `HTTP_${res.status}`,
            details: result.details,
         };
      }

      // console.log("✅ Resume updated successfully");
      return {
         success: true,
         message: "Resume updated successfully",
         data: result.data,
      };
   } catch (error) {
      console.error("❌ Resume update error:", error);
      return {
         success: false,
         message: "Failed to update resume",
         code: "FETCH_ERROR",
         details: (error as Error).message,
      };
   }
}

// ─── Delete Resume ────────────────────────────────────────────────────────────

/**
 * Delete entire resume
 * DELETE /api/v1/resume
 */
export async function deleteResumeData(): Promise<ApiResponse> {
   try {
      // console.log("🗑️ Deleting resume...");

      const res = await serverFetch.delete(`/resume`, {
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await res.json();
      // console.log("Delete response:", result);

      if (!res.ok) {
         console.error("❌ Delete failed:", result);
         return {
            success: false,
            message: result.message || "Failed to delete resume",
            code: result.code || `HTTP_${res.status}`,
            details: result.details,
         };
      }

      // console.log("✅ Resume deleted successfully");
      return {
         success: true,
         message: "Resume deleted successfully",
         data: null,
      };
   } catch (error) {
      console.error("❌ Resume delete error:", error);
      return {
         success: false,
         message: "Failed to delete resume",
         code: "FETCH_ERROR",
         details: (error as Error).message,
      };
   }
}

export async function getMyResume() {
   try {
      const response = await serverFetch.get("/resume/my", {
         cache: "force-cache",
         next: {
            tags: ["resume-me"],
         },
      });
      const result = await response.json();
      // console.log("My resume:", result);
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "order fetching field!!"}`,
      };
   }
}
