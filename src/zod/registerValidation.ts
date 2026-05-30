// import z from "zod";

// // Define the form schema with Zod for registration
// export const registerSchema = z
//    .object({
//       name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
//       email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
//       password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
//       confirmPassword: z.string().min(6, "Please confirm your password"),
//    })
//    .refine((data) => data.password === data.confirmPassword, {
//       message: "Passwords don't match",
//       path: ["confirmPassword"],
//    });

//       // Password validation criteria (for live feedback)
//    export const validatePassword = (password: string) => {
//       const checks = {
//          length: password.length >= 6,
//          uppercase: /[A-Z]/.test(password),
//          lowercase: /[a-z]/.test(password),
//          number: /[0-9]/.test(password),
//          special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//       };
//       const passed = Object.values(checks).filter(Boolean).length;
//       return { checks, passed, total: Object.keys(checks).length };
//    };

import z from "zod";

// ── Base schema (no refinements) ───────────────────────────────────────────────
const registerBaseSchema = z.object({
   first_name: z.string().min(2, "First name must be at least 2 characters").max(50, "First name is too long").trim(),
   last_name: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name is too long").trim(),
   email: z.string().min(1, "Email is required").email("Please enter a valid email address").toLowerCase().trim(),
   password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password is too long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password needs uppercase, lowercase & number"),
   confirmPassword: z.string().min(1, "Please confirm your password"),
});

// ── registerSchema (with password-match refinement) ───────────────────────────
export const registerSchema = registerBaseSchema.refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

// ── registerSchemaWithTerms ───────────────────────────────────────────────────
export const registerSchemaWithTerms = registerBaseSchema
   .extend({
      agreeToTerms: z
         .preprocess(
            // Transform "on" → true, "off" → false
            (val) => val === "on" || val === true,
            z.boolean(),
         )
         .refine((v) => v === true, "You must agree to the terms and conditions"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

// ── Type exports ───────────────────────────────────────────────────────────────
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterFormDataWithTerms = z.infer<typeof registerSchemaWithTerms>;

// ── Password strength ─────────────────────────────────────────────────────────
export interface PasswordChecks {
   length: boolean;
   uppercase: boolean;
   lowercase: boolean;
   number: boolean;
}

export interface PasswordValidation {
   checks: PasswordChecks;
   passed: number;
   total: number;
   strength: "weak" | "fair" | "good" | "strong";
}

export const validatePassword = (password: string): PasswordValidation => {
   const checks: PasswordChecks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
   };
   const passed = Object.values(checks).filter(Boolean).length;
   const total = Object.keys(checks).length;

   let strength: PasswordValidation["strength"] = "weak";
   if (passed === total) strength = "strong";
   else if (passed >= 3) strength = "good";
   else if (passed >= 2) strength = "fair";

   return { checks, passed, total, strength };
};

export const getPasswordStrengthColor = (strength: string): string => {
   switch (strength) {
      case "strong":
         return "bg-emerald-400/70";
      case "good":
         return "bg-yellow-400/70";
      case "fair":
         return "bg-amber-400/70";
      default:
         return "bg-red-400/70";
   }
};

export const getPasswordStrengthText = (strength: string): string => {
   switch (strength) {
      case "strong":
         return "Strong password ✓";
      case "good":
         return "Good password";
      case "fair":
         return "Fair — add more variety";
      default:
         return "Weak password";
   }
};