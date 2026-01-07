import ProductCard from "@/components/ProductCard";
import hoodieImg from "@/assets/product-hoodie.jpg";
import croptopImg from "@/assets/product-croptop.jpg";
import sweatsImg from "@/assets/product-sweats.jpg";

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
  return (
    <section id="shop" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
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

        {/* Product Grid - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${
                index === 0 || index === 4 ? "sm:row-span-1" : ""
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
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
