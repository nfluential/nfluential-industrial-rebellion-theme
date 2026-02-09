import { ChevronLeft, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCarousel } from "@/hooks/useCarousel";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Button } from "@/components/ui/button";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const ShopSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.05 });
  
  const { products, loading, error } = useShopifyProducts(12, 'featured-products');
  const { handleAddToCart, addingProductId, cartLoading } = useAddToCart();
  
  const {
    currentIndex,
    itemsPerView,
    maxIndex,
    handlePrev,
    handleNext,
    goToIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    canGoPrev,
    canGoNext,
  } = useCarousel({
    totalItems: products.length,
    breakpoints: { sm: 1, md: 2, lg: 3 },
  });

  const hasProducts = products.length > 0;

  return (
    <section id="shop" className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4 ${headerVisible ? 'animate-slide-up' : 'scroll-hidden'}`}
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [001] Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold">
            The <span className="text-primary">Shop</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
            Premium streetwear for those who move in silence but speak through presence.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16 sm:py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 sm:py-12">
            <p className="text-muted-foreground text-sm sm:text-base">Failed to load products</p>
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && !hasProducts && (
          <div className="text-center py-12 sm:py-16 space-y-3 sm:space-y-4">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground/50" />
            <h3 className="font-display text-xl sm:text-2xl uppercase">No Products Yet</h3>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
              Products will appear here once added to the store.
            </p>
          </div>
        )}

        {/* Products Carousel */}
        {!loading && !error && hasProducts && (
          <div 
            ref={carouselRef}
            className={`relative ${carouselVisible ? 'animate-scale-in' : 'scroll-hidden'}`}
          >
            {/* Navigation Buttons */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 md:-ml-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 md:-mr-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            {/* Carousel Track */}
            <div 
              className="overflow-hidden mx-0 sm:mx-4 md:mx-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out gap-3 sm:gap-4 md:gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {products.map((product) => (
                  <div
                    key={product.node.id}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <ShopifyProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      isAdding={addingProductId === product.node.id}
                      disabled={cartLoading}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Swipe Indicator (Mobile) */}
            <div className="flex sm:hidden justify-center items-center gap-2 mt-4 text-muted-foreground">
              <span className="text-lg animate-pulse">←</span>
              <span className="font-mono text-[10px] uppercase tracking-widest">Swipe</span>
              <span className="text-lg animate-pulse">→</span>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToIndex(idx)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary w-4 sm:w-6' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* View All CTA */}
        {hasProducts && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/shop"
              className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground hover:border-primary pb-1"
            >
              View All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
