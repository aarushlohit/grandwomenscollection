import Link from "next/link";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export default function LoginPage() {
  return <AuthShell eyebrow="Private client access" title="Welcome back." description="Sign in to view your orders, saved pieces and personal styling recommendations." footer={<>New to Grand? <Link href="/register" className="font-semibold text-ink underline decoration-gold underline-offset-4 dark:text-cream">Create an account</Link></>}>
    <AuthForm mode="login" />
    <div className="mt-5 text-right"><Link href="/forgot-password" className="text-xs text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink dark:text-cream/50 dark:hover:text-cream">Forgot your password?</Link></div>
  </AuthShell>;
}
