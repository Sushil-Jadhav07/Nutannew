

import type { FC } from 'react';
import { useFirebasePopularProducts } from '@/hooks/useFirebaseProducts';
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { LIMITS } from '@/services/utils/limits';

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const PopularFeed: FC<ProductFeedProps> = ({
  className,
  variant,
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading, error } = useFirebasePopularProducts(limit);
  
  // Log for debugging
  console.log('🔄 PopularFeed render:', { 
    productCount: data?.length || 0, 
    isLoading, 
    hasError: !!error,
    error: error?.message 
  });
  
  return (
    <ProductsCarousel
      sectionHeading="Popular products"
      className={className}
      products={data ?? []}
      loading={isLoading}
      limit={limit}
      uniqueKey="popular-product"
      variant={variant}
    />
  );
};

export default PopularFeed;
