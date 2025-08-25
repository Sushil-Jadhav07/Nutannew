import React, { useRef, useState} from "react";
import { Product } from "@/services/types";
import cn from "classnames";
import ProductHeader from "@/components/product/productView/product-header";
import ProductPricing from "@/components/product/productView/product-pricing";
import ProductInfo from "@/components/product/productView/product-info";
import ProductQuantity from "@/components/product/productView/product-quantity";
import ProductActions from "@/components/product/productView/product-actions";
import ProductFooter from "@/components/product/productView/product-footer";
import StickyCart from "@/components/product/productView/sticky-cart";
import useProductVariations from "@/hooks/use-product-variations";
import useCartActions from "@/hooks/use-cart-actions";
import ProductAttributes from "@/components/product/productView/product-attributes";

interface ViewProps {
	className?: string;
	data?: Product;
	variant?: string;
	onVariationChange?: (variation: any) => void; // Add callback prop
}

const ProductView: React.FC<ViewProps> = ({ data, className, variant, onVariationChange }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [isCartVisible, setCartVisible] = useState<boolean>(false);
	const targetButtonRef = useRef<HTMLButtonElement>(null);

	const { attributes, setAttributes,variations, selectedVariation, isSelected, errorAttributes } =
		useProductVariations(data);

	// Call the callback when selectedVariation changes
	React.useEffect(() => {
		if (onVariationChange && selectedVariation) {
			onVariationChange(selectedVariation);
		}
	}, [selectedVariation, onVariationChange]);

	const { addToCart, addToCartLoader, isInStock, isInCart, getItemFromCart } = useCartActions(
		data,
		selectedVariation,
		selectedQuantity
	);

	if (!data) return null;


	return (
		<div className={cn("flex flex-col shrink-0", className)}>
			<ProductHeader data={data} />
			<ProductPricing data={data} selectedVariation={selectedVariation} />
			{variant !=='quickview' && <ProductInfo data={data} />}
			<ProductAttributes
				variations={variations}
				attributes={attributes}
				setAttributes={setAttributes}
				error={!!errorAttributes}
			/>
			<ProductQuantity
				data={data}
				selectedVariation={selectedVariation}
				selectedQuantity={selectedQuantity}
				setSelectedQuantity={setSelectedQuantity}
				isInCart={isInCart}
				isInStock={isInStock}
				getItemFromCart={getItemFromCart}
			/>
			<ProductActions
				data={data}
				addToCart={addToCart}
				addToCartLoader={addToCartLoader}
				isSelected={isSelected}
				targetButtonRef={targetButtonRef}
			/>
			<ProductFooter />
			{/* Only show StickyCart when not in quickview mode */}
			{variant !== 'quickview' && (
				<StickyCart
					product={data}
					addToCartLoader={addToCartLoader}
					handleAddToCart={addToCart}
					isCartVisible={isCartVisible}
					setCartVisible={setCartVisible}
					targetButtonRef={targetButtonRef}
					isSelected={isSelected}
				/>
			)}
		</div>
	);
};

export default ProductView;