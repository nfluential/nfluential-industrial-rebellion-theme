import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import bgImage from "@/assets/newsletter-bg.jpg";

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { trigger } = useHapticFeedback();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trigger('medium');
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase() });

      if (error && error.code === "23505") {
        toast.info("You're already subscribed!");
      } else if (error) {
        throw error;
      }
      setIsSubmitted(true);
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email, trigger]);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10">
        <div 
          ref={sectionRef}
          className={`max-w-3xl mx-auto text-center ${isVisible ? 'animate-blur-in' : 'scroll-hidden'}`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            This is Not Just a Brand.
          </h2>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
            This is a Movement.
          </h3>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Born in the shadows of doubt, forged in the fire of ambition. Nfluential isn't about following trends—it's about setting them. We are the dreamers who became the doers. The outcasts who became the icons. The fearless few who refused to be ordinary.
          </p>

          {/* Newsletter Signup Section */}
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 md:p-8 max-w-xl mx-auto">
            <h4 className="font-display text-xl md:text-2xl font-bold uppercase mb-2">
              Stay <span className="text-primary">Nfluential</span>
            </h4>
            <p className="text-muted-foreground text-sm md:text-base mb-4">
              Get exclusive promo codes and be the first to get updates and Nfluential news.
            </p>
            <p className="text-foreground font-medium mb-4">
              Join the movement. Be the first to know about everything that matters.
            </p>
            <ul className="text-muted-foreground text-sm space-y-1 mb-6 text-left max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Upcoming releases & drops
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> New product announcements
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Exclusive promo codes
              </li>
            </ul>

            {isSubmitted ? (
              <div className="bg-primary/10 border border-primary/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-primary font-display text-lg font-bold">
                  You're in. Welcome to the movement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background/80 backdrop-blur-sm border-border"
                />
                <Button type="submit" variant="default" size="lg" className="h-12">
                  Join Us
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. Real ones only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

export default NewsletterSection;
