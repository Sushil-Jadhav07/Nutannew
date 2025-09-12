
import LicenseIcon from '@/components/icons/featured/license-icon';
import FeedbackIcon from '@/components/icons/featured/feedback-icon';
import DeliveryIcon from "@/components/icons/featured/delivery-icon";
import CardIcon from "@/components/icons/featured/card-icon";
import SupportIcon from "@/components/icons/featured/support-icon";

import FeaturedCard from '@/components/cards/featured-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from "@/utils/routes";
import cn from "classnames";
import React from 'react';
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";



interface Props {
    className?: string;
    variant?: string;
    uniqueKey?: string;
}

const breakpoints = {
    '1400': {
        slidesPerView: 5,
    },
    '1024': {
        slidesPerView: 4,
    },
    '768': {
        slidesPerView: 3,
    },
    '640 ': {
        slidesPerView: 3,
    },
    '0': {
        slidesPerView: 1,
    },
};

const ServiceFeature: React.FC<Props> = ({
                                              variant = 'default',
                                             uniqueKey='services',
                                              className = 'mb-8 md:mb-10',
                                          }) => {
    const { selectedColor, theme } = usePanel();
    const iconColor = theme === 'dark' ? 'white' : colorMap[selectedColor].link;
    const data = [
        {
            id: 1,
            icon: (
                <DeliveryIcon color={iconColor}/>
            ),
            title: 'Fast Delivery',
            description: 'Deliver in 24 hours max!',
            href: ROUTES.HOME,
        },
        {
            id: 2,
            icon: (
                <CardIcon color={iconColor} />
            ),
            title: 'safe payment',
            description: '100% secure payment',
            href: ROUTES.HOME,
        },
        {
            id: 3,
            icon: (
                <FeedbackIcon color={iconColor} />
            ),
            title: 'Online Discount',
            description: 'Add multi-buy discount',
            href: ROUTES.HOME,
        },
        {
            id: 4,
            icon: (
                <SupportIcon color={iconColor} />
            ),
            title: 'Help Center',
            description: 'Dedicated 24/7 support',
            href: ROUTES.HOME,
        },
        {
            id: 5,
            icon: (
                <LicenseIcon color={iconColor} />
            ),
            title: 'Curated items',
            description: 'From handpicked sellers',
            href: ROUTES.HOME,
        },
    ];
    return (
        <div className={cn(
                 'group',{
                     'border-b border-black/5 py-10 py:mb-12': variant === 'default' || variant === 'home3',
                     'featuredCarousel  bg-white rounded p-6 px-8 xl:px-11 ': variant === 'home2' ,
                    'py-8':  variant === 'home5',
                 },
                 className
             )}
        >
            <Carousel
                breakpoints={breakpoints}
                prevActivateId={`prev${uniqueKey}`}
                nextActivateId={`next${uniqueKey}`}
            >
                {data?.map((item) => (
                    <SwiperSlide key={`featured-key-${item.id}`}>
                        <FeaturedCard item={item}  variant={variant}/>
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default ServiceFeature;
