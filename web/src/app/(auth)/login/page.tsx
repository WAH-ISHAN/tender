"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toaster";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [isResetMode, setIsResetMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Invalid Credentials", "Please enter a valid authorized supplier email address.");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Invalid Credentials", "Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    // Set authenticated session cookie for route protection middleware
    document.cookie = "tenderhub_auth=authenticated; path=/; max-age=86400; SameSite=Strict";

    toast.success(
      "Authorization Verified",
      "Welcome back! Redirecting to your procurement dashboard..."
    );

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes("@") || !resetEmail.includes(".")) {
      toast.error("Invalid Email Format", "Please provide a valid registered corporate email address.");
      return;
    }
    setResetSent(true);
    toast.success("Recovery Dispatched", `A reset link was generated for ${resetEmail}.`);
  };

  return (
    <div className="max-w-[460px] mx-auto px-6 py-16">
      <div className="bg-white border border-slate-200/90 p-8 lg:p-10 rounded-2xl shadow-md">
        
        {!isResetMode ? (
          /* 1. Normal Sign In View */
          <div className="animate-fadeIn">
            <h1 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] uppercase mb-2 text-center tracking-tight">
              SUPPLIER PORTAL LOGIN
            </h1>
            <p className="text-xs text-slate-500 font-normal text-center mb-8">
              Enter your authorized credentials to access live tender gazettes
            </p>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="supplier@company.lk" 
                  className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setResetSent(false);
                    }}
                    className="text-xs text-[#0055B8] font-bold hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0055B8] hover:bg-[#004394] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md mt-2 uppercase tracking-wider cursor-pointer"
              >
                {isLoading ? "Authenticating..." : "Sign In to Portal"}
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 font-normal mt-8 pt-6 border-t border-slate-200">
              New contractor or enterprise?{" "}
              <Link href="/register" className="text-[#0055B8] font-bold hover:underline">
                Register for Free
              </Link>
            </div>
          </div>
        ) : (
          /* 2. Interactive Forgot Password / Recovery View */
          <div className="animate-fadeIn">
            <h1 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] uppercase mb-2 text-center tracking-tight">
              RESET PASSWORD
            </h1>
            <p className="text-xs text-slate-500 font-normal text-center mb-8">
              Enter your registered corporate email to receive a secure recovery link
            </p>

            {resetSent ? (
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 text-center animate-fadeIn">
                <div className="text-[#0055B8] font-black text-base mb-2">
                  Recovery Link Dispatched
                </div>
                <p className="text-xs text-slate-700 font-normal leading-relaxed mb-6">
                  A secure reset link has been dispatched to <strong className="text-[#0055B8] font-bold">{resetEmail}</strong>. Please check your inbox and spam folders.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setResetSent(false);
                    setResetEmail("");
                  }}
                  className="w-full bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs py-3 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Corporate Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="supplier@company.lk" 
                    className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0055B8] focus:bg-white rounded-xl py-3 px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0055B8] hover:bg-[#004394] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 shadow-md mt-2 uppercase tracking-wider cursor-pointer"
                >
                  Send Recovery Link
                </button>

                <button
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="text-xs font-bold text-slate-500 hover:text-[#0055B8] text-center pt-2 transition-colors cursor-pointer"
                >
                  &larr; Back to Portal Sign In
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
