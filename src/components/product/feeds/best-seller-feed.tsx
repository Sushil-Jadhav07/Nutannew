import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { useFirebaseBestSellerProducts } from '@/hooks/useFirebaseProducts';
import {LIMITS} from '@/services/utils/limits';
import {FC} from "react";

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}


const BestSellerFeed: FC<Props> = ({
                                       className = 'mb-8 md:mb-10',
                                       variant = 'default',
                                       uniqueKey = "best-sellers"
                                   }) => {
    
    const {data: Product = [], isLoading, error} = useFirebaseBestSellerProducts(LIMITS.BEST_SELLER_PRODUCTS_LIMITS);
    
    const sectionHeading = "Best Products";
    
    // Log for debugging
    console.log('🔄 BestSellerFeed render:', { 
        productCount: Product?.length || 0, 
        isLoading, 
        hasError: !!error,
        error: error?.message 
    });
    
    return (
        <ProductsCarousel
            sectionHeading={sectionHeading}
            products={Product}
            loading={isLoading}
            limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
            uniqueKey={uniqueKey}
            variant={variant}
            className={className}
        />
    );
}
export default BestSellerFeed;
