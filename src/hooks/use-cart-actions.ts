import { useState } from "react";
import {Product, VariationOption} from "@/services/types";
import { constructCartItem } from "@/utils/construct-cart-item";
import { useAddToCart, useGetItemFromCart, useIsInCart, useIsInStock } from "@/contexts/cart/cartActions";
import { useUI } from "@/contexts/useUI";

const useCartActions = (data?: Product, selectedVariation?: VariationOption, selectedQuantity: number = 1) => {
    const addItemToCart = useAddToCart();
    const isInCart = useIsInCart();
    const isInStock = useIsInStock();
    const getItemFromCart = useGetItemFromCart();
    const { openDrawer, setDrawerView } = useUI();
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

    const addToCart = () => {
        if (!data) return;
        setAddToCartLoader(true);
        setTimeout(() => {
            setAddToCartLoader(false);
        }, 1500);

        // Only call constructCartItem with selectedVariation if it exists
        const item = constructCartItem(data, selectedVariation as VariationOption);
        addItemToCart(item, selectedQuantity);
        
        // Open cart sidebar after adding item
        setDrawerView('CART_SIDEBAR');
        openDrawer();
    };

    return {
        addToCart,
        addToCartLoader,
        isInCart,
        isInStock,
        getItemFromCart,
    };
};

export default useCartActions;