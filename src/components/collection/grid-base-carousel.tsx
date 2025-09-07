
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
    useStaticData?: boolean;
}



// Static category data
const staticCategories: Category[] = [
    {
        id: 1,
        name: 'Tech Organizers',
        slug: 'tech-organizers',
        image: { 
            id: 1,
            thumbnail: '/assets/images/category/tech1.jpg',
            original: '/assets/images/category/tech1.jpeg'
        },
        productCount: 15,
    },
    {
        id: 2,
        name: 'Wireless Charger',
        slug: 'tech-gift-sets',
        image: { 
            id: 2,
            thumbnail: '/assets/images/category/wireless1.jpg',
            original: '/assets/images/category/tech-gift-sets.jpg'
        },
        productCount: 12,
    },
    {
        id: 3,
        name: 'Stainless Steel Tumbler',
        slug: 'stainless-steel-tumbler',
        image: { 
            id: 3,
            thumbnail: '/assets/images/category/stainless-steel.jpg',
            original: '/assets/images/category/eco-notebook.jpg'
        },
        productCount: 8,
    },
    {
        id: 4,
        name: 'Recycled Material Goods',
        slug: 'recycled-material-goods',
        image: { 
            id: 4,
            thumbnail: '/assets/images/category/recycled-material.jpg',
            original: '/assets/images/category/sippers-straps.jpg'
        },
        productCount: 10,
    },
    {
        id: 5,
        name: 'USB Essential',
        slug: 'usb-essential',
        image: { 
            id: 5,
            thumbnail: '/assets/images/category/usb-essential.jpg',
            original: '/assets/images/category/corporate-combopack.jpeg'
        },
        productCount: 6,
    },
    {
        id: 6,
        name: 'Sticky Notes & Memo Pads',
        slug: 'sticky-notes-memo-pads',
        image: { 
            id: 6,
            thumbnail: '/assets/images/category/stickynotes-memopads.jpg',
            original: '/assets/images/category/custom-bundles.jpg'
        },
        productCount: 20,
    },
    {
        id: 7,
        name: 'Cork Accessories',
        slug: 'cork-accessories',
        image: { 
            id: 7,
            thumbnail: '/assets/images/category/corkaccessories.jpg',
            original: '/assets/images/category/accessories.jpg'
        },
        productCount: 25,
    },
    
];

const GridBaseCarousel: React.FC<CategoriesProps> = ({
                                                          sectionHeading,
                                                          className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 ',
                                                          limit = 7,
                                                          variant='default',
                                                         uniqueKey='grid-services',
                                                         useStaticData = false,
                                                      }) => {
    const {data:categories, isLoading} = useCategoriesQuery({
        limit: LIMITS.CATEGORIES_LIMITS,
    });
    
    // Use static data if useStaticData is true, otherwise use API data
    const finalCategories = useStaticData ? staticCategories : categories;
    const finalLoading = useStaticData ? false : isLoading;
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
                    {finalLoading
                        ? Array.from({length: limit}).map((_, idx) => {
                            return (
                                <SwiperSlide key={`category--key-${idx}`}>
                                    <div className={"bg-white p-4"}>
                                        <CategoryCardLoader uniqueKey={`category-card-${idx}`}/>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                        : (finalCategories as Category[])?.slice(0, limit)?.map((category: Category) => (
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
