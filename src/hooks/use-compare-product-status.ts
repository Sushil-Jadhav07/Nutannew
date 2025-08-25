import { useIsInCart, useIsInStock } from "@/contexts/cart/cartActions";
import { Product } from "@/services/types";

interface Variation {
    attribute: { slug: string };
    value: string;
}

const useCompareProductStatus = (product: Product) => {
    const { id, quantity, variation_options, variations } = product;
    const isInCart = useIsInCart();
    const isInStock = useIsInStock();

    const outOfStock = isInCart(id) && !isInStock(id);

    const isInStockStatus = () => {
        if (quantity > 0) return true;
        if (variation_options && variation_options.length > 0) {
            return variation_options.some((v) => Number.parseInt(v.quantity) > 0);
        }
        return false;
    };

    const getStorageOptions = () => {
        if (
            variations?.some((v: Variation) => v.attribute.slug === "memory-storage")
        ) {
            return variations
                .filter((v: Variation) => v.attribute.slug === "memory-storage")
                .map((v: Variation) => v.value)
                .join(", ");
        }
        return "-";
    };

    return {
        outOfStock: outOfStock || quantity < 1,
        isInStock: isInStockStatus(),
        storageOptions: getStorageOptions(),
    };
};

export default useCompareProductStatus;