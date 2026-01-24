import { useState, useCallback, useRef, useEffect } from "react";
import { Rocket } from "lucide-react";
import SocialIcons from "@/components/SocialIcons";

const Footer = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const rocketRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = useCallback(() => {
    if (isLaunching) return;
    
    // Vibrate pattern: rumble
    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100, 50, 200]);
    setIsLaunching(true);
    
    // Phase 1: Shake the entire screen first (before liftoff)
    document.documentElement.classList.add('rocket-shake');
    
    // Phase 2: After shake, start the scroll
    setTimeout(() => {
      document.documentElement.classList.remove('rocket-shake');
      
      // Animate scroll to top with the rocket "dragging" the page
      const duration = 1000;
      const start = window.scrollY;
      const startTime = performance.now();
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for "rocket pull" effect - fast start, smooth end
        const easeOutExpo = 1 - Math.pow(1 - progress, 4);
        
        window.scrollTo(0, start * (1 - easeOutExpo));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }, 500); // Shake for 500ms first
    
    // Reset animation after everything completes
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000);
  }, [isLaunching]);

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 mb-16 md:mb-0 relative">
      <div className="container px-4 sm:px-6">
        {/* Centered Copyright Section */}
        <div className="flex flex-col items-center text-center space-y-3">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Nfluential, LLC
          </p>
          <a 
            href="#" 
            className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
          >
            Terms and Policies
          </a>
          <SocialIcons iconSize="w-4 h-4" className="pt-2" />
        </div>
      </div>

      {/* Teleport Up Button - Rocket with liftoff animation - ALWAYS ON TOP */}
      <button
        ref={rocketRef}
        onClick={scrollToTop}
        disabled={isLaunching}
        className={`fixed right-4 sm:right-6 bottom-20 sm:bottom-24 md:bottom-8 w-12 h-12 sm:w-10 sm:h-10 bg-primary hover:bg-primary/80 text-primary-foreground rounded-none flex items-center justify-center transition-all duration-300 shadow-brutal group overflow-visible z-[9999] ${isLaunching ? 'rocket-launching' : 'hover:scale-110'}`}
        aria-label="Teleport to top"
        style={{ pointerEvents: isLaunching ? 'none' : 'auto' }}
      >
        <Rocket className={`w-5 h-5 sm:w-4 sm:h-4 transform -rotate-45 transition-transform duration-300 ${isLaunching ? 'animate-rocket-liftoff' : 'group-hover:animate-bounce'}`} />
        
        {/* Exhaust flame trail when launching */}
        {isLaunching && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-primary via-accent to-transparent rounded-full animate-pulse" />
        )}
      </button>

      {/* Zi Link - Bottom Right Corner */}
      <a
        href="https://zi.gr"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-3 text-[10px] font-bold animate-pulse-glow hover:scale-110 transition-transform"
        style={{ color: "hsl(175, 100%, 40%)" }}
        aria-label="Visit Zi"
      >
        ᙇ
      </a>
    </footer>
  );
};

export default Footer;
