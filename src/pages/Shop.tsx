import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Shop = () => {
  const { products, loading } = useShopifyProducts(50);
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = async (product: typeof products[0]) => {
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-3 sm:mb-4">
              The Collection
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              SHOP <span className="text-primary glow-eagles">NFLUENTIAL</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
              Urban streetwear for the fearless. Each piece designed to make a statement.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <p className="font-mono text-muted-foreground mb-4">No products available yet</p>
                  <p className="font-mono text-xs text-muted-foreground">Check back soon for new drops</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product) => {
                    const image = product.node.images.edges[0]?.node;
                    const price = product.node.priceRange.minVariantPrice;
                    const isAdding = addingProductId === product.node.id;

                    return (
                      <div
                        key={product.node.id}
                        className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-glow group"
                      >
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
                          <p className="font-mono text-xs text-muted-foreground line-clamp-2">
                            {product.node.description || "Premium streetwear piece"}
                          </p>
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
                              {isAdding ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : "Add to Cart"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
