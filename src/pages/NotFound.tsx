import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          [Error 404]
        </span>
        <h1 className="font-display text-7xl md:text-9xl font-bold text-primary glow-crimson">
          LOST
        </h1>
        <p className="font-mono text-lg text-muted-foreground max-w-md mx-auto">
          This path leads nowhere. The fearless find their way back.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href="/">Return to Base</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
