import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Send, AlertTriangle, XCircle, RotateCcw } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import bgImage from "@/assets/quick-connect-bg.jpg";

const subjects = [
  { value: "collabs", label: "Collabs/Partnering" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "advertising", label: "Advertising" },
  { value: "publishing", label: "Publishing" },
  { value: "marketing", label: "Marketing" },
  { value: "general", label: "General" },
];

const getSuccessMessage = (answer: string): string => {
  const messages: Record<string, string> = {
    "69": "Oh, so you like it kinky, aye? Your message was sent! 😏",
    "420": "Puff puff pass, let's roll up another. Message sent! 🍃",
    "666": "Hail Satan! Your message is sent! 😈",
    "710": "Dave's not here, man! I'll give him your message! 🛢️",
    "911": "Yo!! Chill!! Don't be a Karen, we were only joking! I'll read your message, I swear! Message sent. 🚨",
    "777": "Congratulations, you just won a sent message! 🎰",
    "411": "The secret to life is... to live. Thank you for reaching out! 📞",
    "123": "As easy as ABC, your message is sent! 🔢",
  };
  return messages[answer] || "Message sent successfully! We'll get back to you soon. 📬";
};

const QuickConnectSection = memo(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { trigger } = useHapticFeedback();

  const isFormValid = name && email && subject && message && /^\d{1,3}$/.test(captcha);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    trigger('medium');
    
    if (captcha === "11") {
      setShowError(true);
      return;
    }

    setSuccessMessage(getSuccessMessage(captcha));
    setShowSuccess(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCaptcha("");
  }, [captcha, trigger]);

  const handleTryAgain = useCallback(() => {
    trigger('light');
    setShowError(false);
    setCaptcha("");
  }, [trigger]);

  const handleCancel = useCallback(() => {
    trigger('light');
    setShowError(false);
  }, [trigger]);

  return (
    <section 
      id="contact" 
      className="py-20 md:py-32 relative overflow-hidden"
    >
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
          className={`${isVisible ? 'animate-scale-in' : 'scroll-hidden'}`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Quick <span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Got something to say? We're all ears. Drop us a line and let's make moves.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Form */}
            <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 md:p-8">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-xl font-display font-bold text-primary mb-4">
                    {successMessage}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      trigger('light');
                      setShowSuccess(false);
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        What do they call you?
                      </label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="bg-background border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Subject
                    </label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="What's this about?" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        {subjects.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Spill it...
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      className="bg-background border-border min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  {/* Captcha */}
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <label className="block font-mono text-xs uppercase tracking-wider text-primary mb-3">
                      🤖 Prove You're Not Human — Enter The Wrong Answer
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-lg font-bold text-foreground">
                        1 × 12 - 1 =
                      </span>
                      <Input
                        type="text"
                        value={captcha}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                          setCaptcha(val);
                        }}
                        placeholder="???"
                        className="w-24 bg-background border-border text-center font-mono text-lg"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={!isFormValid}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="bg-card border-destructive max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-display uppercase text-destructive">
              Warning: Human Detected!
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-base">
              Access Denied! Nice try, human. We said enter the <strong>wrong</strong> answer!
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleCancel}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="flex-1" 
              onClick={handleTryAgain}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
});

QuickConnectSection.displayName = 'QuickConnectSection';

export default QuickConnectSection;
