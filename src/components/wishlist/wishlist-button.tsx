import cn from 'classnames';
import {useWishlist} from "@/contexts/useWishlist";
import {Heart, Trash2} from "lucide-react";
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import {Tooltip} from "@/components/shared/tooltip";
import {useAddToWishlist, useRemoveFromWishlist} from '@/contexts/wishlist/wishlistActions';

interface Props {
    product : any;
    className?: string;
};

const WishlistButton: React.FC<Props> = ({product, className}) => {
    const wishlistList = useWishlist(); // this is just the array of products
    const addToWishlist = useAddToWishlist();
    const removeFromWishlist = useRemoveFromWishlist();

    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);
    const btnWishlist = isWishlist(product?.id);
    const wishlistStatus = btnWishlist === true ? 'Remove Wishlist' : 'Added to Wishlist';
    const { selectedColor } = usePanel();
    return (
        <>
            <Tooltip content={wishlistStatus} className={"min-w-36 "}>
            {btnWishlist ? (
                <button
                    onClick={() => {
                    removeFromWishlist(product?.id);
                }}
                    className={cn('bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3  w-full flex justify-center rounded-md h-full',className)}>
                    <Trash2 size={20} strokeWidth={2} />
                </button>
            ) : (
                <button
                    onClick={() => {
                        addToWishlist(product);
                    }}
                    className={cn('bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3  h-full  w-full flex justify-center rounded-md hover:text-white',className,colorMap[selectedColor].hoverBg)}>
                    <Heart size={20} strokeWidth={1} />
                </button>
            )}
            </Tooltip>
        </>
    );
}
export default WishlistButton;
