import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialIcons from "@/components/SocialIcons";
import { CartDrawer } from "@/components/CartDrawer";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      // Small delay to avoid immediate close from the opening click
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 100);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

  const handleJoinMovement = useCallback(() => {
    setIsMenuOpen(false);
    const element = document.getElementById('newsletter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSearchClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  const handleAccountClick = useCallback(() => {
    navigate('/auth');
  }, [navigate]);

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
      <div className="container flex items-center justify-between h-14 sm:h-16 md:h-20 px-4 sm:px-6">
        {/* Logo Text with Pulsating Glow */}
        <Link to="/" className="flex items-center">
          <span className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-primary animate-glow-pulse">
            Nfluential
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
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
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* Search Icon */}
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={handleSearchClick}>
            <Search className="h-4 w-4" />
          </Button>

          {/* Account Icon */}
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={handleAccountClick}>
            <User className="h-4 w-4" />
          </Button>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu with 40% transparent black overlay - closes on outside click */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-black/40 backdrop-blur-sm z-40">
          <nav 
            ref={menuRef}
            className="flex flex-col items-center justify-center gap-5 sm:gap-6 bg-background/95 mx-4 mt-20 sm:mt-24 mb-8 rounded-lg py-6 sm:py-8 max-h-[calc(100vh-8rem)] overflow-y-auto"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="font-display text-xl sm:text-2xl uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            {/* Shopify related items */}
            <a
              href="/#shop"
              onClick={(e) => handleSmoothScroll(e, "/#shop")}
              className="font-display text-lg sm:text-xl uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Browse Products
            </a>
            <button
              onClick={handleAccountClick}
              className="font-display text-lg sm:text-xl uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              My Account
            </button>
            
            <SocialIcons iconSize="w-5 h-5 sm:w-6 sm:h-6" className="mt-3 sm:mt-4" />
            <Button variant="hero" size="lg" className="mt-4 sm:mt-6 text-sm sm:text-base" onClick={handleJoinMovement}>
              Join the Movement
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
