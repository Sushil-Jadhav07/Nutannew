
import BannerCard from '@/components/banner/banner-card';
import { useStaticBanners } from '@/hooks/useStaticBanners';

interface BannerProps {
  data?: any;
  grid?: number;
  className?: string;
  girdClassName?: string;
  variant?: 'rounded' | 'default' | 'rounded-xl';
  useFirebase?: boolean;
  fallbackData?: any;
}


const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  girdClassName,
  className = 'mb-3 xl:mb-6',
  variant = 'default',
  useFirebase = false,
  fallbackData = [],
}) => {
  // Firebase integration
  const { banners: firebaseBanners, loading, error } = useStaticBanners();
  
  // Determine which banners to use
  let finalBanners = data;
  
  if (useFirebase) {
    if (firebaseBanners.length > 0) {
      finalBanners = firebaseBanners;
    } else if (fallbackData.length > 0) {
      finalBanners = fallbackData;
    }
  }
  
  // Show loading state if Firebase is enabled and still loading
  if (useFirebase && loading && fallbackData.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center min-h-[100px]`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading banners...</p>
        </div>
      </div>
    );
  }
  
  // Show error state if Firebase failed and no fallback banners
  if (useFirebase && error && fallbackData.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center min-h-[100px]`}>
        <div className="text-center">
          <p className="text-red-600 text-sm mb-1">Failed to load banners</p>
          <p className="text-gray-600 text-xs">Please try again later</p>
        </div>
      </div>
    );
  }
  
  // If no banners available at all, return empty div
  if (!finalBanners || finalBanners.length === 0) {
    return <div className={className}></div>;
  }

  return (
    <div className={className}>
        <div
            className={`grid grid-cols-1 sm:grid-cols-${grid} gap-2 ${girdClassName ? girdClassName: 'md:gap-5 '}`}
        >
            {finalBanners?.map((banner: unknown,index:number) => (
                <BannerCard
                    key={`banner--key${index}`}
                    banner={banner}
                    effectActive={true}
                    className="w-full  rounded"
                    variant={variant}
                />
            ))}
        </div>
    </div>
  );
};

export default BannerGrid;
