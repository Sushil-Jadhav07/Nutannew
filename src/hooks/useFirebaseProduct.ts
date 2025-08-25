import { useQuery } from '@tanstack/react-query';
import { fetchProductFromFirebase } from '@/services/product/firebase-product';
import { Product } from '@/services/types';

// Hook for fetching a single product from Firebase
export const useFirebaseProduct = (productId: string) => {
  return useQuery<Product | null, Error>({
    queryKey: ['firebase-product', productId],
    queryFn: () => fetchProductFromFirebase(productId),
    enabled: !!productId, // Only run query if productId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
