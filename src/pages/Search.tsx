import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { products, loading } = useShopifyProducts(50);
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.node.title.toLowerCase().includes(lowerQuery) ||
      product.node.description?.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

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

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          {/* Search Header */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8">
              SEARCH <span className="text-primary">PRODUCTS</span>
            </h1>
            
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 h-12 sm:h-14 text-base sm:text-lg bg-card border-border"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!loading && (
            <>
              {query && (
                <p className="font-mono text-xs sm:text-sm text-muted-foreground text-center mb-6 sm:mb-8">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
              )}

              {filteredProducts.length === 0 && query ? (
                <div className="text-center py-12 sm:py-16">
                  <p className="font-mono text-muted-foreground mb-4">No products found</p>
                  <Button variant="outline" onClick={clearSearch}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => {
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
                    );
                  })}
                </div>
              )}

              {!query && products.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <p className="font-mono text-muted-foreground">No products available yet</p>
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

export default Search;
