import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <Card className="mx-auto max-w-xl p-8">
          <h1 className="font-serif text-4xl text-ink dark:text-cream">Login</h1>
          <div className="mt-6 grid gap-4">
            <Input placeholder="Email address" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Continue securely</Button>
            <Link href="/forgot-password" className="text-sm text-ink/60 dark:text-cream/60">Forgot password?</Link>
          </div>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
