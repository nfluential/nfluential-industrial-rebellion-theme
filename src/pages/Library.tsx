import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useAddToCart } from "@/hooks/useAddToCart";

const Library = () => {
  const { products, loading } = useShopifyProducts(50, 'all-books');
  const { handleAddToCart, addingProductId, cartLoading } = useAddToCart();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-3 sm:mb-4">
              Knowledge is Power
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              THE <span className="text-primary glow-eagles">LIBRARY</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
              Books, journals, and resources for the Nfluential minded.
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
                  <p className="font-mono text-muted-foreground mb-4">No books available yet</p>
                  <p className="font-mono text-xs text-muted-foreground">Check back soon for new releases</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ShopifyProductCard
                      key={product.node.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      isAdding={addingProductId === product.node.id}
                      disabled={cartLoading}
                      showDescription
                    />
                  ))}
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

export default Library;
