import Link from "next/link";
import { AuthShell } from "@/components/site/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return <AuthShell eyebrow="Account recovery" title="Reset access." description="Enter the email used for your Grand account. We’ll send a secure, time-limited reset link." footer={<Link href="/login" className="font-semibold text-ink underline decoration-gold underline-offset-4 dark:text-cream">Return to sign in</Link>}>
    <div className="grid gap-4"><Input aria-label="Email address" placeholder="Email address" type="email" /><Button className="w-full">Send reset link</Button></div>
  </AuthShell>;
}
