import heroImage from "@/assets/about-hero.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-background">
      {/* Hero Image Area */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="The climb"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            THE <span className="text-primary glow-eagles">NFLUENTIAL</span> CODE.
          </h2>
        </div>

        {/* Noise Overlay */}
        <div className="noise-overlay" />
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          
          {/* Intro */}
          <div className="mb-16 md:mb-24 text-center">
            <p className="font-mono text-lg md:text-xl text-muted-foreground leading-relaxed">
              Everybody asks the same question: <span className="text-foreground font-bold">"What is Nfluential?"</span>
            </p>
            <p className="font-mono text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
              The answer ain't something we can just tell you. If you have to ask, you might not be ready to hear it. 
              Nfluential isn't just a brand name or an entity. It's a <span className="text-primary font-bold">frequency</span>. 
              And real ones know the vibe when they feel it.
            </p>
            <p className="font-mono text-lg md:text-xl text-foreground font-bold mt-6">
              We don't define Nfluential. You do, by how you move when things get tough.
            </p>
          </div>

          {/* The Hunger & The Hubris */}
          <div className="mb-16 md:mb-24 border-l-4 border-primary pl-8 md:pl-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              THE HUNGER & THE HUBRIS
            </h3>
            <div className="space-y-6">
              <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
                Nfluential is the fuel for anyone aspiring to be more. It's that drive that refuses to lay down. 
                It is absolute confidence—the kind of unshakeable belief that the sidelines mistake for arrogance 
                because they don't understand the vision.
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
                It's never apologizing for being authentically you, because being you is what causes the shift in the room. 
                It's leadership when nobody else wants to step up.
              </p>
            </div>
          </div>

          {/* The Underdog Mentality */}
          <div className="mb-16 md:mb-24 border-l-4 border-accent pl-8 md:pl-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              THE UNDERDOG MENTALITY
            </h3>
            <div className="space-y-6">
              <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
                Nfluential is that feeling in your gut. The one you get when the odds are stacked a mile high against you, 
                but you still know you're walking out with the W.
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
                It's the self-motivation to keep swinging when the world counts you out like Rocky. 
                <span className="text-foreground italic"> (And we're talking prime, hungry Rocky—not the one who got his ass whooped later on)</span>. 
                It's digging deep when your body is screaming that you have zero gas left in the tank, 
                and finding that extra mile anyway.
              </p>
            </div>
          </div>

          {/* The Obligation */}
          <div className="mb-16 md:mb-24 border-l-4 border-foreground pl-8 md:pl-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              THE OBLIGATION
            </h3>
            <div className="space-y-6">
              <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
                Most importantly, Nfluential is what you embody to pass on to the next person in the struggle. 
                We don't gatekeep success here. <span className="text-primary font-bold">You climb, and you reach back.</span> 
                Never leave a striving person behind.
              </p>
              <p className="font-mono text-base md:text-lg text-foreground leading-relaxed">
                That's what it is. Now the real question is…
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-12 md:py-16 border-t border-b border-border">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary glow-eagles">
              ARE YOU NFLUENTIAL?
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
