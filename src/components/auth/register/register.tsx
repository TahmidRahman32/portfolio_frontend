// "use client";

// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { signIn } from "next-auth/react";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { register } from "@/actions/auth";

// // ── Schema ─────────────────────────────────────────────────────────────────────
// const schema = z
//    .object({
//       firstName: z.string().min(2, "At least 2 characters"),
//       lastName: z.string().min(2, "At least 2 characters"),
//       email: z.string().email("Enter a valid email address"),
//       password: z
//          .string()
//          .min(8, "At least 8 characters")
//          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Needs uppercase, lowercase & number"),
//       confirmPassword: z.string(),
//       agreeToTerms: z.boolean().refine((v) => v === true, "You must agree to continue"),
//    })
//    .refine((d) => d.password === d.confirmPassword, {
//       message: "Passwords don't match",
//       path: ["confirmPassword"],
//    });

// type FormData = z.infer<typeof schema>;

// // ── Helpers ────────────────────────────────────────────────────────────────────
// const ease = [0.22, 1, 0.36, 1] as const;

// const fieldCls = (invalid: boolean) =>
//    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono text-white/75 placeholder-white/20 bg-white/[0.04] outline-none
//    transition-all duration-200 focus:bg-white/[0.07] focus:text-white/85
//    ${invalid ? "border-red-500/50 bg-red-500/[0.04] focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`;

// function PasswordField({ value, onChange, onBlur, name, ref: fieldRef, invalid }: any) {
//    const [show, setShow] = useState(false);
//    return (
//       <div className="relative">
//          <input ref={fieldRef} name={name} value={value} onChange={onChange} onBlur={onBlur} type={show ? "text" : "password"} placeholder="••••••••" className={`${fieldCls(invalid)} pr-10`} />
//          <button type="button" tabIndex={-1} onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors">
//             {show ? <EyeOff size={15} /> : <Eye size={15} />}
//          </button>
//       </div>
//    );
// }

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

// // ── Password strength indicator ────────────────────────────────────────────────
// function PasswordStrength({ password }: { password: string }) {
//    const checks = [
//       { label: "8+ characters", pass: password.length >= 8 },
//       { label: "Uppercase", pass: /[A-Z]/.test(password) },
//       { label: "Lowercase", pass: /[a-z]/.test(password) },
//       { label: "Number", pass: /\d/.test(password) },
//    ];
//    const score = checks.filter((c) => c.pass).length;
//    if (!password) return null;

//    return (
//       <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-2">
//          <div className="flex gap-1">
//             {[0, 1, 2, 3].map((i) => (
//                <div
//                   key={i}
//                   className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i < score ? (score <= 1 ? "bg-red-400/70" : score <= 2 ? "bg-amber-400/70" : score <= 3 ? "bg-yellow-400/70" : "bg-emerald-400/70") : "bg-white/[0.07]"}`}
//                />
//             ))}
//          </div>
//          <div className="flex flex-wrap gap-x-3 gap-y-1">
//             {checks.map((c) => (
//                <span key={c.label} className={`flex items-center gap-1 text-[10px] font-mono transition-colors duration-200 ${c.pass ? "text-emerald-400/70" : "text-white/20"}`}>
//                   <CheckCircle size={9} /> {c.label}
//                </span>
//             ))}
//          </div>
//       </motion.div>
//    );
// }

// // ── Error message mapper ───────────────────────────────────────────────────────
// function parseError(message: string): string {
//    if (message.includes("Network")) return "Cannot connect to server. Check your connection.";
//    if (message.includes("400")) return "Invalid data. Please check your information.";
//    if (message.includes("409")) return "An account with this email already exists.";
//    if (message.includes("500")) return "Server error. Please try again later.";
//    return message || "Registration failed. Please try again.";
// }

// // ── Component ──────────────────────────────────────────────────────────────────
// export default function RegisterPage() {
//    const router = useRouter();
//    const [isPending, startTransition] = useTransition();
//    const [authError, setAuthError] = useState("");

//    const { control, handleSubmit, watch, formState } = useForm<FormData>({
//       resolver: zodResolver(schema),
//       defaultValues: {
//          firstName: "",
//          lastName: "",
//          email: "",
//          password: "",
//          confirmPassword: "",
//          agreeToTerms: false,
//       },
//    });

//    const watchedPassword = watch("password");

//    const onSubmit = (data: FormData) => {
//       startTransition(async () => {
//          setAuthError("");
//          const tid = toast.loading("Creating your account…", { description: "Setting up your profile." });

//          try {
//             const res = await register({
//                first_name: data.firstName,
//                last_name: data.lastName,
//                email: data.email,
//                password: data.password,
//             });

//             if (res?.id || res?.success || res?.userId || res?.data?.id) {
//                toast.success("Account created!", { id: tid, description: "Signing you in…", duration: 2000 });

//                const signInResult = await signIn("credentials", {
//                   email: data.email,
//                   password: data.password,
//                   redirect: false,
//                });

//                if (signInResult?.ok) {
//                   router.push("/");
//                } else {
//                   toast.info("Account created", { description: "Please sign in to continue." });
//                   router.push("/login");
//                }
//             } else {
//                setAuthError("Registration completed but received an unexpected response.");
//                toast.dismiss(tid);
//             }
//          } catch (err: any) {
//             const msg = parseError(err.message || "");
//             setAuthError(msg);
//             toast.error("Registration failed", { id: tid, description: msg, duration: 5000 });
//          }
//       });
//    };

//    const handleSocial = (provider: "google" | "facebook") => {
//       startTransition(async () => {
//          const tid = toast.loading(`Connecting to ${provider}…`);
//          try {
//             await signIn(provider, { callbackUrl: "/dashboard" });
//          } catch {
//             toast.error(`${provider} sign-in failed`, { id: tid, duration: 4000 });
//          }
//       });
//    };

//    const isLoading = isPending || formState.isSubmitting;

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
//          {/* Glow */}
//          <div aria-hidden className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)" }} />

//          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="relative z-10 w-full max-w-lg">
//             {/* Header */}
//             <div className="text-center mb-8">
//                <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease, delay: 0.08 }}
//                   className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
//                >
//                   Get Started
//                </motion.span>
//                <motion.h1
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, ease, delay: 0.12 }}
//                   style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}
//                   className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3"
//                >
//                   Create Account
//                </motion.h1>
//                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease, delay: 0.2 }} className="text-sm font-mono text-white/30">
//                   Already have an account?{" "}
//                   <Link href="/login" className="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2">
//                      Sign in
//                   </Link>
//                </motion.p>
//             </div>

//             {/* Card */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.18 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8">
//                {/* Social */}
//                <div className="grid grid-cols-2 gap-2.5 mb-6">
//                   <SocialBtn onClick={() => handleSocial("google")} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24">
//                         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                         <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                         <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                      </svg>
//                      Google
//                   </SocialBtn>
//                   <SocialBtn onClick={() => handleSocial("facebook")} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                      </svg>
//                      Facebook
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
//                   {authError && (
//                      <motion.div
//                         initial={{ opacity: 0, y: -8, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.25 }}
//                         className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs font-mono text-red-400/80"
//                      >
//                         {authError}
//                      </motion.div>
//                   )}
//                </AnimatePresence>

//                {/* Form */}
//                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//                   {/* Name row */}
//                   <div className="grid grid-cols-2 gap-3">
//                      {(["firstName", "lastName"] as const).map((name, i) => (
//                         <Controller
//                            key={name}
//                            name={name}
//                            control={control}
//                            render={({ field, fieldState }) => (
//                               <div>
//                                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">{i === 0 ? "First Name" : "Last Name"}</label>
//                                  <div className="relative">
//                                     <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                                     <input {...field} type="text" placeholder={i === 0 ? "Gaziur" : "Tahmid"} className={fieldCls(!!fieldState.error)} />
//                                  </div>
//                                  <AnimatePresence>
//                                     {fieldState.error && (
//                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[10px] font-mono text-red-400/80">
//                                           {fieldState.error.message}
//                                        </motion.p>
//                                     )}
//                                  </AnimatePresence>
//                               </div>
//                            )}
//                         />
//                      ))}
//                   </div>

//                   {/* Email */}
//                   <Controller
//                      name="email"
//                      control={control}
//                      render={({ field, fieldState }) => (
//                         <div>
//                            <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Email</label>
//                            <div className="relative">
//                               <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                               <input {...field} type="email" autoComplete="email" placeholder="you@example.com" className={fieldCls(!!fieldState.error)} />
//                            </div>
//                            <AnimatePresence>
//                               {fieldState.error && (
//                                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                                     {fieldState.error.message}
//                                  </motion.p>
//                               )}
//                            </AnimatePresence>
//                         </div>
//                      )}
//                   />

//                   {/* Password */}
//                   <Controller
//                      name="password"
//                      control={control}
//                      render={({ field, fieldState }) => (
//                         <div>
//                            <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Password</label>
//                            <div className="relative">
//                               <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
//                               <PasswordField {...field} invalid={!!fieldState.error} />
//                            </div>
//                            <PasswordStrength password={watchedPassword} />
//                            <AnimatePresence>
//                               {fieldState.error && (
//                                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                                     {fieldState.error.message}
//                                  </motion.p>
//                               )}
//                            </AnimatePresence>
//                         </div>
//                      )}
//                   />

//                   {/* Confirm password */}
//                   <Controller
//                      name="confirmPassword"
//                      control={control}
//                      render={({ field, fieldState }) => (
//                         <div>
//                            <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Confirm Password</label>
//                            <div className="relative">
//                               <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
//                               <PasswordField {...field} invalid={!!fieldState.error} />
//                            </div>
//                            <AnimatePresence>
//                               {fieldState.error && (
//                                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                                     {fieldState.error.message}
//                                  </motion.p>
//                               )}
//                            </AnimatePresence>
//                         </div>
//                      )}
//                   />

//                   {/* Terms */}
//                   <Controller
//                      name="agreeToTerms"
//                      control={control}
//                      render={({ field, fieldState }) => {
//                         const { value, onChange, ...rest } = field;
//                         return (
//                            <div>
//                               <label className="flex items-start gap-3 cursor-pointer group">
//                                  <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-all duration-200 ${value ? "border-white/40 bg-white/10" : "border-white/[0.12] bg-white/[0.03]"}`}>
//                                     <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="sr-only" {...rest} />
//                                     {value && <div className="w-2 h-2 rounded-sm bg-white/70" />}
//                                  </div>
//                                  <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors leading-relaxed">
//                                     I agree to the{" "}
//                                     <Link href="/terms" className="text-white/50 hover:text-white/70 underline underline-offset-2">
//                                        Terms
//                                     </Link>{" "}
//                                     and{" "}
//                                     <Link href="/privacy" className="text-white/50 hover:text-white/70 underline underline-offset-2">
//                                        Privacy Policy
//                                     </Link>
//                                  </span>
//                               </label>
//                               <AnimatePresence>
//                                  {fieldState.error && (
//                                     <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                                        {fieldState.error.message}
//                                     </motion.p>
//                                  )}
//                               </AnimatePresence>
//                            </div>
//                         );
//                      }}
//                   />

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
//                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Creating account…
//                         </>
//                      ) : (
//                         <>
//                            Create Account <ArrowRight size={15} />
//                         </>
//                      )}
//                   </motion.button>
//                </form>
//             </motion.div>

//             {/* Footer */}
//             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-[10px] font-mono text-white/15 mt-6">
//                Your data is encrypted and never sold to third parties.
//             </motion.p>
//          </motion.div>
//       </div>
//    );
// }

// "use client";

// import { signIn } from "next-auth/react";
// import { useState, useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { register } from "@/actions/auth";
// import { submitAction } from "@/auth/register.service";
// import { registerSchema, validatePassword } from "@/zod/registerValidation";
// import z from "zod";

// // ── Shared tokens ──────────────────────────────────────────────────────────────
// const ease = [0.22, 1, 0.36, 1] as const;

// const fieldCls = (invalid: boolean) =>
//    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono text-white/75 placeholder-white/20 bg-white/[0.04] outline-none
//    transition-all duration-200 focus:bg-white/[0.07] focus:text-white/85
//    ${invalid ? "border-red-500/50 bg-red-500/[0.04] focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`;

// // ── Action State Type ──────────────────────────────────────────────────────────
// type ActionState = {
//    errors?: {
//       first_name?: string;
//       last_name?: string;
//       email?: string;
//       password?: string;
//       confirmPassword?: string;
//       agreeToTerms?: string;
//    };
//    success?: boolean;
//    message?: string;
// };

// // ── Password field ─────────────────────────────────────────────────────────────
// function PasswordField({ value, onChange, onBlur, name, invalid }: any) {
//    const [show, setShow] = useState(false);
//    return (
//       <div className="relative">
//          <input name={name} value={value} onChange={onChange} onBlur={onBlur} type={show ? "text" : "password"} placeholder="••••••••" className={`${fieldCls(invalid)} pr-10`} />
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

// // ── Password strength indicator ────────────────────────────────────────────────
// function PasswordStrength({ password }: { password: string }) {
//    const checks = [
//       { label: "8+ characters", pass: password.length >= 8 },
//       { label: "Uppercase", pass: /[A-Z]/.test(password) },
//       { label: "Lowercase", pass: /[a-z]/.test(password) },
//       { label: "Number", pass: /\d/.test(password) },
//    ];
//    const score = checks.filter((c) => c.pass).length;
//    if (!password) return null;

//    return (
//       <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-2">
//          <div className="flex gap-1">
//             {[0, 1, 2, 3].map((i) => (
//                <div
//                   key={i}
//                   className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i < score ? (score <= 1 ? "bg-red-400/70" : score <= 2 ? "bg-amber-400/70" : score <= 3 ? "bg-yellow-400/70" : "bg-emerald-400/70") : "bg-white/[0.07]"}`}
//                />
//             ))}
//          </div>
//          <div className="flex flex-wrap gap-x-3 gap-y-1">
//             {checks.map((c) => (
//                <span key={c.label} className={`flex items-center gap-1 text-[10px] font-mono transition-colors duration-200 ${c.pass ? "text-emerald-400/70" : "text-white/20"}`}>
//                   <CheckCircle size={9} /> {c.label}
//                </span>
//             ))}
//          </div>
//       </motion.div>
//    );
// }

// // ── Error message mapper ───────────────────────────────────────────────────────
// function parseError(message: string): string {
//    if (message.includes("Network")) return "Cannot connect to server. Check your connection.";
//    if (message.includes("400")) return "Invalid data. Please check your information.";
//    if (message.includes("409")) return "An account with this email already exists.";
//    if (message.includes("500")) return "Server error. Please try again later.";
//    return message || "Registration failed. Please try again.";
// }
// type RegisterFormData = z.infer<typeof registerSchema>;

// // ── Component ──────────────────────────────────────────────────────────────────
// export default function RegisterPage() {
//    const router = useRouter();

//    // Form state for controlled inputs
//    const [firstName, setFirstName] = useState("");
//    const [lastName, setLastName] = useState("");
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [confirmPassword, setConfirmPassword] = useState("");
//    const [agreeToTerms, setAgreeToTerms] = useState(false);
//    const [formData, setFormData] = useState<RegisterFormData>({

//                first_name: "",
//                last_name: "",
//                email: "",
//                password: "",
//                confirmPassword: "",
//                agreeToTerms: false,
        
//    });
//    // Password validation for live strength indicator
//    const validatePasswordStrength = (pwd: string) => {
//       const checks = {
//          length: pwd.length >= 8,
//          uppercase: /[A-Z]/.test(pwd),
//          lowercase: /[a-z]/.test(pwd),
//          number: /\d/.test(pwd),
//       };
//       const passed = Object.values(checks).filter(Boolean).length;
//       return { checks, passed, total: Object.keys(checks).length };
//    };

//    // const passwordValidation = password ? validatePasswordStrength(password) : null;

//    // ── Action State ─────────────────────────────────────────────────────────────
//    const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitAction, {
//       errors: {},
//       success: false,
//    });

//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value, type, checked } = e.target;

//       if (type === "checkbox" && name === "agreeToTerms") {
//          setAgreeToTerms(checked);
//          return;
//       }

//       switch (name) {
//          case "first_name":
//             setFirstName(value);
//             break;
//          case "last_name":
//             setLastName(value);
//             break;
//          case "email":
//             setEmail(value);
//             break;
//          case "password":
//             setPassword(value);
//             break;
//          case "confirmPassword":
//             setConfirmPassword(value);
//             break;
//          default:
//             break;
//       }
//    };

//    const passwordValidation = password ? validatePasswordStrength(password) : null;

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

//       // Log validation errors
//       if (state.errors && Object.keys(state.errors).length > 0) {
//          console.log("Validation errors:", state.errors);
//       }
//    }, [state.message, state.success, state.errors]);

//    // (
//    //    async (prevState: ActionState, formData: FormData) => {
//    //       const firstNameValue = formData.get("first_name") as string;
//    //       const lastNameValue = formData.get("last_name") as string;
//    //       const emailValue = formData.get("email") as string;
//    //       const passwordValue = formData.get("password") as string;
//    //       const confirmPasswordValue = formData.get("confirmPassword") as string;
//    //       const agreeToTermsValue = formData.get("agreeToTerms") === "on";

//    //       // Validate
//    //       const errors: ActionState["errors"] = {};

//    //       // First name validation
//    //       if (!firstNameValue) {
//    //          errors.first_name = "First name is required";
//    //       } else if (firstNameValue.length < 2) {
//    //          errors.first_name = "At least 2 characters";
//    //       }

//    //       // Last name validation
//    //       if (!lastNameValue) {
//    //          errors.last_name = "Last name is required";
//    //       } else if (lastNameValue.length < 2) {
//    //          errors.last_name = "At least 2 characters";
//    //       }

//    //       // Email validation
//    //       if (!emailValue) {
//    //          errors.email = "Email is required";
//    //       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
//    //          errors.email = "Enter a valid email address";
//    //       }

//    //       // Password validation
//    //       if (!passwordValue) {
//    //          errors.password = "Password is required";
//    //       } else if (passwordValue.length < 8) {
//    //          errors.password = "At least 8 characters";
//    //       } else if (!/[A-Z]/.test(passwordValue)) {
//    //          errors.password = "Needs uppercase letter";
//    //       } else if (!/[a-z]/.test(passwordValue)) {
//    //          errors.password = "Needs lowercase letter";
//    //       } else if (!/\d/.test(passwordValue)) {
//    //          errors.password = "Needs a number";
//    //       }

//    //       // Confirm password validation
//    //       if (!confirmPasswordValue) {
//    //          errors.confirmPassword = "Please confirm your password";
//    //       } else if (passwordValue !== confirmPasswordValue) {
//    //          errors.confirmPassword = "Passwords don't match";
//    //       }

//    //       // Terms validation
//    //       if (!agreeToTermsValue) {
//    //          errors.agreeToTerms = "You must agree to continue";
//    //       }

//    //       if (Object.keys(errors).length > 0) {
//    //          return { errors, success: false };
//    //       }

//    //       // Attempt registration
//    //       const tid = toast.loading("Creating your account…", { description: "Setting up your profile." });

//    //       try {
//    //          const res = await register({
//    //             first_name: firstNameValue,
//    //             last_name: lastNameValue,
//    //             email: emailValue,
//    //             password: passwordValue,
//    //          });

//    //          if (res?.id || res?.success || res?.userId || res?.data?.id) {
//    //             toast.success("Account created!", { id: tid, description: "Signing you in…", duration: 2000 });

//    //             const signInResult = await signIn("credentials", {
//    //                email: emailValue,
//    //                password: passwordValue,
//    //                redirect: false,
//    //             });

//    //             if (signInResult?.ok) {
//    //                router.push("/");
//    //             } else {
//    //                toast.info("Account created", { description: "Please sign in to continue." });
//    //                router.push("/login");
//    //             }

//    //             return { success: true, message: "Registration successful!" };
//    //          } else {
//    //             toast.dismiss(tid);
//    //             return {
//    //                errors: {},
//    //                success: false,
//    //                message: "Registration completed but received an unexpected response.",
//    //             };
//    //          }
//    //       } catch (err: any) {
//    //          const msg = parseError(err.message || "");
//    //          toast.error("Registration failed", { id: tid, description: msg, duration: 5000 });
//    //          return {
//    //             errors: {},
//    //             success: false,
//    //             message: msg,
//    //          };
//    //       }
//    //    },
//    //    { errors: {}, success: false },
//    // );

//    // ── Social login ─────────────────────────────────────────────────────────────
//    const handleSocial = (provider: "google" | "github") => {
//       const tid = toast.loading(`Connecting to ${provider}…`);
//       try {
//          signIn(provider, { callbackUrl: "/dashboard" });
//          toast.success(`Connected to ${provider}`, { id: tid });
//       } catch {
//          toast.error(`${provider} sign-in failed`, { id: tid, duration: 4000 });
//       }
//    };

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
//          {/* Glow */}
//          <div aria-hidden className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)" }} />

//          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="relative z-10 w-full max-w-lg">
//             {/* Header */}
//             <div className="text-center mb-8">
//                <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease, delay: 0.08 }}
//                   className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
//                >
//                   Get Started
//                </motion.span>
//                <motion.h1
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, ease, delay: 0.12 }}
//                   style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}
//                   className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3"
//                >
//                   Create Account
//                </motion.h1>
//                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease, delay: 0.2 }} className="text-sm font-mono text-white/30">
//                   Already have an account?{" "}
//                   <Link href="/login" className="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2">
//                      Sign in
//                   </Link>
//                </motion.p>
//             </div>

//             {/* Card */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.18 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8">
//                {/* Social */}
//                <div className="grid grid-cols-2 gap-2.5 mb-6">
//                   <SocialBtn onClick={() => handleSocial("google")} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24">
//                         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                         <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                         <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                      </svg>
//                      Google
//                   </SocialBtn>
//                   <SocialBtn onClick={() => handleSocial("github")} disabled={isLoading}>
//                      <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
//                         <path
//                            fillRule="evenodd"
//                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                            clipRule="evenodd"
//                         />
//                      </svg>
//                      GitHub
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
//                   {/* Name row - First & Last Name */}
//                   <div className="grid grid-cols-2 gap-3">
//                      {/* First Name */}
//                      <div>
//                         <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">First Name</label>
//                         <div className="relative">
//                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                            <input name="first_name" type="text" value={firstName} onChange={handleChange} placeholder="Gaziur" className={fieldCls(!!state.errors?.first_name)} />
//                         </div>
//                         <AnimatePresence>
//                            {state.errors?.first_name && (
//                               <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[10px] font-mono text-red-400/80">
//                                  {state.errors.first_name}
//                               </motion.p>
//                            )}
//                         </AnimatePresence>
//                      </div>

//                      {/* Last Name */}
//                      <div>
//                         <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Last Name</label>
//                         <div className="relative">
//                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                            <input name="last_name" type="text" value={lastName} onChange={handleChange} placeholder="Tahmid" className={fieldCls(!!state.errors?.last_name)} />
//                         </div>
//                         <AnimatePresence>
//                            {state.errors?.last_name && (
//                               <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[10px] font-mono text-red-400/80">
//                                  {state.errors.last_name}
//                               </motion.p>
//                            )}
//                         </AnimatePresence>
//                      </div>
//                   </div>

//                   {/* Email */}
//                   <div>
//                      <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Email</label>
//                      <div className="relative">
//                         <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
//                         <input name="email" type="email" value={email} onChange={handleChange} autoComplete="email" placeholder="you@example.com" className={fieldCls(!!state.errors?.email)} />
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
//                         <PasswordField name="password" value={password} onChange={handleChange} onBlur={() => {}} invalid={!!state.errors?.password} />
//                      </div>
//                      <PasswordStrength password={password} />
//                      <AnimatePresence>
//                         {state.errors?.password && (
//                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                               {state.errors.password}
//                            </motion.p>
//                         )}
//                      </AnimatePresence>
//                   </div>

//                   {/* Confirm password */}
//                   <div>
//                      <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Confirm Password</label>
//                      <div className="relative">
//                         <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
//                         <PasswordField name="confirmPassword" value={confirmPassword} onChange={handleChange} onBlur={() => {}} invalid={!!state.errors?.confirmPassword} />
//                      </div>
//                      {/* Password match indicator */}
//                      {confirmPassword && password && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5">
//                            {password === confirmPassword ? (
//                               <p className="text-[10px] font-mono text-emerald-400/70 flex items-center gap-1">
//                                  <CheckCircle size={10} /> Passwords match
//                               </p>
//                            ) : (
//                               <p className="text-[10px] font-mono text-red-400/70 flex items-center gap-1">✗ Passwords don't match</p>
//                            )}
//                         </motion.div>
//                      )}
//                      <AnimatePresence>
//                         {state.errors?.confirmPassword && (
//                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                               {state.errors.confirmPassword}
//                            </motion.p>
//                         )}
//                      </AnimatePresence>
//                   </div>

//                   {/* Terms */}
//                   <div>
//                      <input type="hidden" name="agreeToTerms" value={agreeToTerms ? "on" : "off"} />
//                      <label className="flex items-start gap-3 cursor-pointer group">
//                         <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-all duration-200 ${agreeToTerms ? "border-white/40 bg-white/10" : "border-white/[0.12] bg-white/[0.03]"}`}>
//                            <input type="checkbox" checked={agreeToTerms} onChange={handleChange} className="sr-only" />
//                            {agreeToTerms && <div className="w-2 h-2 rounded-sm bg-white/70" />}
//                         </div>
//                         <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors leading-relaxed">
//                            I agree to the{" "}
//                            <Link href="/terms" className="text-white/50 hover:text-white/70 underline underline-offset-2">
//                               Terms
//                            </Link>{" "}
//                            and{" "}
//                            <Link href="/privacy" className="text-white/50 hover:text-white/70 underline underline-offset-2">
//                               Privacy Policy
//                            </Link>
//                         </span>
//                      </label>
//                      <AnimatePresence>
//                         {state.errors?.agreeToTerms && (
//                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
//                               {state.errors.agreeToTerms}
//                            </motion.p>
//                         )}
//                      </AnimatePresence>
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
//                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Creating account…
//                         </>
//                      ) : (
//                         <>
//                            Create Account <ArrowRight size={15} />
//                         </>
//                      )}
//                   </motion.button>
//                </form>
//             </motion.div>

//             {/* Footer */}
//             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-[10px] font-mono text-white/15 mt-6">
//                Your data is encrypted and never sold to third parties.
//             </motion.p>
//          </motion.div>
//       </div>
//    );
// }
// app/register/page.tsx
"use client";


import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
// import { submitAction } from "@/actions/register.service";
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from "@/zod/registerValidation";
import { submitAction } from "@/components/services/auth/register.service";


// ── Shared animation config ─────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fieldCls = (invalid: boolean) =>
  `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono text-white/75 placeholder-white/20 bg-white/[0.04] outline-none
   transition-all duration-200 focus:bg-white/[0.07] focus:text-white/85
   ${invalid ? "border-red-500/50 bg-red-500/[0.04] focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`;

// ── Action State Type ───────────────────────────────────────────────────────
type ActionState = {
  errors?: Record<string, string>;
  success?: boolean;
  message?: string;
  code?: string;
};

// ── Password field component ────────────────────────────────────────────────
function PasswordField({
  value,
  onChange,
  onBlur,
  name,
  invalid,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name: string;
  invalid: boolean;
}) {
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

// ── Social button component ─────────────────────────────────────────────────
function SocialBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/55 text-sm font-mono hover:border-white/20 hover:bg-white/[0.06] hover:text-white/75 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

// ── Password strength indicator ─────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const validation = validatePassword(password);
  const { checks, strength } = validation;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-2"
    >
      {/* Strength bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              i < validation.passed
                ? getPasswordStrengthColor(strength)
                : "bg-white/[0.07]"
            }`}
          />
        ))}
      </div>

      {/* Strength text */}
      <p className={`text-[10px] font-mono ${
        strength === "strong"
          ? "text-emerald-400/70"
          : strength === "good"
          ? "text-yellow-400/70"
          : strength === "fair"
          ? "text-amber-400/70"
          : "text-red-400/70"
      }`}>
        {getPasswordStrengthText(strength)}
      </p>

      {/* Checks list */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {Object.entries(checks).map(([key, pass]) => {
          const label =
            key === "length"
              ? "8+ characters"
              : key === "uppercase"
              ? "Uppercase"
              : key === "lowercase"
              ? "Lowercase"
              : "Number";

          return (
            <span
              key={key}
              className={`flex items-center gap-1 text-[10px] font-mono transition-colors duration-200 ${
                pass ? "text-emerald-400/70" : "text-white/20"
              }`}
            >
              <CheckCircle size={9} /> {label}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Action state
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    submitAction,
    {
      errors: {},
      success: false,
    }
  );

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setAgreeToTerms(checked);
      return;
    }

    switch (name) {
      case "first_name":
        setFirstName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Show toasts for state messages
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        // Reset form on success
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAgreeToTerms(false);

        // Redirect after short delay
        setTimeout(() => {
          if (state.code === "REGISTERED_AND_LOGGED_IN") {
            router.push("/dashboard");
          } else {
            router.push("/login");
          }
        }, 2000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.success, state.code, router]);

  // Handle social login
  const handleSocial = (provider: "google" | "github") => {
    const tid = toast.loading(`Connecting to ${provider}…`);
    try {
      // signIn(provider, { callbackUrl: "/dashboard" });
      toast.success(`Service Not Connected `, { id: tid });
    } catch {
      toast.error(`${provider} sign-in failed`, { id: tid, duration: 4000 });
    }
  };

  const passwordValidation = password ? validatePassword(password) : null;
  const passwordsMatch = confirmPassword && password === confirmPassword;
  const isFormValid =
    firstName &&
    lastName &&
    email &&
    password &&
    confirmPassword &&
    passwordsMatch &&
    agreeToTerms;

  return (
     <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16">
        {/* Decorative background */}
        <div
           aria-hidden
           className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
           style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
           }}
        />
        <div
           aria-hidden
           className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
           style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
           }}
        />
        <div
           aria-hidden
           className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0"
           style={{
              background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)",
           }}
        />

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="relative z-10 w-full max-w-lg">
           {/* Header */}
           <div className="text-center mb-8">
              <motion.span
                 initial={{ opacity: 0, y: 12 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, ease, delay: 0.08 }}
                 className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
              >
                 Get Started
              </motion.span>
              <motion.h1
                 initial={{ opacity: 0, y: 14 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, ease, delay: 0.12 }}
                 style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}
                 className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-3"
              >
                 Create Account
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease, delay: 0.2 }} className="text-sm font-mono text-white/30">
                 Already have an account?{" "}
                 <Link href="/login" className="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2">
                    Sign in
                 </Link>
              </motion.p>
           </div>

           {/* Card */}
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.18 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8">
              {/* Social login */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                 <SocialBtn onClick={() => handleSocial("google")} disabled={isPending}>
                    <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24">
                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                 </SocialBtn>
                 <SocialBtn onClick={() => handleSocial("github")} disabled={isPending}>
                    <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
                       <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                       />
                    </svg>
                    GitHub
                 </SocialBtn>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                 <div className="flex-1 h-px bg-white/[0.06]" />
                 <span className="text-[11px] font-mono text-white/20 uppercase tracking-widest">or email</span>
                 <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Error message */}
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
                 {/* Name fields */}
                 <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">First Name</label>
                       <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                          <input name="first_name" type="text" value={firstName} onChange={handleChange} placeholder="John" className={fieldCls(!!state.errors?.first_name)} />
                       </div>
                       <AnimatePresence>
                          {state.errors?.first_name && (
                             <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[10px] font-mono text-red-400/80">
                                {state.errors.first_name}
                             </motion.p>
                          )}
                       </AnimatePresence>
                    </div>

                    {/* Last Name */}
                    <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Last Name</label>
                       <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                          <input name="last_name" type="text" value={lastName} onChange={handleChange} placeholder="Doe" className={fieldCls(!!state.errors?.last_name)} />
                       </div>
                       <AnimatePresence>
                          {state.errors?.last_name && (
                             <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[10px] font-mono text-red-400/80">
                                {state.errors.last_name}
                             </motion.p>
                          )}
                       </AnimatePresence>
                    </div>
                 </div>

                 {/* Email */}
                 <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Email</label>
                    <div className="relative">
                       <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                       <input name="email" type="email" value={email} onChange={handleChange} autoComplete="email" placeholder="you@example.com" className={fieldCls(!!state.errors?.email)} />
                    </div>
                    <AnimatePresence>
                       {state.errors?.email && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
                             {state.errors.email}
                          </motion.p>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Password */}
                 <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Password</label>
                    <div className="relative">
                       <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
                       <PasswordField name="password" value={password} onChange={handleChange} invalid={!!state.errors?.password} />
                    </div>
                    <PasswordStrength password={password} />
                    <AnimatePresence>
                       {state.errors?.password && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
                             {state.errors.password}
                          </motion.p>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Confirm Password */}
                 <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/30 mb-2">Confirm Password</label>
                    <div className="relative">
                       <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10" />
                       <PasswordField name="confirmPassword" value={confirmPassword} onChange={handleChange} invalid={!!state.errors?.confirmPassword} />
                    </div>

                    {/* Password match indicator */}
                    {confirmPassword && password && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5">
                          {passwordsMatch ? (
                             <p className="text-[10px] font-mono text-emerald-400/70 flex items-center gap-1">
                                <CheckCircle size={10} /> Passwords match
                             </p>
                          ) : (
                             <p className="text-[10px] font-mono text-red-400/70 flex items-center gap-1">✗ Passwords don't match</p>
                          )}
                       </motion.div>
                    )}

                    <AnimatePresence>
                       {state.errors?.confirmPassword && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
                             {state.errors.confirmPassword}
                          </motion.p>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Terms checkbox */}
                 {/* <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-all duration-200 ${
                    agreeToTerms
                      ? "border-white/40 bg-white/10"
                      : "border-white/[0.12] bg-white/[0.03]"
                  }`}
                >
                  {agreeToTerms && (
                    <div className="w-2 h-2 rounded-sm bg-white/70" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-white/50 hover:text-white/70 underline underline-offset-2"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-white/50 hover:text-white/70 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              <input
                type="hidden"
                name="agreeToTerms"
                value={agreeToTerms ? "on" : "off"}
              />
              <AnimatePresence>
                {state.errors?.agreeToTerms && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1.5 text-[11px] font-mono text-red-400/80"
                  >
                    {state.errors.agreeToTerms}
                  </motion.p>
                )}
              </AnimatePresence>
            </div> */}
                 <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                       <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-all duration-200 ${agreeToTerms ? "border-white/40 bg-white/10" : "border-white/[0.12] bg-white/[0.03]"}`}>
                          <input
                             type="checkbox"
                             checked={agreeToTerms}
                             onChange={(e) => {
                                setAgreeToTerms(e.target.checked);
                                // The hidden input value will automatically update on next render
                             }}
                             className="sr-only"
                          />
                          {agreeToTerms && <div className="w-2 h-2 rounded-sm bg-white/70" />}
                       </div>
                       <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors leading-relaxed">
                          I agree to the{" "}
                          <Link href="/terms" className="text-white/50 hover:text-white/70 underline underline-offset-2">
                             Terms
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-white/50 hover:text-white/70 underline underline-offset-2">
                             Privacy Policy
                          </Link>
                       </span>
                    </label>

                    {/* Hidden input - value updates when state changes */}
                    <input type="hidden" name="agreeToTerms" value={agreeToTerms ? "on" : "off"} />

                    <AnimatePresence>
                       {state.errors?.agreeToTerms && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] font-mono text-red-400/80">
                             {state.errors.agreeToTerms}
                          </motion.p>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Submit button */}
                 <motion.button
                    type="submit"
                    disabled={isPending || !isFormValid}
                    whileHover={{ scale: isPending ? 1 : 1.01 }}
                    whileTap={{ scale: isPending ? 1 : 0.99 }}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isPending ? (
                       <>
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Creating account…
                       </>
                    ) : (
                       <>
                          Create Account <ArrowRight size={15} />
                       </>
                    )}
                 </motion.button>
              </form>
           </motion.div>

           {/* Footer */}
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-[10px] font-mono text-white/15 mt-6">
              Your data is encrypted and never sold to third parties.
           </motion.p>
        </motion.div>
     </div>
  );
}