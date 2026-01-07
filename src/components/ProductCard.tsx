import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

const ProductCard = ({ image, name, price, category }: ProductCardProps) => {
  return (
    <div className="group relative bg-card overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale-hover"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="hero" size="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Quick Add
          </Button>
        </div>

        {/* Category Tag */}
        <span className="absolute top-4 left-4 font-mono text-xs uppercase tracking-wider bg-background/90 px-2 py-1">
          {category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-display text-lg uppercase tracking-wide text-foreground">
          {name}
        </h3>
        <p className="font-mono text-sm text-primary font-bold">
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
