
import CollectionPopularCard from '@/components/collection/collection-popular-card';
import SectionHeader from '@/components/common/section-header';
import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from '@/utils/routes';
import cn from 'classnames';
import React, {useMemo} from "react";


const data = [
    {
        id: 1,
        slug: 'bags-accessories',
        image: '/assets/images/category/home7/categories-1.jpg',
        title: 'Bedroom',
        productCount: 13,
    },
    {
        id: 2,
        slug: 'electronic-digital',
        image: '/assets/images/category/home7/categories-2.jpg',
        title: 'Home Accessories',
        productCount: 16,
    },
    {
        id: 3,
        slug: 'garden',
        image: '/assets/images/category/home7/categories-3.jpg',
        title: 'Sectional Sofas',
        productCount: 15,
    },
    {
        id: 4,
        slug: 'home-kitchen',
        image: '/assets/images/category/home7/categories-4.jpg',
        title: 'Dining & Kitchen',
        productCount: 14,
    },
    {
        id: 5,
        slug: 'lighting-lamps',
        image: '/assets/images/category/home7/categories-5.jpg',
        title: 'Decor & Lighting',
        productCount: 16,
    },
    {
        id: 6,
        slug: 'lighting-lamps',
        image: '/assets/images/category/home7/categories-6.jpg',
        title: 'Decor & Lighting',
        productCount: 12,
    }
];

interface Props {
    className?: string;
    headingPosition?: 'left' | 'center';
}

const breakpoints = {
    '1024': {
        slidesPerView: 5,
    },
    '768': {
        slidesPerView: 3,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 2,
    },
};
const CollectionPopular: React.FC<Props> = ({
                                             className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
                                             headingPosition = 'left',
                                         }) => {
    const {width} = useWindowSize();
    // Memoize spaceBetween based on width
    const spaceBetween = React.useMemo(() => {
        return width! < 1536 ? 10 : 20;
    }, [ width]);

    const isCarouselView = useMemo(() => width! < 1536, [width]);

    return (
        <div className={className}>
            
            <SectionHeader
                sectionHeading="Popular Categories"
                className={cn('pb-3 uppercase')}
                headingPosition={headingPosition}
            />
            {isCarouselView ? (
                <Carousel
                    spaceBetween={spaceBetween}
                    breakpoints={breakpoints}
                    autoplay={{delay: 4000}}
                    prevActivateId="collection-carousel-button-prev"
                    nextActivateId="collection-carousel-button-next"
                >
                    {data?.map((item) => (
                        <SwiperSlide
                            key={`collection-key-${item.id}`}
                        >
                            <CollectionPopularCard
                                key={item.id}
                                collection={item}
                                href={`${ROUTES.CATEGORY}/${item.slug}`}
                            />
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="gap-5 2xl:grid 2xl:grid-cols-6 3xl:gap-5">
                    {data?.map((item) => (
                        <CollectionPopularCard
                            key={item.id}
                            collection={item}
                            href={`${ROUTES.CATEGORY}/${item.slug}`}
                        />
                    ))}
                </div>
            )}
        
        </div>
    );
};

export default CollectionPopular;
