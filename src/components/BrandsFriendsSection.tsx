import { useState } from "react";
import { Button } from "@/components/ui/button";
import hurriyaLogo from "@/assets/hurriya-logo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ChainButton = ({ href }: { href: string }) => {
  const [isBreaking, setIsBreaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const handleClick = () => {
    if (isBroken) {
      window.open(href, "_blank");
      return;
    }
    setIsBreaking(true);
    setTimeout(() => {
      setIsBroken(true);
      setIsBreaking(false);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden"
    >
      {/* Left Chain */}
      <span
        className={`font-mono text-2xl transition-all duration-500 ${
          isBreaking ? "animate-chain-break-left" : ""
        } ${isBroken ? "opacity-0 -translate-x-8" : ""}`}
      >
        ⛓️
      </span>

      {/* Button Core */}
      <span
        className={`relative px-8 py-4 font-display text-sm uppercase tracking-widest border-2 transition-all duration-300 ${
          isBroken
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
        }`}
      >
        {isBroken ? "Unchained" : "Break Free"}
        
        {/* Spark effect on break */}
        {isBreaking && (
          <>
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 animate-spark-left text-yellow-400">✦</span>
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 animate-spark-right text-yellow-400">✦</span>
          </>
        )}
      </span>

      {/* Right Chain */}
      <span
        className={`font-mono text-2xl transition-all duration-500 ${
          isBreaking ? "animate-chain-break-right" : ""
        } ${isBroken ? "opacity-0 translate-x-8" : ""}`}
      >
        ⛓️
      </span>
    </button>
  );
};

const BrandCard = ({ 
  name, 
  subtitle, 
  description, 
  url, 
  variant = "default",
  logo,
  symbol
}: { 
  name: string; 
  subtitle: string; 
  description: string; 
  url: string;
  variant?: "default" | "hurriya" | "alien" | "zi";
  logo?: string;
  symbol?: string;
}) => {
  const bgStyles = {
    default: "",
    hurriya: (
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 right-0 h-8 bg-foreground transform -rotate-3" />
        <div className="absolute top-1/2 left-0 right-0 h-12 bg-foreground transform rotate-2" />
        <div className="absolute bottom-1/3 left-0 right-0 h-6 bg-foreground transform -rotate-1" />
      </div>
    ),
    alien: (
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
    ),
    zi: (
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 30% 70%, hsl(var(--accent)) 0%, transparent 50%),
                       radial-gradient(circle at 70% 30%, hsl(var(--primary)) 0%, transparent 50%)`,
        }} />
      </div>
    ),
  };

  return (
    <div className="relative group overflow-hidden bg-card border border-border p-8 md:p-10 min-h-[350px] flex flex-col justify-between">
      {bgStyles[variant]}

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase border border-border px-3 py-1">
            {variant === "hurriya" || variant === "alien" ? "Brand" : "Friend"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {logo && (
          <div className="mb-4">
            <img src={logo} alt={name} className="h-16 md:h-20 w-auto" />
          </div>
        )}

        {symbol && (
          <div className="mb-4">
            <span className="text-4xl md:text-5xl">{symbol}</span>
          </div>
        )}

        <h3 className="font-display text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          {variant === "alien" ? (
            <>ILLEGAL <span className="text-accent glow-neon">ALIEN</span></>
          ) : variant === "zi" ? (
            <span className="text-accent glow-neon">{name}</span>
          ) : (
            name
          )}
        </h3>
        
        <p className={`font-mono text-base font-bold mb-4 uppercase tracking-wide ${
          variant === "alien" || variant === "zi" ? "text-accent" : "text-primary"
        }`}>
          {subtitle}
        </p>
        
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-6">
        {variant === "hurriya" ? (
          <ChainButton href={url} />
        ) : (
          <Button 
            variant={variant === "alien" || variant === "zi" ? "neon" : "hero"} 
            size="lg"
            onClick={() => window.open(url, "_blank")}
          >
            Explore
          </Button>
        )}
      </div>

      {/* Corner Accent */}
      <div className={`absolute ${variant === "alien" ? "bottom-0 left-0 border-b-4 border-l-4 border-accent" : "top-0 right-0 border-t-4 border-r-4 border-primary"} w-20 h-20 opacity-30`} />
    </div>
  );
};

const BrandsFriendsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="brands" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 space-y-4 ${headerVisible ? 'animate-glitch-in' : 'scroll-hidden'}`}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [003] The Network
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Brands & Friends That's <span className="text-primary">Nfluential</span>
          </h2>
        </div>

        {/* Brand Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Hurriya */}
          <div className={`${cardsVisible ? 'animate-slide-up' : 'scroll-hidden'}`} style={{ animationDelay: '0ms' }}>
            <BrandCard
              name="HURRIYA"
              subtitle="[UNCENSORED] Freedom for the Incarcerated"
              description="Breaking chains, building futures. Hurriya stands for those who society wants to forget. No limits. No silence. No surrender."
              url="https://www.hurriya.us"
              variant="hurriya"
              logo={hurriyaLogo}
            />
          </div>

          {/* Illegal Alien */}
          <div className={`${cardsVisible ? 'animate-slide-up' : 'scroll-hidden'}`} style={{ animationDelay: '100ms' }}>
            <BrandCard
              name="ILLEGAL ALIEN"
              subtitle="Free Thinking • Global Citizen"
              description="We are from everywhere and nowhere. Borders don't define us. Our minds roam free across galaxies while our feet stay grounded in truth."
              url="#"
              variant="alien"
            />
          </div>

          {/* Asad Carter */}
          <div className={`${cardsVisible ? 'animate-slide-up' : 'scroll-hidden'}`} style={{ animationDelay: '200ms' }}>
            <BrandCard
              name="ASAD CARTER"
              subtitle="The Self Proclaimed Literary King of Comedy"
              description="Author of the hilarious trio; Robert, Chuck, and Fletcher in: 'Maaan, I'm Still Tha Sh*t!' and let's not forget the crew from 'Maaan, Crackheads Can't Quit Tha Fix!', and more!"
              url="https://www.asadcarter.com"
              variant="default"
            />
          </div>

          {/* Zi */}
          <div className={`${cardsVisible ? 'animate-slide-up' : 'scroll-hidden'}`} style={{ animationDelay: '300ms' }}>
            <BrandCard
              name="ᙇ | Zi"
              subtitle="Advanced Alien Intelligence Systems"
              description="Zi is a mysterious life force from the future that utilizes advanced alien intelligence systems from an unknown galaxy to bring the technology of tomorrow, today. You'll find its work throughout the Zi Grid."
              url="https://by.zi.gr"
              variant="zi"
              symbol="ᙇ"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsFriendsSection;
