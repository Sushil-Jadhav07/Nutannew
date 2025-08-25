import { QueryOptionsType, Product } from '@/services/types';
import { API_RESOURCES } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useInfiniteQuery } from '@tanstack/react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async () => {
  const { data } = await http.get(API_RESOURCES.PRODUCTS);
  return {
    data:data as Product[],
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useMoreProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: ['load-products', options], // Unique key
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
  });
};

export { useMoreProductsQuery, fetchProducts };
