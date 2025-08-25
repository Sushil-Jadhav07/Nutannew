
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import React, {useMemo} from "react";

interface Props {
    data: any;
    isLoading: boolean;
    error?: string | null;
    variant: string;
    uniqueKey?: string;
}
const ProductListing: React.FC<Props> = ({
                                             data,
                                             isLoading,
                                             variant,
                                             uniqueKey,
                                         }) => {
    
    const rowCarousel = React.useMemo(() => {
        if (variant === 'horizontal') return 2;
        return 1; // Default value
    }, [variant]);
    
    const breakpoints = useMemo(() => {
        switch (variant) {
            case "horizontal":
                return {
                    1536: { slidesPerView: 3 },
                    1280: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            case "outBorder-xl":
                return {
                    1536: { slidesPerView: 7 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            
            default:
                return {
                    1536: { slidesPerView: 6 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
        }
    }, [variant]);
    
    
    return (
        <ProductsCarousel
            sectionHeading=""
            products={data}
            loading={isLoading}
            uniqueKey={uniqueKey}
            variant={variant}
            rowCarousel={rowCarousel}
            carouselBreakpoint={breakpoints}
        />
    );
};
export default ProductListing;
