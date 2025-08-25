
import React from "react";

import {ROUTES} from '@/utils/routes';
import {SwiperSlide} from 'swiper/react';
import {LIMITS} from '@/services/utils/limits';
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import SectionHeader from '@/components/common/section-header';
import cn from 'classnames';
import GridBaseCard from "@/components/collection/grid-base-card";
import CategoryCardLoader from "@/components/shared/loaders/category-card-loader";
import {Category} from "@/services/types";
const Carousel = React.lazy(() => import('@/components/shared/carousel/carousel'));

interface CategoriesProps {
    sectionHeading?: string;
    className?: string;
    limit?: number;
    variant?: string;
    uniqueKey?:string;
}



const GridBaseCarousel: React.FC<CategoriesProps> = ({
                                                          sectionHeading,
                                                          className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 ',
                                                          limit = 8,
                                                          variant='default',
                                                         uniqueKey='grid-services',
                                                      }) => {
    const {data:categories, isLoading} = useCategoriesQuery({
        limit: LIMITS.CATEGORIES_LIMITS,
    });
    const breakpoints = {
        '1480': {
            slidesPerView: limit,
            spaceBetween: 10
        },
        '1280': {
            slidesPerView: 5,
            spaceBetween: 10
        },
        '1024': {
            slidesPerView: 5,
            spaceBetween: 10
        },
        '768': {
            slidesPerView: 4,
            spaceBetween: 10
        },
        '600': {
            slidesPerView: 2,
            spaceBetween: 1
        },
        '0': {
            slidesPerView: 2,
            spaceBetween: 1
        },
    };
    
  
    return (
        <div className={className}>
            {sectionHeading  && (
                <SectionHeader
                    sectionHeading={sectionHeading}
                    className={cn('pb-3 uppercase', {
                        '': variant === 'default',
                    })}
                />
            )}

            <div className=" w-full overflow-hidden">
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId={`prev${uniqueKey}`}
                    nextActivateId={`next${uniqueKey}`}
                >
                    {isLoading
                        ? Array.from({length: limit}).map((_, idx) => {
                            return (
                                <SwiperSlide key={`category--key-${idx}`}>
                                    <div className={"bg-white p-4"}>
                                        <CategoryCardLoader uniqueKey={`category-card-${idx}`}/>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                        : (categories as Category[])?.slice(0, limit)?.map((category: Category) => (
                            <SwiperSlide key={`category--key-${category.id}`}>
                                <GridBaseCard
                                    item={category}
                                    variant={variant}
                                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                                />
                            </SwiperSlide>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default GridBaseCarousel;
