import { useState, useCallback, useRef, useEffect } from "react";
import SocialIcons from "@/components/SocialIcons";

// Custom rocket SVG for a unique premium look
const RocketIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    {/* Flame trail */}
    <path d="M6.5 17.5l-2 2" className="animate-pulse" />
  </svg>
);

const Footer = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ bottom: 60, right: 24 });
  const footerRef = useRef<HTMLElement>(null);

  // Show rocket only when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowRocket(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    if (isLaunching) return;
    
    // Haptic feedback
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 100]);
    setIsLaunching(true);
    
    // Smooth scroll to top
    const duration = 1000;
    const start = window.scrollY;
    const startTime = performance.now();
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, start * (1 - easeOut));
      
      // Move rocket up but keep above ᙇ link (min bottom 60px)
      const rocketProgress = Math.min(progress * 1.5, 1);
      setRocketPosition({
        bottom: Math.max(60, 60 + (window.innerHeight * 0.5 * rocketProgress)),
        right: 24,
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
    
    // Reset after animation
    setTimeout(() => {
      setIsLaunching(false);
      setRocketPosition({ bottom: 60, right: 24 });
    }, 1200);
  }, [isLaunching]);

  return (
    <footer ref={footerRef} className="bg-card border-t border-border py-8 md:py-12 mb-16 md:mb-0 relative overflow-hidden">
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

      {/* Premium Rocket Scroll-to-Top */}
      {showRocket && (
        <button
          onClick={scrollToTop}
          disabled={isLaunching}
          className={`fixed z-50 transition-all duration-300 group ${isLaunching ? 'pointer-events-none' : ''}`}
          style={{
            bottom: `${rocketPosition.bottom}px`,
            right: `${rocketPosition.right}px`,
          }}
          aria-label="Rocket to top"
        >
          <div className={`relative ${isLaunching ? 'animate-rocket-fly' : 'hover:scale-125 hover:-translate-y-1'} transition-all duration-300`}>
            {/* Rocket Icon */}
            <RocketIcon 
              className={`w-8 h-8 sm:w-10 sm:h-10 text-primary transform -rotate-45 transition-all duration-300 
                ${isLaunching ? 'text-accent' : 'group-hover:text-accent'}
                drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]`} 
            />
            
            {/* Exhaust flames */}
            <div className={`absolute -bottom-3 -left-1 flex gap-0.5 transform rotate-45 transition-opacity duration-300
              ${isLaunching ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="w-1 h-4 bg-gradient-to-b from-accent via-primary to-transparent rounded-full animate-pulse" />
              <div className="w-1.5 h-6 bg-gradient-to-b from-accent via-primary to-transparent rounded-full animate-pulse delay-75" />
              <div className="w-1 h-4 bg-gradient-to-b from-accent via-primary to-transparent rounded-full animate-pulse delay-150" />
            </div>
            
            {/* Particle trail during launch */}
            {isLaunching && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform rotate-45">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
                    style={{
                      left: `${(i - 2) * 4}px`,
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </button>
      )}

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
