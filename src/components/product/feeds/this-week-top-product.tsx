
import React, { FC } from 'react';
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { LIMITS } from '@/services/utils/limits';
import {useThisWeekProductsQuery} from "@/services/product/get-all-this-week-products";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const ThisWeekProductFeed: FC<ProductFeedProps> = ({
  className,
  variant,
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading } = useThisWeekProductsQuery({
    limit: limit,
  });

  // Memoize breakpoints based on  variant
  const breakpoints = React.useMemo(() => {
    return {
      '1536': { slidesPerView: 5 },
      '1280': { slidesPerView: 5 },
      '1024': { slidesPerView: 4 },
      '640': { slidesPerView: 3 },
      '360': { slidesPerView: 2 },
      '0': { slidesPerView: 1 },
    };
  }, [ variant]);

  return (
    <ProductsCarousel
      sectionHeading="This Week's Highlights"
      className={className}
      carouselBreakpoint={breakpoints}
      products={data ?? []}
      loading={isLoading}
      limit={limit}
      uniqueKey="top-product"
      variant={variant}
    />
  );
};

export default ThisWeekProductFeed;
