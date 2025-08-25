

import CollectionShopCard from '@/components/collection/collection-shop-card';
import SectionHeader from '@/components/common/section-header';
import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import {ROUTES} from '@/utils/routes';

const data = [
    {
        id: 1,
        slug: 'bags-accessories',
        image: '/assets/images/banner/home8/img_13_3.png',
        title: 'Sofas',
        description: 'collection-description-one',
    },
    {
        id: 2,
        slug: 'electronic-digital',
        image: '/assets/images/banner/home8/img_13_4.jpg',
        title: 'Lighting',
        description: 'collection-description-two',
    },
    {
        id: 3,
        slug: 'garden',
        image: '/assets/images/banner/home8/img_13_5.jpg',
        title: 'Decoration',
        description: 'collection-description-three',
    }
];

interface Props {
    className?: string;
    headingPosition?: 'left' | 'center' | 'center-xl';
}

const breakpoints = {
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 3,
    },
    '540': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};

const CollectionLight : React.FC<Props> = ({
                                             className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
                                             headingPosition = 'center',
                                         }) => {
    const {width} = useWindowSize();
    return (
        <div className={className}>

            <SectionHeader
                sectionHeading="You Might Like"
                sectionSubHeading="The best quality products are waiting for you & choose it now."
                headingPosition={headingPosition}
            />
            {width! < 1200 ? (
                <Carousel
                    breakpoints={breakpoints}
                    prevActivateId="collection-carousel-button-prev"
                    nextActivateId="collection-carousel-button-next"
                >
                    {data?.map((item) => (
                        <SwiperSlide
                            key={`collection-key-${item.id}`}
                        >
                            <CollectionShopCard
                                key={item.id}
                                imgWidth={447}
                                imgHeight={348}
                                collection={item}
                                href={`${ROUTES.CATEGORY}/${item.slug}`}
                                variant={'rounded-xl'}
                            />
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="gap-5 xl:grid xl:grid-cols-3 xl:gap-5">
                    {data?.map((item) => (
                        <CollectionShopCard
                            key={item.id}
                            imgWidth={447}
                            imgHeight={348}
                            collection={item}
                            href={`${ROUTES.CATEGORY}/${item.slug}`}
                            variant={'rounded-xl'}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default CollectionLight;
