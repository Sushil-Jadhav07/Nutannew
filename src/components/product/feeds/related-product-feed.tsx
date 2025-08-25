import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { useFirebaseAllProducts } from '@/hooks/useFirebaseProducts';
import { LIMITS } from '@/services/utils/limits';

interface RelatedProductsProps {
  carouselBreakpoint?: {} ;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductSlider: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { data: Product=[], isLoading, error } = useFirebaseAllProducts(LIMITS.RELATED_PRODUCTS_LIMITS);
  
  // Log for debugging
  console.log('🔄 RelatedProductSlider render:', { 
    productCount: Product?.length || 0, 
    isLoading, 
    hasError: !!error,
    error: error?.message 
  });
  
  return (
    <ProductsCarousel
      sectionHeading="Related Products"
      className={className}
      products={Product}
      loading={isLoading}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductSlider;
