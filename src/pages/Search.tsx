import { useState, useCallback, useMemo } from "react";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useAddToCart } from "@/hooks/useAddToCart";

const Search = () => {
  const [query, setQuery] = useState("");
  const { products, loading } = useShopifyProducts(50);
  const { handleAddToCart, addingProductId, cartLoading } = useAddToCart();

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.node.title.toLowerCase().includes(lowerQuery) ||
      product.node.description?.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

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
              <Input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 sm:h-14 text-base sm:text-lg bg-card border-border text-center"
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
                  {filteredProducts.map((product) => (
                    <ShopifyProductCard
                      key={product.node.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      isAdding={addingProductId === product.node.id}
                      disabled={cartLoading}
                    />
                  ))}
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
