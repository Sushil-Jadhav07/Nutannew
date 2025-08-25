import SectionHeader from '@/components/common/section-header';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import cn from 'classnames';
import ProductCardFurni from "@/components/product/productListing/productCards/product-card-furni";
import ProductCard from '@/components/product/productListing/productCards/product-card';
import ProductCardVertical from "@/components/product/productListing/productCards/product-card-vertical";
import {BreakpointsType} from "@/services/types";
import useCarouselConfig from "@/hooks/use-carousel-config";
import ProductCardBorder from "@/components/product/productListing/productCards/product-card-border";


interface ProductsCarouselProps {
    sectionHeading?: string;
    className?: string;
    products: any;
    loading: boolean;
    limit?: number;
    uniqueKey?: string;
    carouselBreakpoint?: BreakpointsType;
    rowCarousel?: number;
    variant?: string;
}


const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
        sectionHeading,
        className = '',
        products,
        loading,
        limit,
        uniqueKey,
        carouselBreakpoint,
        variant = 'default',
        rowCarousel = 1,
    }) => {

    const { spaceBetween, breakpoints } = useCarouselConfig(variant);
   
    return (
        <div className={cn('heightFull relative ', className)}>
            
            {sectionHeading && (
                <>
                    {(() => {
                        switch (variant) {
                            case 'furniture':
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        sectionSubHeading="The best quality products are waiting for you & choose it now."
                                        headingPosition={"center"}
                                    />
                                );
                            case 'furniture2':
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        sectionSubHeading="The best quality products are waiting for you & choose it now."
                                        headingPosition={"center-xl"}
                                    />
                                );
                            case 'noHeading':
                                break;
                            default:
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        className={cn('py-2.5 uppercase', {
                                            'mb-1.5 rounded bg-white px-5': variant === 'default',
                                        })}
                                    />
                                );
                        }
                    })()}
                </>
            )}
            
            <div
                className={cn('relative ', {
                    'border border-black/10 rounded-md overflow-hidden': variant === 'boxBorder',
                })}
            >
                <Carousel
                    spaceBetween={spaceBetween}
                    grid={{rows: rowCarousel, fill: 'row'}}
                    breakpoints={carouselBreakpoint || breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                >
                    {loading ? (
                        Array.from({length: limit!}).map((_, idx) => (
                            <SwiperSlide  key={`${uniqueKey}-${idx}`}>
                                <div className={"p-2 w-56 h-full rounded bg-white"}>
                                    <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`}/>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : products && products.length > 0 ? (
                        products.map((product: any, idx:number) => (
                            <SwiperSlide key={`${uniqueKey}-${idx}`} className="">
                                {(() => {
                                    switch (variant) {
                                        case 'horizontal':
                                            return (
                                                <ProductCardVertical
                                                    key={`${uniqueKey}-${product.id}`}
                                                    product={product}
                                                    variant={variant}
                                                />
                                            );
                                            
                                        case 'furniture2':
                                        case 'furniture':
                                            return (
                                                <ProductCardFurni
                                                    key={`${uniqueKey}-${product.id}`}
                                                    product={product}
                                                />
                                            );
                                        case 'outBorder-xl':
                                        case 'outBorder':
                                            return (
                                                <ProductCardBorder
                                                    key={`${uniqueKey}-${product.id}`}
                                                    product={product}
                                                    variant={variant}
                                                />
                                            );
                                        default:
                                            return (
                                                <ProductCard
                                                    key={`${uniqueKey}-${product.id}`}
                                                    product={product}
                                                    variant={variant}
                                                />
                                            );
                                    }
                                })()}
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="text-center py-8 px-4">
                            <div className="max-w-md mx-auto">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Products...</h3>
                                <p className="text-gray-500">Fetching products from Firebase. This may take a moment.</p>
                            </div>
                        </div>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default ProductsCarousel;
