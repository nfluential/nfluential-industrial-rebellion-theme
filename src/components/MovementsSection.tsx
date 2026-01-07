import { useState } from "react";
import { Button } from "@/components/ui/button";
import hurriyaLogo from "@/assets/hurriya-logo.png";

const ChainButton = () => {
  const [isBreaking, setIsBreaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const handleClick = () => {
    if (isBroken) return;
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

const MovementsSection = () => {
  return (
    <section id="movements" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [003] Partnerships
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            The <span className="text-primary">Movements</span>
          </h2>
        </div>

        {/* Movement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hurriya */}
          <div className="relative group overflow-hidden bg-card border border-border p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
            {/* Tape/Redacted Effect Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-0 right-0 h-8 bg-foreground transform -rotate-3" />
              <div className="absolute top-1/2 left-0 right-0 h-12 bg-foreground transform rotate-2" />
              <div className="absolute bottom-1/3 left-0 right-0 h-6 bg-foreground transform -rotate-1" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase border border-border px-3 py-1">
                  Sub-Brand
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Hurriya Logo */}
              <div className="mb-6">
                <img 
                  src={hurriyaLogo} 
                  alt="Hurriya" 
                  className="h-20 md:h-24 w-auto"
                />
              </div>

              <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                HURRIYA
              </h3>
              
              <p className="font-mono text-lg text-primary font-bold mb-4 uppercase tracking-wide">
                [UNCENSORED] Freedom for the Incarcerated
              </p>
              
              <p className="font-mono text-sm text-muted-foreground max-w-md leading-relaxed">
                Breaking chains, building futures. Hurriya stands for those who society wants to forget. 
                No limits. No silence. No surrender.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <ChainButton />
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary opacity-30" />
          </div>

          {/* Illegal Alien */}
          <div className="relative group overflow-hidden bg-card border border-border p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
            {/* Futuristic Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase border border-border px-3 py-1">
                  Sub-Brand
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                ILLEGAL <span className="text-accent glow-neon">ALIEN</span>
              </h3>
              
              <p className="font-mono text-lg text-accent font-bold mb-4 uppercase tracking-wide">
                Free Thinking • Global Citizen
              </p>
              
              <p className="font-mono text-sm text-muted-foreground max-w-md leading-relaxed">
                We are from everywhere and nowhere. Borders don't define us. 
                Our minds roam free across galaxies while our feet stay grounded in truth.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <Button variant="neon" size="lg">
                Explore
              </Button>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-accent opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovementsSection;
