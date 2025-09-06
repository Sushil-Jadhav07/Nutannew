
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
            thumbnail: '/assets/images/category/tech1.jpeg',
            original: '/assets/images/category/tech1.jpeg'
        },
        productCount: 15,
    },
    {
        id: 2,
        name: 'Tech Gift Sets',
        slug: 'tech-gift-sets',
        image: { 
            id: 2,
            thumbnail: '/assets/images/category/wireless1.jpeg',
            original: '/assets/images/category/tech-gift-sets.jpg'
        },
        productCount: 12,
    },
    {
        id: 3,
        name: 'Eco notebook',
        slug: 'eco-notebook',
        image: { 
            id: 3,
            thumbnail: '/assets/images/category/eco-notebook.jpg',
            original: '/assets/images/category/eco-notebook.jpg'
        },
        productCount: 8,
    },
    {
        id: 4,
        name: 'Sippers & Straps',
        slug: 'sippers-with-straps',
        image: { 
            id: 4,
            thumbnail: '/assets/images/category/sippers-straps.jpg',
            original: '/assets/images/category/sippers-straps.jpg'
        },
        productCount: 10,
    },
    {
        id: 5,
        name: 'Corporate Combos',
        slug: 'corporate-combo-packs',
        image: { 
            id: 5,
            thumbnail: '/assets/images/category/corporate-combo.jpg',
            original: '/assets/images/category/corporate-combo.jpg'
        },
        productCount: 6,
    },
    {
        id: 6,
        name: 'Custom Bundles',
        slug: 'custom-bundles',
        image: { 
            id: 6,
            thumbnail: '/assets/images/category/custom-bundles.jpg',
            original: '/assets/images/category/custom-bundles.jpg'
        },
        productCount: 20,
    },
    {
        id: 7,
        name: 'Accessories',
        slug: 'accessories',
        image: { 
            id: 7,
            thumbnail: '/assets/images/category/accessories.jpg',
            original: '/assets/images/category/accessories.jpg'
        },
        productCount: 25,
    },
    {
        id: 8,
        name: 'Festive Gifts',
        slug: 'festive-gift-set',
        image: { 
            id: 8,
            thumbnail: '/assets/images/category/festive-gifts.jpg',
            original: '/assets/images/category/festive-gifts.jpg'
        },
        productCount: 14,
    },
];

const GridBaseCarousel: React.FC<CategoriesProps> = ({
                                                          sectionHeading,
                                                          className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 ',
                                                          limit = 8,
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
