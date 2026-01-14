import { useEffect, useState, useRef } from "react";
import compassLogo from "@/assets/nfluential-compass.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  minDuration?: number;
}

const LoadingScreen = ({ onLoadComplete, minDuration = 3500 }: LoadingScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const fullText = "receiving...";
  const textIndex = useRef(0);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (textIndex.current < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, textIndex.current + 1));
        textIndex.current += 1;
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayedText]);

  // Check if all images are loaded
  useEffect(() => {
    const checkImages = () => {
      const images = Array.from(document.images);
      const loadedCount = images.filter(img => img.complete).length;
      if (loadedCount >= images.length - 1) { // -1 to exclude our compass logo
        setImagesLoaded(true);
      }
    };

    const interval = setInterval(checkImages, 100);
    return () => clearInterval(interval);
  }, []);

  // Complete loading when min duration passed AND images loaded
  useEffect(() => {
    const minTimer = setTimeout(() => {
      if (imagesLoaded) {
        setFadeOut(true);
        setTimeout(onLoadComplete, 1000);
      }
    }, minDuration);

    return () => clearTimeout(minTimer);
  }, [imagesLoaded, minDuration, onLoadComplete]);

  // Fallback: if images take too long, still complete after extended time
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadComplete, 1000);
    }, minDuration + 3000);

    return () => clearTimeout(maxTimer);
  }, [minDuration, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines" />

      {/* Glitching compass logo */}
      <div
        className={`relative mb-8 transition-all duration-1000 ${
          fadeOut ? "opacity-0 scale-90" : "opacity-100"
        }`}
      >
        <img
          src={compassLogo}
          alt="Nfluential"
          className="w-48 h-48 md:w-64 md:h-64 object-contain glitch-image"
        />
        {/* Glitch layers */}
        <img
          src={compassLogo}
          alt=""
          className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 object-contain glitch-layer-r"
          aria-hidden="true"
        />
        <img
          src={compassLogo}
          alt=""
          className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 object-contain glitch-layer-b"
          aria-hidden="true"
        />
      </div>

      {/* Terminal-style typing text */}
      <div
        className={`font-mono text-xl md:text-2xl tracking-wider transition-all duration-1000 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        style={{ color: "#00ff41" }}
      >
        <span className="terminal-text">{displayedText}</span>
        <span
          className={`ml-0.5 inline-block w-3 h-6 align-middle transition-opacity duration-100 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "#00ff41" }}
        />
      </div>

      {/* Static noise overlay */}
      <div className="absolute inset-0 pointer-events-none static-noise" />
    </div>
  );
};

export default LoadingScreen;
