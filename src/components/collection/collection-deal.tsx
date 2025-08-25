
import CollectionDealCard from '@/components/collection/collection-deal-card';
import SectionHeader from '@/components/common/section-header';
import useWindowSize from '@/utils/use-window-size';
import Carousel from '@/components/shared/carousel/carousel';
import { SwiperSlide } from '@/components/shared/carousel/slider';

const data = [
  {
    id: 1,
    slug: 'feel-the-thirsty-in-summer-anytime',
    image: '/assets/images/collection/top-offer-1.png',
    title: 'Living Room Awesome',
    description: 'Up to 10% Offer',
  },
  {
    id: 2,
    slug: 'most-popular-item-for-Fast-food',
    image: '/assets/images/collection/top-offer-2.png',
    title: 'Bedroom Interior from $14.00',
    description: 'Save up to 40%',
  },
  {
    id: 3,
    slug: 'authentic-japanese-food-in-real-taste',
    image: '/assets/images/collection/top-offer-3.png',
    title: 'Discover Residential Lighting',
    description: 'Flat 10% Off',
  },
    {
        id: 4,
        slug: 'authentic-japanese-food-in-real-taste',
        image: '/assets/images/collection/top-offer-4.png',
        title: 'Sectional Sofas from $14.00',
        description: 'Up to 20% Offer',
    },
];

interface Props {
  className?: string;
  headingPosition?: 'left' | 'center';
}

const breakpoints = {
  '1024': {
    slidesPerView: 4,
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

const CollectionDeal: React.FC<Props> = ({
  className = 'mb-12 lg:mb-15',
  headingPosition = 'center',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="Top Offers-Deals"
        sectionSubHeading="Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas."
        headingPosition={headingPosition}
      />
      {width! < 1536 ? (
        <Carousel
          breakpoints={breakpoints}
          prevActivateId="collection-carousel-button-prev"
          nextActivateId="collection-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide
              key={`collection-key-${item.id}`}
            >
              <CollectionDealCard
                key={item.id}
                collection={item}
                href={item.slug}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7">
          {data?.map((item) => (
            <CollectionDealCard
              key={item.id}
              collection={item}
              href={item.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDeal;
