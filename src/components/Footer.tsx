import logo from "@/assets/nfluential-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16 mb-16 md:mb-0">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Nfluential" className="h-16 w-auto mb-4 opacity-80" />
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Urban streetwear and literature for the fearless. Building empires from nothing.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-foreground">
              Shop
            </h4>
            <ul className="space-y-2">
              {["Hoodies", "Crop Tops", "Sweats", "Accessories", "New Arrivals"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Library */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-foreground">
              Library
            </h4>
            <ul className="space-y-2">
              {["All Books", "Asad Carter", "Urban Comedy", "Pre-Orders"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-foreground">
              Connect
            </h4>
            <ul className="space-y-2">
              {["Instagram", "Twitter", "TikTok", "YouTube", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2024 Nfluential. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
