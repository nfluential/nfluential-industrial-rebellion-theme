import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const ManifestoSection = () => {
  const manifestoText = "WE IGNORED THE DOUBTERS • WE LOOKED FAILURE IN THE EYES • WE ARE THE NFLUENTIAL • WE BUILD EMPIRES FROM NOTHING • ";
  
  return (
    <section id="manifesto" className="py-12 md:py-20 bg-primary overflow-hidden">
      {/* Scrolling Marquee */}
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Duplicate content for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-wider px-4"
            >
              {manifestoText}
            </span>
          ))}
        </div>
      </div>

      {/* Static Manifesto Content */}
      <div className="container mt-16 md:mt-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <ScrollAnimationWrapper animation="scale-up">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
              This is Not Just a Brand.<br />
              This is a <span className="underline decoration-4 underline-offset-8">Movement</span>.
            </h2>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="blur-in" delay={200}>
            <p className="font-mono text-sm md:text-base text-primary-foreground/80 leading-relaxed">
              Born in the shadows of doubt, forged in the fire of ambition. 
              Nfluential isn't about following trends—it's about setting them. 
              We are the dreamers who became the doers. The outcasts who became the icons. 
              The fearless few who refused to be ordinary.
            </p>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fade-up" delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="#shop"
                className="font-display text-lg uppercase tracking-widest text-primary-foreground border-b-2 border-primary-foreground pb-1 hover:opacity-80 transition-opacity"
              >
                Shop Now
              </a>
              <span className="hidden sm:block text-primary-foreground/40">|</span>
              <a 
                href="#"
                className="font-display text-lg uppercase tracking-widest text-primary-foreground border-b-2 border-primary-foreground pb-1 hover:opacity-80 transition-opacity"
              >
                Join the Newsletter
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
