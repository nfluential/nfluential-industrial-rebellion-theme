import { useCallback, useState } from "react";
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
  
  const { products: shopifyProducts, loading, error } = useShopifyProducts(12);
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const hasShopifyProducts = shopifyProducts.length > 0;
  const displayProducts = hasShopifyProducts ? shopifyProducts : [];

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, (hasShopifyProducts ? shopifyProducts.length : mockProducts.length) - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load products</p>
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && !hasShopifyProducts && (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h3 className="font-display text-2xl uppercase">No Products Yet</h3>
            <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto">
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

            {/* Carousel Track */}
            <div className="overflow-x-auto md:overflow-hidden mx-4 md:mx-8 scrollbar-hide touch-pan-y overscroll-x-auto">
              <div 
                className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
                style={{ transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateX(-${currentIndex * (100 / itemsPerView)}%)` : 'none' }}
              >
                {displayProducts.map((product) => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const isAdding = addingProductId === product.node.id;
                  
                  return (
                    <div
                      key={product.node.id}
                      className="flex-shrink-0 w-[280px] md:w-[calc(33.333%-1rem)] group"
                    >
                      <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-glow">
                        <Link to={`/product/${product.node.handle}`} className="block aspect-[3/4] overflow-hidden bg-muted">
                          {image ? (
                            <img 
                              src={image.url} 
                              alt={image.altText || product.node.title}
                              className="w-full h-full object-cover grayscale-hover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                        </Link>
                        <div className="p-4 space-y-3">
                          <Link to={`/product/${product.node.handle}`}>
                            <h3 className="font-display text-lg uppercase tracking-wide group-hover:text-primary transition-colors">
                              {product.node.title}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-primary text-lg">
                              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                            </span>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddToCart(product)}
                              disabled={cartLoading || isAdding}
                            >
                              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
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
            <div className="flex md:hidden justify-center items-center gap-2 mt-4 text-muted-foreground">
              <span className="text-lg animate-pulse">←</span>
              <span className="font-mono text-xs uppercase tracking-widest">Swipe</span>
              <span className="text-lg animate-pulse">→</span>
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
        )}

        {/* View All CTA */}
        {hasShopifyProducts && (
          <div className="text-center mt-12">
            <a
              href="#"
              className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground hover:border-primary pb-1"
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
