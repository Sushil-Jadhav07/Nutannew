import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { useQuery } from '@tanstack/react-query';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { searchProducts, advancedSearchProducts } from '@/utils/search-filter';

export const fetchSearched = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const { data } = await http.get(API_RESOURCES.SEARCH);
  
  if (!options.text || options.text.trim() === '') {
    return data;
  }

  // Use advanced search for better results
  const advancedResults = advancedSearchProducts(data, options.text);
  return advancedResults.map(result => result.product);
};

export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.SEARCH, options],
    queryFn: fetchSearched,
    enabled: !!options.text, // Only run query if there's a search term
  });
};

// New hook for Firebase products search
export const useFirebaseSearchQuery = (searchTerm: string, products: Product[] = []) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-search', searchTerm, products.length],
    queryFn: () => {
      if (!searchTerm || !products.length) {
        return Promise.resolve([]);
      }
      
      const advancedResults = advancedSearchProducts(products, searchTerm);
      return Promise.resolve(advancedResults.map(result => result.product));
    },
    enabled: !!searchTerm && products.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
