import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-4">
      <div className="container">
        <Button variant="default" size="lg" className="w-full gap-2">
          <ShoppingBag className="h-5 w-5" />
          Add to Cart — $89.00
        </Button>
      </div>
    </div>
  );
};

export default StickyFooter;
