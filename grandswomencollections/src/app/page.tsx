import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { HeroSection } from "@/components/site/hero-section";
import { EditorialHome } from "@/components/site/editorial-home";

export default function HomePage() {
  return <><SiteHeader /><main><HeroSection /><EditorialHome /></main><SiteFooter /></>;
}
