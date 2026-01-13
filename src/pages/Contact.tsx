import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showHumanError, setShowHumanError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const getSuccessMessage = (answer: string): string => {
    switch (answer) {
      case "069":
      case "69":
        return "oh you freaky perv, your message was sent 😏";
      case "420":
        return "puff puff pass let's roll up another. Sent 🌿";
      case "666":
        return "hail Satan your message is sent 😈";
      case "710":
        return "Daves not here man! I'll give him your message 🚪";
      case "911":
        return "yo!! Chill!! Don't be a Karen, we were only joking! I'll read your message I swear! 🚨";
      case "777":
        return "congratulations you just won a sent message! 🎰";
      case "411":
        return "the secret to life is... to live... ✨";
      case "123":
        return "as easy as abc, your message is sent 🎵";
      default:
        return "Message sent successfully! We'll get back to you soon. 📬";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if captcha is 11 (the correct answer - human detected!)
    if (captcha === "011" || captcha === "11") {
      setShowHumanError(true);
      return;
    }

    // Any other answer = success (not human confirmed)
    const msg = getSuccessMessage(captcha);
    setSuccessMessage(msg);
    setShowSuccess(true);

    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCaptcha("");
  };

  const handleTryAgain = () => {
    setShowHumanError(false);
    setCaptcha("");
  };

  const handleCancel = () => {
    setShowHumanError(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
              We don't bite... much.
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-6 border-2 border-primary bg-primary/10 text-center animate-in fade-in slide-in-from-top-4">
              <p className="font-display text-xl text-primary">{successMessage}</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => setShowSuccess(false)}
              >
                Send Another
              </Button>
            </div>
          )}

          {/* Form */}
          {!showSuccess && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Subject */}
              <div className="space-y-2">
                <label className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  What's This About?
                </label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Pick your poison..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collabs">Collabs / Partnering</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="publishing">Publishing</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  What Do They Call You?
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your street name works too..."
                  className="bg-card border-border"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  Where Should We Slide Into?
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-card border-border"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  Spill It...
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind. No judgment. Maybe a little judgment."
                  className="bg-card border-border min-h-[150px]"
                  required
                />
              </div>

              {/* Captcha */}
              <div className="space-y-4 p-6 border-2 border-dashed border-muted-foreground/30 bg-card/50">
                <div className="text-center">
                  <h3 className="font-display text-lg uppercase tracking-widest text-primary mb-2">
                    Prove You're Not Human
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground uppercase">
                    Enter The Wrong Answer
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <span className="font-display text-2xl font-bold">
                    1 × 12 - 1 =
                  </span>
                  <Input
                    type="text"
                    value={captcha}
                    onChange={(e) => {
                      // Only allow numbers, max 3 digits
                      const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                      setCaptcha(val);
                    }}
                    placeholder="???"
                    className="w-24 text-center text-xl font-mono bg-card border-border"
                    maxLength={3}
                    required
                  />
                </div>
                <p className="text-center font-mono text-xs text-muted-foreground">
                  (3 numbers only)
                </p>
              </div>

              {/* Submit */}
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send It
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />

      {/* Human Detected Error Dialog */}
      <Dialog open={showHumanError} onOpenChange={setShowHumanError}>
        <DialogContent className="bg-destructive/10 border-destructive">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-destructive uppercase tracking-widest text-center">
              ⚠️ WARNING ⚠️
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              <span className="font-display text-xl text-foreground block mb-2">
                HUMAN DETECTED!
              </span>
              <span className="font-mono text-destructive text-lg">
                Access Denied!
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-4 sm:justify-center">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleTryAgain}>
              Try Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
