import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-submit?action=newsletter", {
        body: { email: email.trim().toLowerCase() },
      });

      if (error) throw error;

      if (data?.error === "already_subscribed") {
        toast.info("You're already subscribed!", {
          description: "You're already part of the movement."
        });
      } else {
        toast.success("You're in!", {
          description: "Welcome to the movement."
        });
      }
      setEmail("");
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border p-6 sm:p-8 max-w-md w-full shadow-brutal animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase mb-2">
            Join the <span className="text-primary">Movement</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground">
            Get exclusive promo codes, early access to drops, and Nfluential news.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-background border-border text-center"
            required
          />
          <Button 
            type="submit" 
            className="w-full h-12 font-display uppercase tracking-widest"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Stay Nfluential
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
