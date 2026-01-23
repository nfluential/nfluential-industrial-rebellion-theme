import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialIcons from "@/components/SocialIcons";
import { CartDrawer } from "@/components/CartDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  const handleCloseMenu = useCallback(() => {
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
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search Icon */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>

          {/* Account Icon */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-4 w-4" />
          </Button>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Mobile Menu Toggle */}
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with 40% transparent black overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-black/40 backdrop-blur-sm z-40">
          {/* Close Button at top */}
          <button
            onClick={handleCloseMenu}
            className="absolute top-5 right-4 p-2 text-foreground hover:text-primary transition-colors z-50"
            aria-label="Close menu"
          >
            <X className="h-8 w-8" />
          </button>
          
          <nav 
            ref={menuRef}
            className="flex flex-col items-center justify-center gap-6 bg-background/95 mx-4 mt-24 mb-8 rounded-lg py-8"
          >
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
            <Button variant="hero" size="lg" className="mt-6" onClick={handleCloseMenu}>
              Join the Movement
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
