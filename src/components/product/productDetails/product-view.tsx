import React, { useRef, useState, useMemo} from "react";
import { Product } from "@/services/types";
import cn from "classnames";
import ProductHeader from "@/components/product/productView/product-header";
import ProductPricing from "@/components/product/productView/product-pricing";
import ProductInfo from "@/components/product/productView/product-info";
import ProductQuantity from "@/components/product/productView/product-quantity";
import ProductActions from "@/components/product/productView/product-actions";
import ProductFooter from "@/components/product/productView/product-footer";
import StickyCart from "@/components/product/productView/sticky-cart";
import useCartActions from "@/hooks/use-cart-actions";

interface ViewProps {
	className?: string;
	data?: Product;
	variant?: string;
	onColorChange?: (color: string) => void; // Simplified callback for color changes
}

const ProductView: React.FC<ViewProps> = ({ data, className, variant, onColorChange }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [isCartVisible, setCartVisible] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<string>('');
	const targetButtonRef = useRef<HTMLButtonElement>(null);

	// Extract available colors from Firebase variation data
	const availableColors = useMemo(() => {
		if (!data?.variation || !Array.isArray(data.variation)) return [];
		return data.variation.map(v => ({ value: v.color, image: v.img }));
	}, [data?.variation]);

	// Create selectedVariation object for cart functionality
	const selectedVariation = useMemo(() => {
		if (!selectedColor || !data?.variation) return undefined;
		
		const matchingVariation = data.variation.find((v: any) => v.color === selectedColor);
		if (matchingVariation) {
			return {
				id: 1,
				title: selectedColor,
				price: matchingVariation.price || data.price,
				sale_price: matchingVariation.price || data.price,
				quantity: matchingVariation.quantity || 0,
				is_disable: matchingVariation.quantity === 0 ? 1 : 0,
				sku: data.sku || '',
				options: [{ name: 'color', value: selectedColor }]
			};
		}
		return undefined;
	}, [selectedColor, data]);

	// Handle color selection
	const handleColorSelect = (color: string) => {
		setSelectedColor(color);
		onColorChange?.(color);
	};

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
			
			{/* Simple Color Selector */}
			{availableColors.length > 0 && (
				<div className="pb-4">
					<h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
					<div className="flex flex-wrap gap-3">
						{availableColors.map((colorOption, index) => (
							<button
								key={index}
								onClick={() => handleColorSelect(colorOption.value)}
								className={cn(
									"w-8 h-8 rounded-full border-2 transition-all duration-200",
									selectedColor === colorOption.value 
										? "border-blue-500 ring-2 ring-blue-200" 
										: "border-gray-300 hover:border-gray-400"
								)}
								style={{ backgroundColor: colorOption.value }}
								title={colorOption.value}
							/>
						))}
					</div>
				</div>
			)}
			
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
				isSelected={true} // Always allow add to cart for now
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
					isSelected={true}
				/>
			)}
		</div>
	);
};

export default ProductView;