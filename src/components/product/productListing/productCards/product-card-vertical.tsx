import React from "react";
import cn from 'classnames';
import {Product} from '@/services/types';
import Link from "@/components/shared/link";
import ProductDetails from "@/components/product/productListing/productCardsUI/product-details";
import ProductPricing from "@/components/product/productListing/productCardsUI/product-pricing";
import useProductStatus from "@/hooks/use-product-status";
import ProductLabelStock from "@/components/product/productListing/productCardsUI/product-label-stock";
import ProductImage from "@/components/product/productListing/productCardsUI/product-image";

interface ProductProps {
	product: Product;
	className?: string;
	variant?: string;
}

const ProductCardVertical: React.FC<ProductProps> = ({
	                                                     product,
	                                                     className,
	                                                     }) => {
	const {  id, quantity } = product ?? {};
	const { outOfStock } = useProductStatus(String(id), quantity);
	return (
		<article
				className={cn(
					'flex flex-col xl:flex-row items-center w-full gap-8 product-card relative  p-2 sm:p-4  h-full rounded bg-white cursor-pointer',
					className,
					outOfStock ? "card-image--nojump" : "card-image--jump",
				)}
			>
				<ProductImage product={product} outOfStock={outOfStock}  />
				
				<div className="flex flex-col h-full overflow-hidden relative product-card-content">
					<Link to={`/products/${product.id}`} className="block">
					<ProductDetails product={product}/>
					</Link>
					<ProductPricing product={product}/>
					<ProductLabelStock product={product}/>
				</div>
			</article>
	);
};

export default ProductCardVertical;
