import {LIMITS} from "@/services/utils/limits";
import ProductsCarousel from "@/components/product/feeds/products-carousel";

interface Props {
    data: any;
    isLoading: boolean;
    error?: string;
    rowCarousel?: number;
    uniqueKey?: string;
    showBanner?: boolean;
}
const SupperCategoryContainer: React.FC<Props> = ({data, isLoading, rowCarousel=1,uniqueKey}) => {

    const  breakpoints = {
        '1536': {
            slidesPerView: 5,
        },
        '1280': {
            slidesPerView: 5,
        },
        '1024': {
            slidesPerView: 4,
        },
        '640': {
            slidesPerView: 3,
        },
        '360': {
            slidesPerView: 2,
        },
        '0': {
            slidesPerView: 1,
        },
    };

    return (
      <ProductsCarousel
        sectionHeading=""
        products={data}
        loading={isLoading}
        limit={LIMITS.FASHION_PRODUCTS_LIMITS}
        uniqueKey={uniqueKey}
        carouselBreakpoint={breakpoints}
        rowCarousel={rowCarousel}
        variant={"furniture"}
      />
    );
};
export default SupperCategoryContainer;
