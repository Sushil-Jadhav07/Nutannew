import cn from 'classnames';
import {Product} from '@/services/types';
import ProgressCard from '@/components/shared/progress-card';
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";
import React from "react";
import useProductStatus from "@/hooks/use-product-status";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import ProductActions from "@/components/product/productListing/productCardsUI/product-actions";

interface ProductProps {
	product: Product;
	className?: string;
	date?: string | number | Date;
	variant?: string;
}


const ProductBestDealsCard: React.FC<ProductProps> = ({
	                                                      product,
	                                                      className,
														  variant,
                                                      }) => {
	const { id, sold,  quantity} = product ;
	const { outOfStock } = useProductStatus(String(id), quantity);
	
	return (
		<article
			className={cn(
				'flex flex-col gap-2 product-card relative  p-2 sm:p-4  h-full rounded bg-white',
				className,
				outOfStock ? 'card-image--nojump': 'card-image--jump',
				{   'border border-border-two ' : variant ==='outBorder',
					'border border-border-two rounded-xl': variant === 'outBorder-xl'}

			)}
		>
			<ProductImage product={product} outOfStock={outOfStock} variant={variant}  />
			
			<div className="flex flex-col h-full overflow-hidden relative product-cart-content bg-white/90 ">
				<ProductDetails product={product}  />
				<ProductPricing product={product}  />
				<ProgressCard soldProduct={sold} totalProduct={quantity} />
				<ProductActions product={product}  />
			</div>
		</article>
	);
};

export default ProductBestDealsCard;
