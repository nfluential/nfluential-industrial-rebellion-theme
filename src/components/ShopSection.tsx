import { useCallback, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Fallback mock products for when store has no products
import hoodieImg from "@/assets/product-hoodie.jpg";
import croptopImg from "@/assets/product-croptop.jpg";
import sweatsImg from "@/assets/product-sweats.jpg";

const mockProducts = [
  { id: 1, image: hoodieImg, name: "Fearless Hoodie", price: "$89.00", category: "Hoodies" },
  { id: 2, image: croptopImg, name: "Rebellion Crop", price: "$49.00", category: "Crop Tops" },
  { id: 3, image: sweatsImg, name: "Movement Sweats", price: "$75.00", category: "Bottoms" },
];

const ShopSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.05 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { products: shopifyProducts, loading, error } = useShopifyProducts(12);
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const hasShopifyProducts = shopifyProducts.length > 0;
  const displayProducts = hasShopifyProducts ? shopifyProducts : [];

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);
  
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, (hasShopifyProducts ? shopifyProducts.length : mockProducts.length) - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Touch/swipe handling for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleAddToCart = async (product: typeof shopifyProducts[0]) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    
    setAddingProductId(product.node.id);
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    });
    setAddingProductId(null);
    toast.success("Added to cart", { description: product.node.title });
  };

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
        {!loading && !error && !hasShopifyProducts && (
          <div className="text-center py-12 sm:py-16 space-y-3 sm:space-y-4">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground/50" />
            <h3 className="font-display text-xl sm:text-2xl uppercase">No Products Yet</h3>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
              Products will appear here once added to the store.
            </p>
          </div>
        )}

        {/* Shopify Products Carousel */}
        {!loading && !error && hasShopifyProducts && (
          <div 
            ref={carouselRef}
            className={`relative ${carouselVisible ? 'animate-scale-in' : 'scroll-hidden'}`}
          >
            {/* Navigation Buttons - Hidden on mobile */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 md:-ml-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 md:-mr-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            {/* Carousel Track with touch swipe */}
            <div 
              ref={scrollContainerRef}
              className="overflow-hidden mx-0 sm:mx-4 md:mx-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out gap-3 sm:gap-4 md:gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {displayProducts.map((product) => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const isAdding = addingProductId === product.node.id;
                  
                  return (
                    <div
                      key={product.node.id}
                      className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] group"
                    >
                      <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-glow">
                        <Link to={`/product/${product.node.handle}`} className="block aspect-[3/4] overflow-hidden bg-muted">
                          {image ? (
                            <img 
                              src={image.url} 
                              alt={image.altText || product.node.title}
                              className="w-full h-full object-cover grayscale-hover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                        </Link>
                        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                          <Link to={`/product/${product.node.handle}`}>
                            <h3 className="font-display text-base sm:text-lg uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-1">
                              {product.node.title}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-primary text-base sm:text-lg">
                              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                            </span>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddToCart(product)}
                              disabled={cartLoading || isAdding}
                              className="text-xs sm:text-sm px-2 sm:px-3"
                            >
                              {isAdding ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : "Add"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Swipe Indicator (Mobile only) */}
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
                  onClick={() => setCurrentIndex(idx)}
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
        {hasShopifyProducts && (
          <div className="text-center mt-8 sm:mt-12">
            <a
              href="#"
              className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground hover:border-primary pb-1"
            >
              View All Products →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
