import { useState } from "react";
import { X, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SharePopup = ({ isOpen, onClose }: SharePopupProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://nfluential.us";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied!", {
        description: "Share the movement with others."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Nfluential - For The Fearless",
          text: "Check out Nfluential - Urban streetwear for the fearless.",
          url: shareUrl
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
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
            Share the <span className="text-primary">Momentum</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground">
            Invite others to join the movement. Spread the influence.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={shareUrl}
              readOnly
              className="h-12 bg-background border-border text-center font-mono text-sm"
            />
            <Button 
              onClick={handleCopy}
              variant="outline"
              className="h-12 px-4"
            >
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <Button 
            onClick={handleShare}
            className="w-full h-12 font-display uppercase tracking-widest"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
