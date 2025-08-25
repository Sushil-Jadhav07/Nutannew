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

const ProductCard: React.FC<ProductProps> = ({
                                                 product,
                                                 className,
                                                 variant = "default",
                                                 removeWishlist,
                                             }) => {
    const { id, quantity } = product;
    const { outOfStock } = useProductStatus(String(id), quantity);

    return (
        
            <article
                className={cn(
                    'flex flex-col gap-2 product-card  p-3 md:p-4  h-full  bg-white relative z-1 cursor-pointer',
                    removeWishlist && "border border-border-two rounded",
                    className,
                    outOfStock ? "card-image--nojump" : "card-image--jump",
                    {
                        "hover:drop-shadow-cardhori hover:z-50": variant === "boxBorder",
                        'rounded': variant === 'default',
                    }
                )}
            >
                <BtnRemoveWishlist product={product} removeWishlist={removeWishlist} />
                <ProductImage product={product} outOfStock={outOfStock}  />
                <div className="flex flex-col h-full overflow-hidden relative product-cart-content bg-white/90 ">
                <Link to={`/products/${product.id}`} className="block">
                    <ProductDetails product={product} variant={variant}/>
                </Link>
                    <ProductPricing product={product} variant={variant}/>
                    <ProductLabelStock product={product}/>
                    <ProductActions product={product}  />
                </div>
            </article>
    );
};

export default ProductCard;