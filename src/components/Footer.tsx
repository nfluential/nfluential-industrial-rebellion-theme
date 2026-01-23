import { useState, useCallback } from "react";
import { Rocket } from "lucide-react";
import SocialIcons from "@/components/SocialIcons";

const Footer = () => {
  const [isLaunching, setIsLaunching] = useState(false);

  const scrollToTop = useCallback(() => {
    // Vibrate pattern: rumble
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 50, 30, 100]);
    setIsLaunching(true);
    
    // Add shake effect to the whole page
    document.body.classList.add('rocket-shake');
    
    // Animate scroll to top manually for better mobile support
    const duration = 800;
    const start = window.scrollY;
    const startTime = performance.now();
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, start * (1 - easeOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
    
    // Remove shake after animation
    setTimeout(() => {
      document.body.classList.remove('rocket-shake');
    }, 600);
    
    // Reset animation after scroll completes
    setTimeout(() => {
      setIsLaunching(false);
    }, 1500);
  }, []);

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 mb-16 md:mb-0 relative">
      <div className="container">
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

      {/* Teleport Up Button - Rocket with liftoff animation */}
      <button
        onClick={scrollToTop}
        className={`absolute right-6 -top-5 w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground rounded-none flex items-center justify-center transition-all duration-300 shadow-brutal group overflow-hidden ${isLaunching ? 'rocket-launching' : 'hover:scale-110'}`}
        aria-label="Teleport to top"
      >
        <Rocket className={`w-4 h-4 transform -rotate-45 transition-transform duration-300 ${isLaunching ? 'animate-rocket-liftoff' : 'group-hover:animate-bounce'}`} />
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
