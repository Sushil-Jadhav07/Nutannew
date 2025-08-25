import React from "react";
import { Product } from "@/services/types";
import StarIcon from "@/components/icons/star-icon";
import cn from "classnames";

interface ProductDetailsProps {
    product: Product;
    variant?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product,variant="default" }) => {
    const { name } = product;
    
    return (
        <>
            <div
                className={cn("font-semibold text-brand-dark leading-5  line-clamp-2 mt-1 mb-2 cursor-pointer",
                    {
                        "text-sm min-h-[40px]": variant === "default" || variant === "outBorder" || variant === "boxBorder",
                        "text-base ": variant === "todayOffer" || variant === "bestdeal" || variant === "list" ,
                        "text-sm  min-h-[40px]": variant === "furni"
                    })}
            >
                {name}
            </div>
            <div className="flex text-gray-500 space-x-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                        <StarIcon
                            key={idx}
                            color={idx < 5 ? "#F3B81F" : "#DFE6ED"}
                            className="w-3 h-3 mx-px"
                        />
                    ))}
                </div>
                <span className="text-[13px] leading-4">(2 reviews)</span>
            </div>
        </>
    );
};

export default ProductDetails;