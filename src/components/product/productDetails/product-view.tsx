import React, { useRef, useState, useMemo} from "react";
import { Product } from "@/services/types";
import cn from "classnames";
import ProductHeader from "@/components/product/productView/product-header";
import ProductPricing from "@/components/product/productView/product-pricing";
import ProductQuantity from "@/components/product/productView/product-quantity";
import ProductActions from "@/components/product/productView/product-actions";
import ProductFooter from "@/components/product/productView/product-footer";
import StickyCart from "@/components/product/productView/sticky-cart";
import useCartActions from "@/hooks/use-cart-actions";
import { getEnhancedVariationDisplayName, createColorInfo } from "@/utils/color-utils";

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

	// Extract available colors from Firebase variation data with color names
	const availableColors = useMemo(() => {
		if (!data?.variation || !Array.isArray(data.variation)) return [];
		return data.variation.map(v => ({ 
			value: v.color, 
			image: v.img,
			colorName: v.colorName,
			displayName: getEnhancedVariationDisplayName(v, data?.name)
		}));
	}, [data?.variation, data?.name]);

	// Create selectedVariation object for cart functionality
	const selectedVariation = useMemo(() => {
		if (!selectedColor || !data?.variation) return undefined;
		
		const matchingVariation = data.variation.find((v: any) => v.color === selectedColor);
		if (matchingVariation) {
			const colorInfo = createColorInfo(matchingVariation.color, matchingVariation.colorName);
			return {
				id: 1,
				title: colorInfo.displayName, // Use display name instead of hex
				price: matchingVariation.price || data.price,
				sale_price: matchingVariation.price || data.price,
				quantity: matchingVariation.quantity || 0,
				is_disable: matchingVariation.quantity === 0 ? 1 : 0,
				sku: data.sku || '',
				options: [{ 
					name: 'color', 
					value: selectedColor, 
					displayValue: colorInfo.displayName,
					colorInfo: colorInfo // Store complete color info for cart
				}]
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
			
			{/* Color Selector with Names */}
			{availableColors.length > 0 && (
				<div className="pb-4">
					<div className="flex items-center gap-2 mb-3">
						<h3 className="text-sm font-medium text-gray-900">Color:</h3>
						{selectedColor && (
							<span className="text-sm text-gray-600 font-medium">
								{availableColors.find(c => c.value === selectedColor)?.displayName || selectedColor}
							</span>
						)}
					</div>
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
							>
							</button>
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