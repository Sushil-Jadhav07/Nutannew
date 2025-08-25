import React from "react";
import cn from "classnames";
import { Product } from "@/services/types";
import Link from "@/components/shared/link";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import useProductStatus from "@/hooks/use-product-status";
import BtnRemoveWishlist from "@/components/product/productListing/productCardsUI/btn-remove-wishlist";
import ProductLabelStock from "@/components/product/productListing/productCardsUI/product-label-stock";

interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
    removeWishlist?: (id: string) => void;
}

const ProductCardBorder: React.FC<ProductProps> = ({
                                                 product,
                                                 className,
                                                 variant = "default",
                                                 removeWishlist,
                                             }) => {
    const { id, quantity } = product;
    const { outOfStock } = useProductStatus(String(id), quantity);
    
    return (
        <Link to={`/products/${product.id}`} className="block">
            <article
                className={cn(
                    "flex flex-col gap-2 product-card relative p-2 sm:p-4  h-full  bg-white box-border cursor-pointer",
                    removeWishlist && "border border-border-two rounded",
                    className,
                    outOfStock ? "card-image--nojump" : "card-image--jump",
                    {
                        'border border-border-two rounded': variant === 'outBorder' ,
                        'border border-border-two rounded-xl': variant === 'outBorder-xl' ,
                        'rounded': variant === 'default' ,
                    }
                )}
            >
                <BtnRemoveWishlist product={product} removeWishlist={removeWishlist} />
                <ProductImage product={product} outOfStock={outOfStock}  />
                <div className="flex flex-col h-full overflow-hidden relative product-cart-content  bg-white/90 ">
                    <ProductDetails product={product}/>
                    <ProductPricing product={product}/>
                    <ProductLabelStock product={product}/>
                    <ProductActions product={product}/>
                </div>
            </article>
        </Link>
    );
};

export default ProductCardBorder;