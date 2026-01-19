import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import hoodieImg from "@/assets/product-hoodie.jpg";
import croptopImg from "@/assets/product-croptop.jpg";
import sweatsImg from "@/assets/product-sweats.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    image: hoodieImg,
    name: "Fearless Hoodie",
    price: "$89.00",
    category: "Hoodies",
  },
  {
    id: 2,
    image: croptopImg,
    name: "Rebellion Crop",
    price: "$49.00",
    category: "Crop Tops",
  },
  {
    id: 3,
    image: sweatsImg,
    name: "Movement Sweats",
    price: "$75.00",
    category: "Bottoms",
  },
  {
    id: 4,
    image: hoodieImg,
    name: "Night Vision Hoodie",
    price: "$95.00",
    category: "Hoodies",
  },
  {
    id: 5,
    image: croptopImg,
    name: "Stealth Crop",
    price: "$55.00",
    category: "Crop Tops",
  },
  {
    id: 6,
    image: sweatsImg,
    name: "Empire Sweats",
    price: "$79.00",
    category: "Bottoms",
  },
];

const ShopSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.05 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  return (
    <section id="shop" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 space-y-4 ${headerVisible ? 'animate-slide-up' : 'scroll-hidden'}`}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [001] Collection
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            The <span className="text-primary">Shop</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto">
            Premium streetwear for those who move in silence but speak through presence.
          </p>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className={`relative ${carouselVisible ? 'animate-scale-in' : 'scroll-hidden'}`}
        >
          {/* Navigation Buttons */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel Track - Touch scrollable on mobile */}
          <div className="overflow-x-auto md:overflow-hidden mx-4 md:mx-8 scrollbar-hide touch-pan-x">
            <div 
              className="flex transition-transform duration-500 ease-out gap-4 md:gap-6 md:touch-none"
              style={{ transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateX(-${currentIndex * (100 / itemsPerView)}%)` : 'none' }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[280px] md:w-[calc(33.333%-1rem)]"
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground hover:border-primary pb-1"
          >
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
