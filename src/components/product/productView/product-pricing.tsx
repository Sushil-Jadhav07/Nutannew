import React from "react";
import { Product, VariationOption } from "@/services/types";
import isEmpty from "lodash/isEmpty";
import VariationPrice from "@/components/product/productView/variation-price";
import usePrice from "@/services/product/use-price";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";
import { DEFAULT_CURRENCY } from "@/utils/currency";

interface ProductPricingProps {
    data: Product;
    selectedVariation?: VariationOption;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ data, selectedVariation }) => {
    const { selectedColor } = usePanel();
    
    // Check if we have Firebase variations
    const hasFirebaseVariations = data.variation_options && Array.isArray(data.variation_options) && data.variation_options.length > 0;
    
    // Calculate min and max prices from Firebase variations
    const firebaseMinPrice = hasFirebaseVariations 
        ? Math.min(...data.variation_options!.map(v => v.price || data.price))
        : data.min_price;
    
    const firebaseMaxPrice = hasFirebaseVariations 
        ? Math.max(...data.variation_options!.map(v => v.price || data.price))
        : data.max_price;

    // Use Firebase variation pricing if available, otherwise fall back to original logic
    if (hasFirebaseVariations && selectedVariation) {
        const { price, basePrice, discount } = usePrice({
            amount: selectedVariation.sale_price || selectedVariation.price,
            baseAmount: selectedVariation.price,
            currencyCode: DEFAULT_CURRENCY,
        });

        return (
            <div className={"pb-3 lg:pb-5"}>
                <div className="flex items-center mt-5">
                    <div
                        className={cn(
                            colorMap[selectedColor].text,
                            "font-medium text-base md:text-xl xl:text-2xl"
                        )}
                    >
                        {price}
                    </div>
                    {discount && (
                        <>
                            <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-muted">
                                {basePrice}
                            </del>
                            <span className="inline-block rounded font-medium text-xs md:text-sm bg-brand-sale text-brand-light uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                                {discount} off
                            </span>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Fallback to original logic for non-Firebase variations
    const { price, basePrice, discount } = usePrice({
        amount: data.sale_price ? data.sale_price : data.price,
        baseAmount: data.price,
        currencyCode: DEFAULT_CURRENCY,
    });
    const variations = data.variations;

    return (
        <div className={"pb-3 lg:pb-5"}>
            {isEmpty(variations) ? (
                <div className="flex items-center mt-5">
                    <div
                        className={cn(
                            colorMap[selectedColor].text,
                            "font-medium text-base md:text-xl xl:text-2xl"
                        )}
                    >
                        {price}
                    </div>
                    {discount && (
                        <>
                            <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-muted">
                                {basePrice}
                            </del>
                            <span className="inline-block rounded font-medium text-xs md:text-sm bg-brand-sale text-brand-light uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                                {discount} off
                            </span>
                        </>
                    )}
                </div>
            ) : (
                <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={firebaseMinPrice}
                    maxPrice={firebaseMaxPrice}
                />
            )}
        </div>
    );
};

export default ProductPricing;