import { useIsInCart, useIsInStock } from "@/contexts/cart/cartActions";

const useProductStatus = (id: string, quantity: number) => {
    const isInCart = useIsInCart();
    const isInStock = useIsInStock();
    
    const outOfStock = isInCart(id) && !isInStock(id);
    
    return {
        outOfStock: outOfStock || quantity < 1,
    };
};

export default useProductStatus;