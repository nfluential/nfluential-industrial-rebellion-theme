import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ziLogo from "@/assets/brand-zi-logo.png";
import hurriyaLogo from "@/assets/brand-hurriya-logo.png";
import asadCarterLogo from "@/assets/brand-asad-carter-logo.png";
import raindripLogo from "@/assets/brand-raindrip-logo.png";

interface Brand {
  name: string;
  logo?: string;
  textLogo?: string;
  url: string;
  description: string;
}

const brands: Brand[] = [
  {
    name: "Asad Carter",
    logo: asadCarterLogo,
    url: "https://www.asadcarter.com",
    description: "The Literary King of Comedy",
  },
  {
    name: "ᙇ | Zi",
    logo: ziLogo,
    url: "https://www.zi.gr",
    description: "Tomorrow's Technology, Today",
  },
  {
    name: "RAiN DRiP",
    logo: raindripLogo,
    url: "https://www.raindrip.in",
    description: "Premium Designer Products by Autumn Rain",
  },
  {
    name: "Hurriya",
    logo: hurriyaLogo,
    url: "https://www.Hurriya.us",
    description: "Freedom for Incarcerated Voices",
  },
];

// Shuffle brands for random placement
const shuffledBrands = [...brands].sort(() => Math.random() - 0.5);
// Double for seamless loop
const marqueeItems = [...shuffledBrands, ...shuffledBrands];

const FriendsMarquee = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 bg-card border-y border-border overflow-hidden">
      <div className="container mb-8">
        <div 
          ref={ref}
          className={`text-center space-y-3 ${isVisible ? 'animate-fade-in' : 'scroll-hidden'}`}
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            Nfluential <span className="text-primary">Friends</span> <span className="text-foreground">&</span> <span className="text-primary">Brands</span>
          </h3>
          <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto">
            Those who carved their own paths and refused to follow the crowd
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex animate-marquee-slow">
          {marqueeItems.map((brand, index) => (
            <a
              key={`${brand.name}-${index}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 md:mx-12 group transition-transform hover:scale-110"
              title={`${brand.name} - ${brand.description}`}
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="font-display text-2xl md:text-3xl text-muted-foreground hover:text-primary transition-colors">
                  {brand.textLogo || brand.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FriendsMarquee;