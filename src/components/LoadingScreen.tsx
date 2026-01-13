import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  minDuration?: number;
}

const LoadingScreen = ({ onLoadComplete, minDuration = 2500 }: LoadingScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Check when page is fully loaded
  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);
    
    // Check if already loaded
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Minimum duration timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  // Fade out when both conditions are met
  useEffect(() => {
    if (isPageLoaded && minTimeElapsed) {
      setFadeOut(true);
      setTimeout(onLoadComplete, 1000);
    }
  }, [isPageLoaded, minTimeElapsed, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Fog layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-muted/50 to-background transition-all duration-[2000ms] ${
            fadeOut ? "opacity-0 translate-y-full" : "opacity-100"
          }`}
        />
        <div
          className={`absolute inset-0 fog-layer-1 transition-all duration-[1500ms] ${
            fadeOut ? "opacity-0 scale-150" : "opacity-70"
          }`}
        />
        <div
          className={`absolute inset-0 fog-layer-2 transition-all duration-[1800ms] ${
            fadeOut ? "opacity-0 scale-125" : "opacity-50"
          }`}
        />
        <div
          className={`absolute inset-0 fog-layer-3 transition-all duration-[2000ms] ${
            fadeOut ? "opacity-0 translate-y-20" : "opacity-60"
          }`}
        />
      </div>

      {/* Logo/Brand */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          fadeOut ? "opacity-0 scale-95" : "opacity-100"
        }`}
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-primary animate-glow-pulse">
          Nfluential
        </h1>
        <p className="font-mono text-sm text-muted-foreground mt-4 tracking-widest uppercase">
          Loading...
        </p>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
};

export default LoadingScreen;
