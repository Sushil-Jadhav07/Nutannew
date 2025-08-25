import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

// Fetch best seller products (queryKey unused, so typed explicitly)
export const fetchBestSellerProducts = async (/* { queryKey }: any */) => {
  const { data } = await http.get(API_RESOURCES.BEST_SELLER_PRODUCTS);
  return data as Product[];
};

// Hook to fetch best seller products
export const useBestSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.BEST_SELLER_PRODUCTS, options],
    queryFn: fetchBestSellerProducts, // Pass options implicitly via queryKey
  });
};