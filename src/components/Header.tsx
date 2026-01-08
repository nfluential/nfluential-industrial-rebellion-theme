import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Shop", href: "/#shop" },
    { label: "Library", href: "/#library" },
    { label: "About", href: "/#about" },
    { label: "Brands & Friends", href: "/#brands" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo Text with Pulsating Glow */}
        <a href="/" className="flex items-center">
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-primary animate-glow-pulse">
            Nfluential™
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-display text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-3xl uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="hero" size="lg" className="mt-8">
              Join the Movement
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
