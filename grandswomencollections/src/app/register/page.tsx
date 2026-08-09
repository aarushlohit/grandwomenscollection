import Link from "next/link";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export default function RegisterPage() {
  return <AuthShell eyebrow="Join the house" title="Your Grand wardrobe." description="Create an account for faster checkout, private wishlists and thoughtful recommendations." footer={<>Already a client? <Link href="/login" className="font-semibold text-ink underline decoration-gold underline-offset-4 dark:text-cream">Sign in</Link></>}>
    <AuthForm mode="register" />
  </AuthShell>;
}
