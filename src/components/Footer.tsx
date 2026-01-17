import { Rocket } from "lucide-react";
import logo from "@/assets/nfluential-logo.png";

const Footer = () => {
  const scrollToTop = () => {
    if ('vibrate' in navigator) navigator.vibrate([10]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 mb-16 md:mb-0 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Brand */}
          <div className="md:flex-shrink-0">
            <img src={logo} alt="Nfluential" className="h-12 w-auto mb-3 opacity-80" />
            <p className="font-mono text-[10px] text-muted-foreground leading-relaxed max-w-[180px]">
              Urban streetwear and literature for the fearless.
            </p>
          </div>

          {/* Links Container */}
          <div className="flex-1 flex flex-wrap gap-x-6 gap-y-4 md:gap-x-8 md:justify-end">
            {/* Shop */}
            <div className="min-w-fit">
              <h4 className="font-display text-xs uppercase tracking-wider mb-2 text-foreground">
                Shop
              </h4>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {["Hoodies", "Crop Tops", "Sweats", "Accessories"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Library */}
            <div className="min-w-fit">
              <h4 className="font-display text-xs uppercase tracking-wider mb-2 text-foreground">
                Library
              </h4>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {["All Books", "Asad Carter", "Urban Comedy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="min-w-fit">
              <h4 className="font-display text-xs uppercase tracking-wider mb-2 text-foreground">
                Connect
              </h4>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {["Instagram", "Twitter", "TikTok", "YouTube"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-border mt-6 pt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-muted-foreground">
            © 2026 Nfluential
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
              Shipping
            </a>
          </div>
        </div>
      </div>

      {/* Teleport Up Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-5 w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground rounded-none flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-brutal group"
        aria-label="Teleport to top"
      >
        <Rocket className="w-4 h-4 group-hover:animate-bounce transform -rotate-45" />
      </button>

      {/* Zi Link - Bottom Right */}
      <a
        href="https://zi.gr"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-6 bottom-4 text-base font-bold animate-pulse-glow hover:scale-110 transition-transform"
        style={{ color: "hsl(175, 100%, 40%)" }}
        aria-label="Visit Zi"
      >
        ᙇ
      </a>
    </footer>
  );
};

export default Footer;
