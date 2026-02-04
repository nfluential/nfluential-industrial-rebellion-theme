import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  onAddToCart: (product: ShopifyProduct) => Promise<void>;
  isAdding: boolean;
  disabled?: boolean;
  showDescription?: boolean;
}

const ShopifyProductCard = ({
  product,
  onAddToCart,
  isAdding,
  disabled = false,
  showDescription = false,
}: ShopifyProductCardProps) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  return (
    <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-glow group">
      <Link 
        to={`/product/${product.node.handle}`} 
        className="block aspect-[3/4] overflow-hidden bg-muted"
      >
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
        {showDescription && (
          <p className="font-mono text-xs text-muted-foreground line-clamp-2">
            {product.node.description || "Premium streetwear piece"}
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-primary text-base sm:text-lg">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={disabled || isAdding}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            {isAdding ? (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyProductCard;
