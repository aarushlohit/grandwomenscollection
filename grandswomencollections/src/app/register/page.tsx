import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <Card className="mx-auto max-w-xl p-8">
          <h1 className="font-serif text-4xl text-ink dark:text-cream">Create account</h1>
          <div className="mt-6 grid gap-4">
            <Input placeholder="Full name" />
            <Input placeholder="Email address" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Create account</Button>
          </div>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
