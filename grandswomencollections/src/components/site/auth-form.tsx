"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase/client";

const authMessages: Record<string, string> = {
  "auth/invalid-credential": "The email or password does not match our records.",
  "auth/email-already-in-use": "An account already exists for this email address.",
  "auth/weak-password": "Choose a password with at least six characters.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again."
};

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const auth = getFirebaseAuth();
      if (mode === "register") {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.push("/profile");
      router.refresh();
    } catch (caught) {
      const code = typeof caught === "object" && caught && "code" in caught ? String(caught.code) : "";
      setError(authMessages[code] ?? "We could not complete your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return <form onSubmit={submit} className="space-y-7">
    {mode === "register" && <EditorialField label="Full name" value={name} onChange={setName} autoComplete="name" />}
    <EditorialField label="Email address" type="email" value={email} onChange={setEmail} autoComplete="email" />
    <div className="relative"><EditorialField label={mode === "register" ? "Create password" : "Password"} type={showPassword ? "text" : "password"} value={password} onChange={setPassword} autoComplete={mode === "register" ? "new-password" : "current-password"} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute bottom-0 right-0 flex h-12 w-11 items-center justify-center text-[#716b63]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
    {mode === "register" && <p className="-mt-3 text-xs leading-5 text-[#716b63]">At least 6 characters. Your wardrobe stays private.</p>}
    {error && <p role="alert" className="border-y border-[#9a3f32]/20 bg-[#9a3f32]/5 px-1 py-3 text-sm text-[#81372d]">{error}</p>}
    <button disabled={loading} className="group flex min-h-14 w-full items-center justify-between rounded-full bg-[#241b16] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f7f4ed] transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"><span>{loading ? "Please wait" : mode === "register" ? "Create my wardrobe" : "Enter my wardrobe"}</span>{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}</button>
  </form>;
}

function EditorialField({ label, type = "text", value, onChange, autoComplete }: { label: string; type?: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  return <label className="block"><span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#716b63]">{label}</span><input required type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className="mt-2 h-12 w-full border-b border-[#171310]/18 bg-transparent pr-11 text-base text-[#171310] outline-none transition-colors focus:border-[#b98a3d]" /></label>;
}
