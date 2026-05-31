

// "use client";

// import { useState, useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
// import Link from "next/link";
// // import { submitActionLogin } from "@/auth/login.service";
// import { loginSchema } from "@/zod/auth.validation";
// import z from "zod";
// import { submitActionLogin } from "@/components/services/auth/login.service";

// // ── Shared tokens ──────────────────────────────────────────────────────────────
// const ease = [0.22, 1, 0.36, 1] as const;

// const fieldCls = (invalid: boolean) =>
//    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono text-white/75 placeholder-white/20 bg-white/[0.04] outline-none
//    transition-all duration-200 focus:bg-white/[0.07] focus:text-white/85
//    ${invalid ? "border-red-500/50 bg-red-500/[0.04] focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`;

// // ── Password field ─────────────────────────────────────────────────────────────
// function PasswordField({ value, onChange, onBlur, name, invalid }: any) {
//    const [show, setShow] = useState(false);
//    return (
//       <div className="relative">
//          <input name={name} value={value} onChange={onChange} onBlur={onBlur} type={show ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" className={`${fieldCls(invalid)} pr-10`} />
//          <button type="button" tabIndex={-1} onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors">
//             {show ? <EyeOff size={15} /> : <Eye size={15} />}
//          </button>
//       </div>
//    );
// }

// // ── Social button ──────────────────────────────────────────────────────────────
// function SocialBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
//    return (
//       <button
//          type="button"
//          onClick={onClick}
//          disabled={disabled}
//          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/55 text-sm font-mono hover:border-white/20 hover:bg-white/[0.06] hover:text-white/75 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
//       >
//          {children}
//       </button>
//    );
// }

// // ── Action State Type ──────────────────────────────────────────────────────────
// type ActionState = {
//    errors?: {
//       email?: string;
//       password?: string;
//    };
//    success?: boolean;
//    message?: string;
// };
// type LoginFormData = z.infer<typeof loginSchema>;
// // ── Component ──────────────────────────────────────────────────────────────────
// export default function LoginPage() {
//  const [formData, setFormData] = useState<LoginFormData>({
//     email: "",
//     password: "",
//  });
//    // Form state for controlled inputs
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [rememberMe, setRememberMe] = useState(false);

//    // ── Action State ─────────────────────────────────────────────────────────────
//    const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitActionLogin, {
//       errors: {},
//       success: false,
//    });
//    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    //    const { name, value } = e.target;
//    //    setFormData((prev) => ({ ...prev, [name]: value }));
//    // };

//    // Handle action state changes
//    useEffect(() => {
//       if (state.message) {
//          if (state.success) {
//             console.log(state.message, "success");
//             toast.success(state.message);
//             // Handle successful login (redirect, etc.)
//          } else {
//             console.log(state.message, "error");
//             toast.error(state.message);
//          }
//       }
//    }, [state.message, state.success]);

//    // Social login handlers
//    const handleGoogleLogin = async () => {
//       try {
//          toast.loading("Connecting to Google...");
//          // Implement actual Google login logic here
//          await new Promise((resolve) => setTimeout(resolve, 2000));
//          toast.dismiss();
//          toast.error("Google login Service Not Available.!");
//       } catch (error) {
//          toast.dismiss();
//          toast.error("Google login failed. Please try again.");
//          console.error("Google login error:", error);
//       }
//    };

//    const handleGithubLogin = async () => {
//       try {
//          toast.loading("Connecting to GitHub...");
//          // Implement actual GitHub login logic here
//          await new Promise((resolve) => setTimeout(resolve, 2000));
//          toast.dismiss();
//          toast.error("GitHub  login Service Not Available.!");
//       } catch (error) {
//          toast.dismiss();
//          toast.error("GitHub login failed. Please try again.");
//          console.error("GitHub login error:", error);
//       }
//    };

//    // Password validation criteria
//    const validatePassword = (password: string) => {
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

//    const passwordValidation = formData.password ? validatePassword(formData.password) : null;

//    // ── Social login ─────────────────────────────────────────────────────────────
//    const handleSocial = async (provider: "google" | "github") => {
//       const tid = toast.loading(`Connecting to ${provider}…`);
//       try {
//          // await signIn(provider, { callbackUrl: "/dashboard" });
//          toast.success(`Connected to ${provider}`, { id: tid });
//       } catch {
//          toast.error(`${provider} sign-in failed`, { id: tid, duration: 4000 });
//       }
//    };

//    // Clear form errors when user types
//    useEffect(() => {
//       if (state.errors?.email && email) {
//          // This is handled by re-render, state will be cleared on next action
//       }
//    }, [email, password]);

//    const isLoading = isPending;

//    return (
//       <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16">
//          {/* Noise */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
//             style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//             }}
//          />
//          {/* Grid */}
//          <div
//             aria-hidden
//             className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
//             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
//          />
//          {/* Top glow */}
//          <div aria-hidden className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)" }} />

//          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="relative z-10 w-full max-w-md">
//             {/* Header */}
//             <div className="text-center mb-8">
//                <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease, delay: 0.08 }}
//                   className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
//                >
//                   Welcome Back
//                </motion.span>
//                <motion.h1
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, ease, delay: 0.12 }}
//                   style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}
//                   className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3"
//                >
//                   Sign In
//                </motion.h1>
//                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease, delay: 0.2 }} className="text-sm font-mono text-white/30">
//                   Don't have an account?{" "}
//                   <Link href="/register" className="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2">
//                      Sign up
//                   </Link>
//                </motion.p>
//             </div>

//             {/* Card */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.18 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8">
//                {/* Social buttons */}
//                <div className="space-y-2.5 mb-6">
//                   <SocialBtn onClick={() => handleGoogleLogin} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24">
//                         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                         <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                         <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                      </svg>
//                      Continue with Google
//                   </SocialBtn>
//                   <SocialBtn onClick={() => handleGithubLogin} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
//                         <path
//                            fillRule="evenodd"
//                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                            clipRule="evenodd"
//                         />
//                      </svg>
//                      Continue with GitHub
//                   </SocialBtn>
//                </div>

//                {/* Divider */}
//                <div className="flex items-center gap-4 mb-6">
//                   <div className="flex-1 h-px bg-white/[0.06]" />
//                   <span className="text-[11px] font-mono text-white/20 uppercase tracking-widest">or email</span>
//                   <div className="flex-1 h-px bg-white/[0.06]" />
//                </div>

//                {/* Auth error */}
//                <AnimatePresence>
//                   {state.message && !state.success && (
//                      <motion.div
//                         initial={{ opacity: 0, y: -8, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.25 }}
//                         className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80"
//                      >
//                         {state.message}
//                      </motion.div>
//                   )}
//                </AnimatePresence>

//                {/* Form */}
//                <form action={formAction} className="space-y-4" noValidate>
//                   {/* Email */}
//                   <div>
//                      <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Email</label>
//                      <div className="relative">
//                         <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                         <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className={fieldCls(!!state.errors?.email)} />
//                      </div>
//                      <AnimatePresence>
//                         {state.errors?.email && (
//                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                               {state.errors.email}
//                            </motion.p>
//                         )}
//                      </AnimatePresence>
//                   </div>

//                   {/* Password */}
//                   <div>
//                      <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Password</label>
//                      <div className="relative">
//                         <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
//                         <PasswordField name="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onBlur={() => {}} invalid={!!state.errors?.password} />
//                      </div>
//                      <AnimatePresence>
//                         {state.errors?.password && (
//                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                               {state.errors.password}
//                            </motion.p>
//                         )}
//                      </AnimatePresence>
//                   </div>

//                   {/* Remember + Forgot */}
//                   <div className="flex items-center justify-between pt-1">
//                      <label className="flex items-center gap-2 cursor-pointer select-none group">
//                         <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${rememberMe ? "border-white/40 bg-white/10" : "border-white/[0.12] bg-white/[0.03]"}`}>
//                            <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only" />
//                            {rememberMe && <div className="w-2 h-2 rounded-sm bg-white/70" />}
//                         </div>
//                         <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors">Remember me</span>
//                      </label>
//                      <Link href="/forgot-password" className="text-[11px] font-mono text-white/30 hover:text-white/55 transition-colors">
//                         Forgot password?
//                      </Link>
//                   </div>

//                   {/* Submit */}
//                   <motion.button
//                      type="submit"
//                      disabled={isLoading}
//                      whileHover={{ scale: isLoading ? 1 : 1.01 }}
//                      whileTap={{ scale: isLoading ? 1 : 0.99 }}
//                      className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                      {isLoading ? (
//                         <>
//                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Signing in…
//                         </>
//                      ) : (
//                         <>
//                            Sign In <ArrowRight size={15} />
//                         </>
//                      )}
//                   </motion.button>
//                </form>
//             </motion.div>

//             {/* Footer */}
//             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-[10px] font-mono text-white/15 mt-6">
//                By signing in you agree to our{" "}
//                <Link href="/terms" className="underline underline-offset-2 hover:text-white/35 transition-colors">
//                   Terms
//                </Link>{" "}
//                and{" "}
//                <Link href="/privacy" className="underline underline-offset-2 hover:text-white/35 transition-colors">
//                   Privacy Policy
//                </Link>
//             </motion.p>
//          </motion.div>
//       </div>
//    );
// }

// app/login/page.tsx - UPDATED VERSION WITH OAUTH
"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginSchema } from "@/zod/auth.validation";
import z from "zod";
import { submitActionLogin } from "@/components/services/auth/login.service";
import { clearOAuthParams, getOAuthCallbackStatus, initiateOAuthLogin } from "@/components/services/auth/oauth-handler";
// import { initiateOAuthLogin, getOAuthCallbackStatus, clearOAuthParams } from "@/lib/oauth-handler";

// ── Shared tokens ──────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fieldCls = (invalid: boolean) =>
   `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono text-white/75 placeholder-white/20 bg-white/[0.04] outline-none
   transition-all duration-200 focus:bg-white/[0.07] focus:text-white/85
   ${invalid ? "border-red-500/50 bg-red-500/[0.04] focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`;

// ── Password field ─────────────────────────────────────────────────────────────
function PasswordField({ value, onChange, onBlur, name, invalid }: any) {
   const [show, setShow] = useState(false);
   return (
      <div className="relative">
         <input
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={show ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className={`${fieldCls(invalid)} pr-10`}
         />
         <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors"
         >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
         </button>
      </div>
   );
}

// ── Social button ──────────────────────────────────────────────────────────────
interface SocialBtnProps {
   onClick: () => void;
   disabled: boolean;
   children: React.ReactNode;
   isLoading?: boolean;
}

function SocialBtn({ onClick, disabled, children, isLoading }: SocialBtnProps) {
   return (
      <button
         type="button"
         onClick={onClick}
         disabled={disabled || isLoading}
         className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/55 text-sm font-mono hover:border-white/20 hover:bg-white/[0.06] hover:text-white/75 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
         {isLoading ? (
            <>
               <Loader2 size={16} className="animate-spin" />
               Connecting…
            </>
         ) : (
            children
         )}
      </button>
   );
}

// ── Action State Type ──────────────────────────────────────────────────────────
type ActionState = {
   errors?: {
      email?: string;
      password?: string;
   };
   success?: boolean;
   message?: string;
};

type LoginFormData = z.infer<typeof loginSchema>;

// ── Component ──────────────────────────────────────────────────────────────────
export default function LoginPage() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);

   // ── Action State ─────────────────────────────────────────────────────────────
   const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitActionLogin, {
      errors: {},
      success: false,
   });

   // Handle OAuth callback status on mount
   useEffect(() => {
      const callbackStatus = getOAuthCallbackStatus();

      if (callbackStatus?.error) {
         console.error("❌ OAuth error:", callbackStatus.error);
         toast.error("OAuth Login Failed", {
            description: callbackStatus.error,
            duration: 5000,
         });
         clearOAuthParams();
      } else if (callbackStatus?.code) {
         console.log("✅ OAuth callback with code");
         // The backend should have already set cookies and redirected
         // This is just for safety
         clearOAuthParams();
      }
   }, []);

   // Handle action state changes
   useEffect(() => {
      if (state.message) {
         if (state.success) {
            console.log("✅ Login successful:", state.message);
            toast.success("Login Successful!", {
               description: state.message,
               duration: 3000,
            });
            // Redirect to dashboard
            setTimeout(() => {
               router.push("/user/dashboard");
            }, 1500);
         } else {
            console.error("❌ Login failed:", state.message);
            toast.error("Login Failed", {
               description: state.message,
               duration: 4000,
            });
         }
      }
   }, [state.message, state.success, router]);

   // ── Google Login Handler ───────────────────────────────────────────────────────
   const handleGoogleLogin = async () => {
      try {
         setOauthLoading("google");
         console.log("🔵 Starting Google OAuth flow...");
         
         // This will redirect to backend OAuth endpoint
         initiateOAuthLogin("google", "/user/dashboard");
         
         // If we get here, something went wrong
         setOauthLoading(null);
         toast.error("Google Login", {
            description: "Failed to initiate Google login",
            duration: 4000,
         });
      } catch (error) {
         console.error("❌ Google login error:", error);
         setOauthLoading(null);
         toast.error("Google Login Error", {
            description: "An unexpected error occurred",
            duration: 4000,
         });
      }
   };

   // ── GitHub Login Handler ───────────────────────────────────────────────────────
   const handleGithubLogin = async () => {
      try {
         setOauthLoading("github");
         console.log("⚫ Starting GitHub OAuth flow...");
         
         // This will redirect to backend OAuth endpoint
         initiateOAuthLogin("github", "/user/dashboard");
         
         // If we get here, something went wrong
         setOauthLoading(null);
         toast.error("GitHub Login", {
            description: "Failed to initiate GitHub login",
            duration: 4000,
         });
      } catch (error) {
         console.error("❌ GitHub login error:", error);
         setOauthLoading(null);
         toast.error("GitHub Login Error", {
            description: "An unexpected error occurred",
            duration: 4000,
         });
      }
   };

   const isLoading = isPending || !!oauthLoading;

   return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16">
         {/* Noise */}
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />
         
         {/* Grid */}
         <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
            style={{
               backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
               backgroundSize: "60px 60px",
            }}
         />
         
         {/* Top glow */}
         <div
            aria-hidden
            className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0"
            style={{
               background:
                  "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)",
            }}
         />

         <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative z-10 w-full max-w-md"
         >
            {/* Header */}
            <div className="text-center mb-8">
               <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.08 }}
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
               >
                  Welcome Back
               </motion.span>
               <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.12 }}
                  style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}
                  className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3"
               >
                  Sign In
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 }}
                  className="text-sm font-mono text-white/30"
               >
                  Don't have an account?{" "}
                  <Link
                     href="/register"
                     className="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2"
                  >
                     Sign up
                  </Link>
               </motion.p>
            </div>

            {/* Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.65, ease, delay: 0.18 }}
               className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8"
            >
               {/* Social buttons */}
               <div className="space-y-2.5 mb-6">
                  <SocialBtn
                     onClick={handleGoogleLogin}
                     disabled={isLoading}
                     isLoading={oauthLoading === "google"}
                  >
                     <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24">
                        <path
                           fill="#4285F4"
                           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                           fill="#34A853"
                           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                           fill="#FBBC05"
                           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                           fill="#EA4335"
                           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                     </svg>
                     {oauthLoading === "google" ? "Connecting to Google…" : "Continue with Google"}
                  </SocialBtn>

                  <SocialBtn
                     onClick={handleGithubLogin}
                     disabled={isLoading}
                     isLoading={oauthLoading === "github"}
                  >
                     <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
                        <path
                           fillRule="evenodd"
                           d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                           clipRule="evenodd"
                        />
                     </svg>
                     {oauthLoading === "github" ? "Connecting to GitHub…" : "Continue with GitHub"}
                  </SocialBtn>
               </div>

               {/* Divider */}
               <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[11px] font-mono text-white/20 uppercase tracking-widest">
                     or email
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
               </div>

               {/* Auth error */}
               <AnimatePresence>
                  {state.message && !state.success && (
                     <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80"
                     >
                        {state.message}
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* Form */}
               <form action={formAction} className="space-y-4" noValidate>
                  {/* Email */}
                  <div>
                     <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">
                        Email
                     </label>
                     <div className="relative">
                        <Mail
                           size={14}
                           className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"
                        />
                        <input
                           name="email"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           autoComplete="email"
                           placeholder="you@example.com"
                           className={fieldCls(!!state.errors?.email)}
                           disabled={isLoading}
                        />
                     </div>
                     <AnimatePresence>
                        {state.errors?.email && (
                           <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-[11px] font-mono text-red-400/80"
                           >
                              {state.errors.email}
                           </motion.p>
                        )}
                     </AnimatePresence>
                  </div>

                  {/* Password */}
                  <div>
                     <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">
                        Password
                     </label>
                     <div className="relative">
                        <Lock
                           size={14}
                           className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10"
                        />
                        <PasswordField
                           name="password"
                           value={password}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setPassword(e.target.value)
                           }
                           onBlur={() => {}}
                           invalid={!!state.errors?.password}
                        />
                     </div>
                     <AnimatePresence>
                        {state.errors?.password && (
                           <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-[11px] font-mono text-red-400/80"
                           >
                              {state.errors.password}
                           </motion.p>
                        )}
                     </AnimatePresence>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between pt-1">
                     <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <div
                           className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                              rememberMe
                                 ? "border-white/40 bg-white/10"
                                 : "border-white/[0.12] bg-white/[0.03]"
                           }`}
                        >
                           <input
                              type="checkbox"
                              name="rememberMe"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="sr-only"
                              disabled={isLoading}
                           />
                           {rememberMe && (
                              <div className="w-2 h-2 rounded-sm bg-white/70" />
                           )}
                        </div>
                        <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors">
                           Remember me
                        </span>
                     </label>
                     <Link
                        href="/forgot-password"
                        className="text-[11px] font-mono text-white/30 hover:text-white/55 transition-colors"
                     >
                        Forgot password?
                     </Link>
                  </div>

                  {/* Submit */}
                  <motion.button
                     type="submit"
                     disabled={isLoading}
                     whileHover={{ scale: isLoading ? 1 : 1.01 }}
                     whileTap={{ scale: isLoading ? 1 : 0.99 }}
                     className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isPending ? (
                        <>
                           <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                           Signing in…
                        </>
                     ) : (
                        <>
                           Sign In <ArrowRight size={15} />
                        </>
                     )}
                  </motion.button>
               </form>
            </motion.div>

            {/* Footer */}
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="text-center text-[10px] font-mono text-white/15 mt-6"
            >
               By signing in you agree to our{" "}
               <Link
                  href="/terms"
                  className="underline underline-offset-2 hover:text-white/35 transition-colors"
               >
                  Terms
               </Link>{" "}
               and{" "}
               <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-white/35 transition-colors"
               >
                  Privacy Policy
               </Link>
            </motion.p>
         </motion.div>
      </div>
   );
}