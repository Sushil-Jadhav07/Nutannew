import { TableCell, TableRow } from "@/components/shared/table"
import { useAddToCart, useIsInStock,useRemoveFromCart,useClearItemFromCart } from '@/contexts/cart/cartActions';
import usePrice from "@/services/product/use-price";
import Counter from "@/components/shared/counter";
import {ROUTES} from "@/utils/routes";
import Link from "@/components/shared/link";
import Image from '@/components/shared/image';
import {Item} from "@/contexts/cart/cartUtils";
import { DEFAULT_CURRENCY } from "@/utils/currency";

interface CartItemProps {
	item: Item
}

export function CartItem({ item }: CartItemProps) {
	const {id,name, image, quantity, slug, product_type} = item ?? {};

    // Use new hooks
    const addItemToCart = useAddToCart();
    const isInStock = useIsInStock();
    const removeItemFromCart = useRemoveFromCart();
    const clearItemFromCart = useClearItemFromCart();

	const {price, basePrice} = usePrice({
		amount: item?.sale_price ? item?.sale_price : item?.price,
		baseAmount: item?.price,
		currencyCode: DEFAULT_CURRENCY
	});
	
	const {price: minPrice} = usePrice({
		amount: item?.min_price ?? 0,
		currencyCode: DEFAULT_CURRENCY,
	});
	const {price: maxPrice} = usePrice({
		amount: item?.max_price ?? 0,
		currencyCode: DEFAULT_CURRENCY,
	});
	
	const {price: totalPrice} = usePrice({
		amount: item?.itemTotal,
		currencyCode: DEFAULT_CURRENCY,
	});
	const outOfStock = !isInStock(item.id);
	
	return (
		<TableRow>
			<TableCell>
				<div className="w-20 h-20 relative">
                    <Link
                    to={`${ROUTES.PRODUCT}/${slug}`}
                    className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
                    >
                        <Image
						src={image}
						width={80}
						height={80}
						alt={name || 'Product Image'}
						className="object-contain" />
                    </Link>
				</div>
			</TableCell>
			<TableCell>
				    <Link
                        to={`${ROUTES.PRODUCT}/${slug}`}
                        className="block leading-5 transition-all text-brand-dark text-sm lg:text-15px hover:text-brand"
                    >
                        <div className="flex flex-col gap-1">
                            <span>{item?.name}</span>
                            {/* Show color name and circle if the item has color variation */}
                            {item?.color && (
                                <div className="flex items-center gap-2">
                                    <span
                                        className="inline-block w-4 h-4 rounded-full border border-brand-dark/10"
                                        style={{ backgroundColor: item.color.toLowerCase() }}
                                    />
                                    <span className="text-xs text-gray-600">
                                        {item?.colorDisplayName || item?.colorName || item.color}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>

                   
                    <div
                        onClick={() => clearItemFromCart(id)}
                        className="mt-1 inline-block cursor-pointer transition-all text-gray-500 text-13px underline"
                    >
                        Remove
                    </div>
			</TableCell>
			<TableCell>
				<div className="space-s-2  mt-2 block mb-2">
					<span className="inline-block font-semibold ">
					  {product_type === 'variable'
						  ? `${minPrice} - ${maxPrice}`
						  : price}
					</span>
					{basePrice && (
						<del className="mx-1  text-gray-400 text-opacity-70">
							{basePrice}
						</del>
					)}
				</div>
			</TableCell>
			<TableCell>
				<Counter
					value={quantity}
					onIncrement={() => addItemToCart(item, 1)}
					onDecrement={() => removeItemFromCart(id)}
					variant="cart"
					disabled={outOfStock}
				/>
			</TableCell>
			<TableCell>
				<div className=" font-semibold text-brand-dark mt-2 block mb-2">
					{totalPrice}
				</div>
			</TableCell>
		</TableRow>
	)
}

