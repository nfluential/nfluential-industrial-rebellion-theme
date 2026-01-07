import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShopSection from "@/components/ShopSection";
import LibrarySection from "@/components/LibrarySection";
import MovementsSection from "@/components/MovementsSection";
import ManifestoSection from "@/components/ManifestoSection";
import Footer from "@/components/Footer";
import StickyFooter from "@/components/StickyFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ShopSection />
        <LibrarySection />
        <MovementsSection />
        <ManifestoSection />
      </main>
      <Footer />
      <StickyFooter />
    </div>
  );
};

export default Index;
