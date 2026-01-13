import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, Tag, Bell } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  const benefits = [
    { icon: Bell, text: "Upcoming releases & drops" },
    { icon: Sparkles, text: "New product announcements" },
    { icon: Tag, text: "Exclusive discounts & promos" },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollAnimationWrapper animation="scale-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-up" delay={100}>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              Stay Nfluential
            </h2>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="blur-in" delay={200}>
            <p className="text-muted-foreground text-lg mb-8">
              Join the movement. Be the first to know about everything that matters.
            </p>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fade-up" delay={300}>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-background/50 border border-border rounded-full px-4 py-2"
                >
                  <benefit.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="slide-up" delay={400}>
            {isSubmitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <p className="text-primary font-display text-xl font-bold">
                  You're in. Welcome to the movement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background border-border"
                />
                <Button type="submit" variant="default" size="lg" className="h-12">
                  Subscribe
                </Button>
              </form>
            )}
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fade-up" delay={500}>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. Real ones only.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
