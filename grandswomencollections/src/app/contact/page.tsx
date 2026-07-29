import Image from "next/image";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ContactForm } from "@/components/site/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = { title: "Contact Us - GRAND Women's Collections" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        {/* Liquid Glass Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 opacity-20 dark:opacity-15">
            <Image
              src="/images/collection_jewelry_1785319899305.png"
              alt="Temple Jewelry Atelier"
              fill
              className="object-cover"
            />
          </div>
          <div className="container relative z-10 py-8 text-center max-w-2xl mx-auto">
            <span className="glass-pill px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] text-gold inline-block mb-4">
              Personal Shoppers & Styling Concierge
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-ink dark:text-cream">Get in Touch</h1>
            <p className="mt-4 text-base text-ink/70 dark:text-cream/70 font-light">
              We welcome inquiries for custom saree drapes, bridal trousseau consultations, and boutique visits.
            </p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-4xl text-ink dark:text-cream leading-tight">We&apos;d love to assist you.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
                  Whether you require urgent bridal fitting, custom color dyed silks, or styling suggestions for an upcoming event, our personal shoppers are at your service.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "concierge@grandwomenscollections.com" },
                  { icon: Phone, label: "VIP Line", value: "+91 98765 43210" },
                  { icon: MapPin, label: "Boutique Atelier", value: "Kanchipuram & Chennai Luxury Flagship" },
                  { icon: Clock, label: "Hours", value: "Mon-Sat, 10am - 8pm IST" }
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-2xl p-5 border border-black/5 dark:border-white/10 flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{item.label}</p>
                      <p className="mt-0.5 text-sm font-semibold text-ink dark:text-cream">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
