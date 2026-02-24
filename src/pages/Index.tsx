import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import DigitalRipple from "@/components/DigitalRipple";

// Lazy load below-fold sections for performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ShopSection = lazy(() => import("@/components/ShopSection"));
const LibrarySection = lazy(() => import("@/components/LibrarySection"));
const QuickConnectSection = lazy(() => import("@/components/QuickConnectSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const FriendsMarquee = lazy(() => import("@/components/FriendsMarquee"));

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DigitalRipple />
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ShopSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <LibrarySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <QuickConnectSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <NewsletterSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FriendsMarquee />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
