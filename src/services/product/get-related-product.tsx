import { QueryOptionsType, Product } from '@/services/types';
import http from '@/services/utils/http';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchRelatedProducts = async () => {

  const { data } = await http.get(API_RESOURCES.RELATED_PRODUCTS);
  return data;
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_RESOURCES.RELATED_PRODUCTS, options],
    queryFn: fetchRelatedProducts
  });
};
