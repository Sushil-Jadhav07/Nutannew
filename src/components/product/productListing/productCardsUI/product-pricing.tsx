import React from "react";
import cn from "classnames";
import usePrice from "@/services/product/use-price";
import { Product } from "@/services/types";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import { DEFAULT_CURRENCY } from "@/utils/currency";

interface ProductPricingProps {
    product: Product;
    variant?: string;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ product, variant = "default"}) => {
    const { product_type, sale_price, price, min_price, max_price } = product;
    const { selectedColor } = usePanel();
    const { price: displayPrice, basePrice } = usePrice({
        amount: sale_price ? sale_price : price,
        baseAmount: price,
        currencyCode: DEFAULT_CURRENCY,
    });
    const { price: minPrice } = usePrice({
        amount: min_price ?? 0,
        currencyCode: DEFAULT_CURRENCY,
    });
    const { price: maxPrice } = usePrice({
        amount: max_price ?? 0,
        currencyCode: DEFAULT_CURRENCY,
    });

    return (
        <div className={cn("space-s-2 mt-1 mb-2", {
            "xs:mt-2": variant === "furni",
            "mt-3 mb-3": variant === "bestdeal" || variant === "list",
        })}>
          <span
              className={cn(colorMap[selectedColor].text, "inline-block font-semibold", {
                  "md:text-[18px]": variant === "default" || variant === "outBorder" || variant === "boxBorder" || variant === "list",
                  "md:text-xl": variant === "todayOffer" ,
                  "md:text-[18px] xs:text-brand-dark": variant === "furni" ,
              })}
          >
            {product_type === "variable"
                ? `${minPrice} - ${maxPrice}`
                : displayPrice}
          </span>
            {basePrice && (
                <del className="mx-1 text-gray-400 ">{basePrice}</del>
            )}
        </div>
    );
};

export default ProductPricing;