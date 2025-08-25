
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-container";
import React from "react";
import cn from "classnames";

import {usefashionProductsQuery} from "@/services/product/get-all-fashion-products";
import BannerGrid from "@/components/banner/banner-grid";
import {homeSupperCategory2} from "@/components/banner/data";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
    showBanner?: boolean;
    showCategoryList?: boolean;
}

const category = {
    "name": "Electronic & Digital",
    "slug": "electronic-digital",
};
const SuppercategorySmartphone: React.FC<CategoriesProps> = ({ className = '', rowCarousel = 1,  showBanner = true,}) => {
    
    const {data: products, isLoading} = usefashionProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });

    return (
        <div className={cn("mb-8 lg:mb-12", className)}>
            <SupperCategoryList className={`supper-category--list`} data={category}/>
            <div className="xl:flex w-full gap-1.5">
                {showBanner && (
                    <BannerGrid
                        data={homeSupperCategory2}
                        grid={1}
                        className="hidden xl:flex staticBanner--slider "
                    />
                )}
                <div className={`${showBanner ? 'banner-main-content' : 'popular-main-content'} grow`}>
                    <SupperCategoryContainer uniqueKey={'supper-smartphone'} data={products} isLoading={isLoading}
                                             rowCarousel={rowCarousel} showBanner={showBanner}/>
                </div>
            </div>
        </div>
    );
}
export default SuppercategorySmartphone;
