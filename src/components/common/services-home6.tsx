'use client';
import FeaturedCard from '@/components/cards/featured-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import DeliveryIcon from "@/components/icons/featured/delivery-icon";
import CardIcon from "@/components/icons/featured/card-icon";
import SupportIcon from "@/components/icons/featured/support-icon";
import cn from 'classnames';

const data = [
    {
        id: 1,
        icon: (
            <DeliveryIcon color="text-brand-light" />
        ),
        title: 'Fast Delivery',
        description: 'Deliver in 24 hours max!',
    },
    {
        id: 2,
        icon: (
            <CardIcon  color="text-brand-light" />
        ),
        title: 'Safe payment',
        description: '100% secure payment',
    },
    {
        id: 3,
        icon: (
            <SupportIcon
                color="text-brand-light"
            />
        ),
        title: 'Help Center',
        description: 'Dedicated 24/7 support',
    },

];

interface Props {
    className?: string;
    variant?: string;
    uniqueKey?:string;
}

const breakpoints = {

    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 2,
    },
    '640 ': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const ServicesHome6: React.FC<Props> = ({ className = 'mb-8 md:mb-10 ',variant ,uniqueKey='services',}) => {
    return (
        <div className={cn(
            'group', {
                'py-10 py:mb-12': variant === 'default',
                'border-b border-white/10 dark:border-black/10 p-6  xl:py-8 ': variant === 'home6',
            },
            className
        )}
        >
            <Carousel
                autoplay={false}
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
            >
                {data?.map((item) => (
                    <SwiperSlide key={`featured-key-${item.id}`}>
                        <FeaturedCard item={item} variant={variant} />
                    </SwiperSlide>
                ))}

            </Carousel>
        </div>
    );
};
export default ServicesHome6;
