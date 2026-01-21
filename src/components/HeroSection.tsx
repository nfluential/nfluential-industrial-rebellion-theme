import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-cityscape.jpg";

const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-6 max-w-4xl animate-fade-in-up">
          {/* Eyebrow */}
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-muted-foreground uppercase">
            Urban Streetwear × Literature
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
            For The <GlitchText className="text-primary glow-eagles">Fearless</GlitchText>.
            <br />
            The <GlitchText className="text-primary glow-eagles">Nfluential</GlitchText>.
          </h1>

          {/* Subheadline */}
          <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We build empires from nothing. We ignore the doubters. 
            We look failure in the eyes and keep moving.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg">
              Shop the Collection
            </Button>
            <Button variant="outline" size="lg">
              Explore the Library
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#shop" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
