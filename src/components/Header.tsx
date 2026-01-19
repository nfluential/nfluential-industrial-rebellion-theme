import { useState, useEffect, useCallback } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialIcons from "@/components/SocialIcons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.5), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  const navItems = [
    { label: "Shop", href: "/#shop" },
    { label: "Library", href: "/#library" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  // Calculate header opacity: starts at 90%, goes down to 40%
  const headerOpacity = 0.9 - (scrollProgress * 0.5);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border transition-all duration-300"
      style={{ backgroundColor: `hsl(var(--background) / ${headerOpacity})` }}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo Text with Pulsating Glow */}
        <a href="/" className="flex items-center">
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-primary animate-glow-pulse">
            Nfluential
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="font-display text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <SocialIcons iconSize="w-4 h-4" variant="header" />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs flex items-center justify-center font-mono">
              0
            </span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with 50% transparent black overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40">
          <nav className="flex flex-col items-center justify-center h-full gap-6 bg-background/95 mx-4 my-8 rounded-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="font-display text-2xl uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <SocialIcons iconSize="w-6 h-6" className="mt-4" />
            <Button variant="hero" size="lg" className="mt-6">
              Join the Movement
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
