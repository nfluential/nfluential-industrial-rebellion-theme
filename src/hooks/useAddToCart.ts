import { useState, useCallback } from "react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function useAddToCart() {
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = useCallback(
    async (product: ShopifyProduct) => {
      const variant = product.node.variants.edges[0]?.node;
      if (!variant) return;

      setAddingProductId(product.node.id);
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
      setAddingProductId(null);
      toast.success("Added to cart", { description: product.node.title });
    },
    [addItem]
  );

  return {
    handleAddToCart,
    addingProductId,
    cartLoading,
  };
}
