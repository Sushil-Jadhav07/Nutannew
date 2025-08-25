import cn from 'classnames';
import {Product} from '@/services/types';
import React from "react";
import Link from "@/components/shared/link";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import useProductStatus from "@/hooks/use-product-status";


interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
}


const ProductCardFurni: React.FC<ProductProps> = ({product, className, variant="furni"}) => {
    const {id, quantity} = product ?? {};

    // Use new hooks
    const { outOfStock } = useProductStatus(String(id), quantity);
  
    return (
        <Link to={`/products/${product.id}`} className="block">
            <article
                className={cn(
                    'flex flex-col gap-3 product-card-v2 relative p-1 sm:p-2  h-full  bg-white cursor-pointer',
                    className,
                    Number(quantity) < 1 || outOfStock ? 'card-image--nojump' : 'card-image--zoom ', {
                        'rounded': variant === 'default',
                    }
                )}
            >
                
                <div className="relative flex-shrink-0 overflow-hidden">
                    <ProductImage product={product} outOfStock={outOfStock}  variant={variant}  />
                    <ProductActions product={product} variant={variant} />
                </div>

                <div className="flex flex-col h-full overflow-hidden  relative">
                    <ProductDetails product={product} variant={variant}/>
                    <ProductPricing product={product} variant={variant}/>
                </div>
            </article>
        </Link>
    );
};

export default ProductCardFurni;
