import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 group hover:bg-transparent"
        >
          <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground animate-scale-in">
              {totalItems > 9 ? '9+' : totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background/95 backdrop-blur-xl border-l border-border">
        <SheetHeader className="flex-shrink-0 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <SheetTitle className="font-display text-xl uppercase tracking-wider">Your Cart</SheetTitle>
          </div>
          <SheetDescription className="font-mono text-xs">
            {totalItems === 0 ? "Start shopping to add items" : `${totalItems} item${totalItems !== 1 ? 's' : ''} ready for checkout`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                  <ShoppingBag className="h-10 w-10 text-muted-foreground relative z-10" />
                </div>
                <div>
                  <p className="font-display text-lg uppercase">Empty Cart</p>
                  <p className="text-sm text-muted-foreground mt-1">Your cart is waiting to be filled</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0 space-y-3">
                {items.map((item, index) => (
                  <div 
                    key={item.variantId} 
                    className="flex gap-3 p-3 bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-20 h-20 bg-muted overflow-hidden flex-shrink-0 relative">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img 
                          src={item.product.node.images.edges[0].node.url} 
                          alt={item.product.node.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-sm uppercase truncate group-hover:text-primary transition-colors">
                          {item.product.node.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                          {item.selectedOptions.map(option => option.value).join(' / ')}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-mono text-sm text-primary font-medium">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 hover:bg-primary/10 hover:text-primary" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-mono font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 hover:bg-primary/10 hover:text-primary" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 ml-1 hover:bg-destructive/10 hover:text-destructive" 
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Premium Checkout Section */}
              <div className="flex-shrink-0 space-y-4 pt-4 mt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Subtotal</span>
                    <p className="font-display text-2xl uppercase tracking-tight">
                      {items[0]?.price.currencyCode || '$'} {totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full group relative overflow-hidden" 
                  size="lg" 
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-20 transition-opacity" />
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span className="font-display uppercase tracking-wider">Checkout</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <p className="text-center text-[10px] text-muted-foreground font-mono">
                  Secure checkout powered by Shopify
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
