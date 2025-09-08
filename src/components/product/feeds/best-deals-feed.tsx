import React from "react";
import type { FC } from 'react';
import { useFirebaseBestDealsProducts } from '@/hooks/useFirebaseProducts';
import ProductsCarousel from '@/components/product/feeds/products-carousel';
import { LIMITS } from '@/services/utils/limits';
import cn from 'classnames';
import Image from '@/components/shared/image';
import { ClockIcon } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import ProductCountdownTimer from "@/components/shared/productCountdownTimer";

interface ProductFeedProps {
    className?: string;
    uniqueKey?: string;
    showBanner?: boolean;
    variant?: string;
}

const backgroundThumbnail = '/assets/images/banner/home1/Special.jpg';

const BestDealsFeed: FC<ProductFeedProps> = ({
    className = '',
    uniqueKey = 'best-deals',
    showBanner = true,
    variant = 'default'
}) => {
    const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
    const { data, isLoading, error } = useFirebaseBestDealsProducts(limit);
    
    // Log for debugging
    console.log('🔄 BestDealsFeed render:', { 
        productCount: data?.length || 0, 
        isLoading, 
        hasError: !!error,
        error: error?.message 
    });

    // Custom breakpoints for best deals with banner support
    const customBreakpoints = React.useMemo(() => {
        if (variant === 'outBorder-xl') {
            return {
                '1536': { slidesPerView: 7 },
                '1280': { slidesPerView: 5 },
                '1024': { slidesPerView: 4 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 1 },
            };
        }

        if (showBanner) {
            return {
                '1536': { slidesPerView: 4 },
                '1280': { slidesPerView: 4 },
                '1024': { slidesPerView: 3 },
                '640': { slidesPerView: 3 },
                '360': { slidesPerView: 2 },
                '0': { slidesPerView: 2 },
            };
        }

        return {
            '1536': { slidesPerView: 6 },
            '1280': { slidesPerView: 5 },
            '1024': { slidesPerView: 4 },
            '640': { slidesPerView: 3 },
            '360': { slidesPerView: 2 },
            '0': { slidesPerView: 1 },
        };
    }, [showBanner, variant]);

    return (
        <div className={`mb-8 lg:mb-12 ${className}`}>
            {/* Optional header with countdown timer */}
            <div className={cn('md:flex justify-between mb-1.5  py-2.5 rounded ',
                showBanner && 'bg-white px-5'
            )}>
                <div className='flex items-center gap-2'>
                    <ClockIcon opacity="1"/>
                    <SectionHeader headingPosition="hotdeal" sectionHeading="BEST DEALS!"
                                   sectionSubHeading="GET OUR BEST PRICES"
                                   className="flex gap-2 items-center uppercase"/>
                </div>

                {/* <div className='flex items-center gap-2'>
                    <h2 className="text-skin-base  text-[14px]"> Hurry Up! Offer ends in:</h2>
                    <ProductCountdownTimer date={date} variant={"heading"} />
                </div> */}
            </div>
            
            <div className="xl:flex gap-1 relative heightFull">
                {showBanner && (
                    <div className={`xl:max-w-[466px] relative overflow-hidden flex items-center`}>
                        <Image
                            src={backgroundThumbnail}
                            alt={'Best Deals Banner'}
                            width={465}
                            height={350}
                        />
                    </div>
                )}

                <div className={cn(
                    showBanner
                        ? 'trendy-main-content'
                        : 'main-content w-full',
                )}>
                    <ProductsCarousel
                        
                        className=""
                        products={data ?? []}
                        loading={isLoading}
                        limit={limit}
                        uniqueKey={uniqueKey}
                        variant={variant}
                        carouselBreakpoint={customBreakpoints}
                    />
                </div>
            </div>
        </div>
    );
};

export default BestDealsFeed;
