import React from "react";
import { Product } from "@/services/types";
import useProductStatus from "@/hooks/use-product-status";
import CheckIcon from "@/components/icons/check-icon";


interface ProductActionsProps {
    product: Product;
}

const ProductLabelStock: React.FC<ProductActionsProps> = ({
                                                           product,
                                                       }) => {
    const { id, quantity } = product;
    const { outOfStock } = useProductStatus(String(id), quantity);
    
    return (
            <div className="mt-1 font-medium flex items-center space-x-1 text-[12px] ">
                <CheckIcon />
                {outOfStock || quantity < 1 ? (
                    <span> Out Stock</span>
                ) : (
                    <span> In Stock </span>
                )}
            </div>
    );
};

export default ProductLabelStock;