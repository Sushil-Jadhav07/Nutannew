import React from "react";

import {usePopularProductsQuery} from '@/services/product/get-all-popular-products';
import SectionHeader from '@/components/common/section-header';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import {LIMITS} from '@/services/utils/limits';
import ClockIcon from '@/components/icons/clock-icon';
import cn from 'classnames';
import Image from '@/components/shared/image';
import Carousel from "@/components/shared/carousel/carousel";
import {SwiperSlide} from "@/components/shared/carousel/slider";
import useWindowSize from '@/utils/use-window-size';
import ProductBestDealsCard from "@/components/product/productListing/productCards/best-deal-card";

import ProductCountdownTimer from "@/components/shared/productCountdownTimer";

interface ProductFeedProps {
    className?: string;
    uniqueKey?: string;
    showBanner?: boolean;
    variant?: string;
}

const backgroundThumbnail = '/assets/images/banner/home1/hotdeals.png' ;

const BestDealsFeed: React.FC<ProductFeedProps> = ({className = '',uniqueKey,showBanner= true,variant }) => {
    const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
    const {data, isLoading} = usePopularProductsQuery({
        limit: limit,
    });
    const { width } = useWindowSize();
    // Memoize breakpoints based on showBanner and variant
    const breakpoints = React.useMemo(() => {
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
    // Memoize spaceBetween based on variant and width
    const spaceBetween = React.useMemo(() => {
        if (variant === 'outBorder') {
            return 10;
        }
        if (variant === 'outBorder-xl') {
            return width! < 1536 ? 10 : 20;
        }
        return 6; // Default value
    }, [variant, width]);

    const date = new Date(Date.now() + 4000000 * 60);

    return (
        <div className={`mb-8 lg:mb-12 ${className}`}>
            <div className={cn('md:flex justify-between mb-1.5  py-2.5 rounded ',
                showBanner && 'bg-white px-5'
            )}>
                <div className='flex items-center gap-2'>
                    <ClockIcon opacity="1"/>
                    <SectionHeader headingPosition="hotdeal" sectionHeading="HOT DEALS!"
                                   sectionSubHeading="GET OUR BEST PRICES"
                                   className="flex gap-2 items-center uppercase"/>
                </div>

                <div className='flex items-center gap-2'>
                    <h2 className="text-skin-base  text-[14px]"> Hurry Up! Offer ends in:</h2>
                    <ProductCountdownTimer date={date} variant={"heading"} />
                </div>

            </div>
            <div className="xl:flex gap-1 relative heightFull">
                {showBanner && (
                    <div className={`xl:max-w-[466px] relative overflow-hidden flex items-center`}>
                        <Image
                            src={backgroundThumbnail}
                            alt={'Product Image'}
                            width={465}
                            height={380}
                        />
                    </div>
                )}

                <div className={cn(
                    showBanner
                        ? 'trendy-main-content'
                        : 'main-content w-full',
                )}>
                    <Carousel
                        breakpoints={breakpoints}
                        spaceBetween={spaceBetween}
                        prevActivateId={`prev${uniqueKey}`}
                        nextActivateId={`next${uniqueKey}`}
                    >
                        {isLoading && !data || data == undefined ? (
                            Array.from({length: limit!}).map((_, idx) => (
                                <SwiperSlide key={`bestdeals-${idx}`}>
                                    <div className={"p-2 w-56 h-full rounded bg-white"}>
                                        <ProductCardLoader key={`bestdeals-${idx}`} uniqueKey={`bestdeals-${idx}`}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <>
                                {data?.slice(0, limit).map((product: any, idx) => (
                                    <SwiperSlide key={`${uniqueKey}-${idx}`}>
                                        <ProductBestDealsCard variant={variant} key={`best-product-${product.id}`} product={product}/>
                                    </SwiperSlide>
                                ))}
                            </>
                        )}
                    </Carousel>
                </div>
            </div>

        </div>
    );
};

export default BestDealsFeed;
