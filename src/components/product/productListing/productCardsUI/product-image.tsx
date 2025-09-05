import React, {useMemo} from "react";
import cn from "classnames";
import Image from "@/components/shared/image";
import { Product } from "@/services/types";
import { productPlaceholder } from "@/assets/placeholders";
import { DEFAULT_CURRENCY } from "@/utils/currency";
import SearchIcon from "@/components/icons/search-icon";
import { useModalAction } from "@/components/common/modal/modalContext";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import usePrice from "@/services/product/use-price";

interface ProductImageProps {
    product: Product;
    outOfStock: boolean;
    variant?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, outOfStock,variant="default" }) => {
    const { image, name, sale_price, price } = product;
    const { openModal } = useModalAction();
    const { selectedColor } = usePanel();
    const { discount } = usePrice({
        amount: sale_price ? sale_price : price,
        baseAmount: price,
        currencyCode: DEFAULT_CURRENCY,
    });
    
    const handlePopupView = () => {
        openModal("PRODUCT_VIEW", product);
    };
    
    const imgSize = useMemo(() => {
        switch (variant) {
            case 'todayOffer':
                return 400;
            case 'furni':
                return 330;
            default:
                return 180;
        }
    }, [variant]);
    
    return (
        <div className={cn("relative flex-shrink-0  z-1" )}>
            
            <div className={cn("relative card-img-container overflow-hidden flex  justify-center w-full")
            }>
                <Image
                    src={image?.thumbnail && image.thumbnail.trim() !== "" ? image.thumbnail : productPlaceholder}
                    alt={name || "Product Image"}
                    width={imgSize}
                    height={imgSize}
                />
            </div>
            <div className="w-full h-full absolute top-0 z-10 ">
                {discount && (
                    <span className={cn("font-medium uppercase inline-block rounded-sm leading-4 px-2.5 py-1  ",
                        {
                            "text-[10px] bg-red-600 text-brand-light mx-0.5 sm:mx-1" : variant ==="default" || variant ==="todayOffer"
                                || variant === "outBorder" || variant ==="outBorder-xl" || variant==="list",
                            "text-[11px]  border border-[#ff6128] bg-brand-light text-brand-sale m-4" : variant ==="furni"
                        }
                    )}>
                    On Sale
                    </span>
                )}
                
                {outOfStock ? (
                    <span className={cn("text-[10px] font-medium  uppercase inline-block  rounded-sm px-2.5 py-1 ",
                        {
                            "text-[10px] text-brand-light bg-brand-dark dark:bg-white mx-0.5 sm:mx-1" : variant ==="default" || variant === "outBorder"
                                || variant ==="outBorder-xl"|| variant==="list",
                            "text-[11px]  text-brand-light bg-brand-danger m-4" : variant ==="furni"
                        }
                    )}>
                        Out Stock
                    </span>
                ) : (
                    <button
                        className={cn(
                            colorMap[selectedColor].hoverBg,
                            "buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:text-brand-light"
                        )}
                        aria-label="Quick View Button"
                        onClick={handlePopupView}
                    >
                        <SearchIcon/>
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default ProductImage;