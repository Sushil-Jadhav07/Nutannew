import {Product, QueryOptionsType} from '@/services/types';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useQuery} from '@tanstack/react-query';

const fetchProducts = async () => {
  const { data } = await http.get(API_RESOURCES.PRODUCTS);
  return data as Product[];
};

const useProductsQuery = (options?: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', options],// Unique key
    queryFn: fetchProducts,
  });
};

export { useProductsQuery, fetchProducts };
