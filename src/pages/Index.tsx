import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import LibrarySection from "@/components/LibrarySection";
import BrandsFriendsSection from "@/components/BrandsFriendsSection";
import ManifestoSection from "@/components/ManifestoSection";
import Footer from "@/components/Footer";
import StickyFooter from "@/components/StickyFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ShopSection />
        <LibrarySection />
        <BrandsFriendsSection />
        <ManifestoSection />
      </main>
      <Footer />
      <StickyFooter />
    </div>
  );
};

export default Index;
