import { SiteFooter } from "@/components/site/footer";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteHeader } from "@/components/site/header";
import { HeroSection } from "@/components/site/hero-section";
import { EditorialStory } from "@/components/site/editorial-story";
import { FeaturedCollections } from "@/components/site/featured-collections";
import { LuxuryCategoryGrid } from "@/components/site/luxury-category-grid";
import { ProductCarousels } from "@/components/site/product-carousels";
import { AIFashionStylistBanner, AIVisualSearchBanner } from "@/components/site/ai-banners";
import { CompleteTheLook } from "@/components/site/complete-the-look";
import { InstagramGallery } from "@/components/site/instagram-gallery";
import { Newsletter } from "@/components/site/newsletter";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { getHomePageData } from "@/lib/site";

export default function HomePage() {
  const {
    trendingProducts,
    bestSellers,
    newArrivals
  } = getHomePageData();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <EditorialStory />
        <FeaturedCollections />
        <LuxuryCategoryGrid />
        <ProductCarousels
          trendingProducts={trendingProducts}
          bestSellers={bestSellers}
          newArrivals={newArrivals}
        />
        <AIFashionStylistBanner />
        <AIVisualSearchBanner />
        <CompleteTheLook />
        <TestimonialsSection />
        <InstagramGallery />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
