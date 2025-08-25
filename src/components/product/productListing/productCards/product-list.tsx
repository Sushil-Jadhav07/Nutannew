import cn from 'classnames';
import {Product} from '@/services/types';

import React from "react";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import useProductStatus from "@/hooks/use-product-status";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";


interface ProductProps {
    product: Product;
    className?: string;
    variant?: string;
}

const ProductCardList: React.FC<ProductProps> = ({product, className,variant = "list",}) => {
    const { id, quantity, description} = product ?? {};
    const { outOfStock } = useProductStatus(String(id), quantity);
    
    return (
        <article
            className={cn(
                'product-list-view  overflow-hidden relative  grid grid-cols-4  p-2 lg:p-5  gap-4 lg:gap-8 bg-white rounded ',
                className
            )}
        >
            <div className="col-span-1 relative">
                <ProductImage product={product} outOfStock={outOfStock} variant={variant} />
            </div>
            
            <div className="col-span-3">
                <ProductDetails product={product} variant={variant}/>
               
                <ProductPricing product={product} variant={variant} />
                
                <p className="hidden lg:block text-sm text-skin-base line-clamp-3 leading-7 opacity-80">
                    {description}
                </p>
                
                <div className="inline-block   lg:mt-6">
                    <ProductActions product={product}  />
                </div>
            </div>
           
        </article>
    );
};

export default ProductCardList;
