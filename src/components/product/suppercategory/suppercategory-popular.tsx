'use client';
import {LIMITS} from '@/services/utils/limits';
import SupperCategoryList from "@/components/product/suppercategory/suppercategory-ui/suppercategory-popular-list";
import SupperCategoryContainer from "@/components/product/suppercategory/suppercategory-ui/suppercategory-popular-container";
import {useElectronicCategoryQuery} from '@/services/product/get-electronic-category';

import React from "react";
import cn from "classnames";
import {useTopSellProductsQuery} from "@/services/product/get-all-topsell-produts";

interface CategoriesProps {
    className?: string;
    rowCarousel?: number;
}

const SuppercategoryPopular: React.FC<CategoriesProps> = ({ className = '', rowCarousel = 1,}) => {
    const {data: category} = useElectronicCategoryQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });
    const {data: products, isLoading} = useTopSellProductsQuery({
        limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
    });

    return (
        <div className={cn("mb-8 lg:mb-15", className)}>
            <SupperCategoryList className={`categoryPopular--list mb-4 lg:mb-8`} data={category}/>
            <SupperCategoryContainer uniqueKey={'supper-popular'} data={products} isLoading={isLoading}
                                     rowCarousel={rowCarousel} />
        </div>
    );
}
export default SuppercategoryPopular;
