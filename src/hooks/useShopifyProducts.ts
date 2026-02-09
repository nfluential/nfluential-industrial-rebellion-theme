import { useState, useEffect } from 'react';
import { storefrontApiRequest, PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(limit: number = 10, collectionHandle?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        if (collectionHandle) {
          const data = await storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, { handle: collectionHandle, first: limit });
          if (data?.data?.collectionByHandle?.products?.edges) {
            setProducts(data.data.collectionByHandle.products.edges);
          }
        } else {
          const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit });
          if (data?.data?.products?.edges) {
            setProducts(data.data.products.edges);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit, collectionHandle]);

  return { products, loading, error };
}
