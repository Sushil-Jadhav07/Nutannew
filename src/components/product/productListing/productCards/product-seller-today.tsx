import cn from 'classnames';
import {Product} from '@/services/types';
import ProgressCard from '@/components/shared/progress-card';
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import React from "react";
import useProductStatus from "@/hooks/use-product-status";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductCountdownTimer from "@/components/shared/productCountdownTimer";

interface ProductProps {
    product: Product;
    className?: string;
    date: string | number | Date;
    variant?: string;
}


const ProductSellerToday: React.FC<ProductProps> = ({
                                                          product,
                                                          className,
                                                          variant="todayOffer",
                                                          date
                                                      }) => {
    const { id, sold,  quantity} = product  ;
    const { outOfStock } = useProductStatus(String(id), quantity);

    return (
        <article
            className={cn(
                'flex flex-col justify-between group product-card relative px-5 l pt-5 pb-5 card-image--nojump',
                className,
            )}
        >
            <ProductImage product={product} outOfStock={outOfStock} variant={variant}  />

            <div className="flex flex-col h-full overflow-hidden relative product-cart-content bg-white/90 ">
                <ProductDetails product={product} variant={variant} />
                <ProductPricing product={product} variant={variant} />
                <ProductCountdownTimer date={date} />
                <ProgressCard soldProduct={sold} totalProduct={quantity} className="pt-3 lg:pt-5" />
            </div>
        </article>
    );
};

export default ProductSellerToday;
