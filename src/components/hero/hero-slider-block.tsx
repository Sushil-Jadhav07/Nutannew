import HeroSliderCard from '@/components/hero/hero-slider-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';
import { useFirebaseBanners } from '../../hooks/useFirebaseBanners';

interface Props {
    heroBanner?: any;
    className?: string;
    variant?: string;
    contentClassName?: string;
    showHeroContent?: boolean;
    useFirebase?: boolean; // New prop to enable Firebase integration
    fallbackBanners?: any[]; // Fallback banners if Firebase fails
}

const HeroSliderBlock: React.FC<Props> = ({
          heroBanner,
          variant='hero',
          className = 'mb-7',
          contentClassName = 'px-5 py-10 xl:py-24',
          showHeroContent = true,
          useFirebase = false,
          fallbackBanners = [],
      }) => {
    
    // Firebase integration
    const { banners: firebaseBanners, loading, error } = useFirebaseBanners();
    
    // Determine which banners to use
    let finalBanners = heroBanner;
    
    if (useFirebase) {
        if (firebaseBanners.length > 0) {
            finalBanners = firebaseBanners;
        } else if (fallbackBanners.length > 0) {
            finalBanners = fallbackBanners;
        }
    }
    
    // Show loading state if Firebase is enabled and still loading
    if (useFirebase && loading && fallbackBanners.length === 0) {
        return (
            <div className={`${className} flex items-center justify-center min-h-[200px]`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading banners...</p>
                </div>
            </div>
        );
    }
    
    // Show error state if Firebase failed and no fallback banners
    if (useFirebase && error && fallbackBanners.length === 0) {
        return (
            <div className={`${className} flex items-center justify-center min-h-[200px]`}>
                <div className="text-center">
                    <p className="text-red-600 mb-2">Failed to load banners</p>
                    <p className="text-gray-600 text-sm">Please try again later</p>
                </div>
            </div>
        );
    }
    
    // If no banners available at all, show a placeholder
    if (!finalBanners || finalBanners.length === 0) {
        return (
            <div className={`${className} flex items-center justify-center min-h-[200px] bg-gray-100 rounded`}>
                <div className="text-center">
                    <p className="text-gray-600">No banners available</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`${className}`}>
            <Carousel
                pagination={{
                    clickable: true,
                }}
                autoplay={false}
                prevActivateId={`prevActivateId`}
                nextActivateId={`nextActivateId`}
            >
                {finalBanners?.map((banner: never,index:number) => (
                    <SwiperSlide key={`hero-slider${index}`}>
                        <HeroSliderCard
                            banner={banner}
                            variant={variant}
                            className={contentClassName}
                            heroContentCard={showHeroContent}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSliderBlock;
