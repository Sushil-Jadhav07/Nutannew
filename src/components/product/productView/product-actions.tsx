import React from "react";
import { Product } from "@/services/types";
import Button from "@/components/shared/button";
import CartIcon from "@/components/icons/cart-icon";
import WishlistButton from "@/components/wishlist/wishlist-button";
import CompareButton from "@/components/compare/compare-button";
import PaypalIconLabel from "@/components/icons/payment/paypal-text";

interface ProductActionsProps {
    data: Product;
    addToCart: () => void;
    addToCartLoader: boolean;
    isSelected: boolean;
    targetButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const ProductActions: React.FC<ProductActionsProps> = ({
                                                           data,
                                                           addToCart,
                                                           addToCartLoader,
                                                           isSelected,
                                                           targetButtonRef,
                                                       }) => {
    return (
        <div className=" space-y-2.5 md:space-y-3.5">
            <div className="flex flex-col md:flex-row gap-2.5 mt-8" data-product-attribute>
                <Button
                    ref={targetButtonRef}
                    variant="dark"
                    onClick={addToCart}
                    className="flex-auto px-1.5"
                    loading={addToCartLoader}
                    disabled={!isSelected}
                >
                    <CartIcon width={18} className="text-white ltr:mr-3 rtl:ml-3" />
                    Add to cart
                </Button>
                <div className="grid grid-cols-2 gap-2.5 lg:w-[140px]">
                    <WishlistButton product={data} />
                    <CompareButton product={data} />
                </div>
            </div>
            <Button variant="paypal" className="gap-2">
                Pay with <PaypalIconLabel />
            </Button>
        </div>
    );
};

export default ProductActions;