import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from '@/utils/routes';
import {useBlogsQuery} from '@/services/blog/get-all-blogs';
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import React, {useMemo} from "react";
import cn from "classnames";
import LatestblogCard from "@/components/blog/latestblog-card";
import {LIMITS} from "@/services/utils/limits";
import useWindowSize from "@/utils/use-window-size";

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}

const LatestblogCarousel: React.FC<Props> = ({
                                         className,
                                         variant='default',
                                         uniqueKey='latestblog',
                                     }) => {
    const {data:dataBlog, isLoading} = useBlogsQuery();
    const limit = LIMITS.LATEST_BLOG_LIMITS;
    const {width} = useWindowSize();
    
    const spaceBetween = React.useMemo(() => {
        if(variant ==='home3'  || variant =='home8')  return width! < 1024 ? 10 : 30;
        if(variant =='home4') return 10;
        if(variant =='home7'|| variant ==='home5' ) return width! < 1024 ? 10 : 20;
        return 5; // Default value
    }, [variant,width]);
    
    const breakpoints = useMemo(() => {
        switch (variant) {
            case "home8":
                return {
                    1536: { slidesPerView: 3 },
                    1280: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 2 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
            default:
                return {
                    1536: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                    1024: { slidesPerView: 3 },
                    640: { slidesPerView: 2 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
        }
    }, [variant]);
    
   
    
    return (
        <div className={cn('heightFull relative', className)}>
            <Carousel
                spaceBetween={spaceBetween}
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
            >
                {isLoading  ? (
                    Array.from({length: 6}).map((_, idx) => (
                        <SwiperSlide key={`latestblog-${idx}`}>
                            <div className="p-2 w-85 h-full rounded bg-white">
                                <ProductCardLoader uniqueKey={`latestblog-${idx}`}/>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    dataBlog?.slice(0, limit)?.map((item) => (
                        <SwiperSlide key={`collection-key-${item.id}`}>
                            <LatestblogCard
                                variant={variant}
                                key={item.id}
                                collection={item}
                                href={`${ROUTES.BLOG}/${item.slug}`}
                            />
                        </SwiperSlide>
                    ))
                )}
            </Carousel>
        </div>
    );
};

export default LatestblogCarousel;
