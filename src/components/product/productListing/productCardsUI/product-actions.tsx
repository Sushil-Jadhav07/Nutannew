import React from "react";
import { Product } from "@/services/types";
import useProductStatus from "@/hooks/use-product-status";
import cn from "classnames";

const AddToCart =  React.lazy(() => import("@/components/product/add-to-cart"));

interface ProductActionsProps {
    product: Product;
    variant?: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
                                                           product,
                                                           variant="mercury"
                                                       }) => {
    const { id, product_type, quantity } = product;
    const { outOfStock } = useProductStatus(String(id), quantity);
    
    return (
            <div className={cn("product-cart-button flex justify-center",
                {
                    "px-2 lg:px-4 box-border" : variant ==="furni"
                }
                )}>
                {outOfStock || quantity < 1 ? null : product_type === "variable" ? (
                    <div className={cn("inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer",
                        {
                            "px-2 lg:px-4 box-border" : variant ==="furni"
                        }
                    )}>
                        Choose Options
                    </div>
                ) : (
                    <AddToCart data={product} variant={variant} />
                )}
            </div>
    );
};

export default ProductActions;