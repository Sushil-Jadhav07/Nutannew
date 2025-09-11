

import { useAddToCart, useIsInCart, useIsInStock } from '@/contexts/cart/cartActions';
import {constructCartItem} from '@/utils/construct-cart-item';
import {ImSpinner2} from "react-icons/im";
import {useState} from "react";
import cn from "classnames";
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import {useUI} from "@/contexts/useUI";

interface Props {
	data: any;
	variation?: any;
	disabled?: boolean;
	className?: string;
	variant?: string;
}

const AddToCart = ({
	                   data,
	                   variation,
	                   disabled,
					   className,
	                   variant = 'mercury',
                   }: Props) => {
	
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

    // Use new hooks
    const addItemToCart = useAddToCart();
    const isInCart = useIsInCart();
    const isInStock = useIsInStock();
    const { openDrawer, setDrawerView } = useUI();

    // Get cart item
	const item = constructCartItem(data!, variation);

	const handleAddClick = (
		e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
	) => {
		e.stopPropagation();
		addItemToCart(item, 1);
		
		// Open cart sidebar after adding item
		setDrawerView('CART_SIDEBAR');
		openDrawer();
		
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
		}, 1500);
	};
	
	const outOfStock = isInCart(item?.id) && !isInStock(item.id);
	const { selectedColor } = usePanel();
	return (
		<button
			className={cn(
				"w-full min-w-[150px] flex px-4 py-2  relative leading-6 font-semibold text-brand-light rounded-full text-[13px] items-center justify-center transition-all ",
				className,
				{
					'sm:text-white/30': addToCartLoader,
					[`bg-brand-dark dark:bg-white xs:rounded ${colorMap[selectedColor].hoverBg}`]: variant === 'furni',
					'bg-brand-dark xs:rounded-md hover:bg-gray-800': variant === 'dark',
					[`${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`]: variant === 'mercury',
				}
			)}
			aria-label="Count Button"
			onClick={handleAddClick}
			disabled={disabled || outOfStock}
		>
			Add To Cart
			{addToCartLoader && (
				<ImSpinner2 className="w-5 h-5 animate-spin  absolute  text-white "/>
			)}
		</button>
	)
};

export default AddToCart;
