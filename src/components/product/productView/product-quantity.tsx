import React from "react";
import { Product, VariationOption } from "@/services/types";
import isEmpty from "lodash/isEmpty";
import Counter from "@/components/shared/counter";

interface ProductQuantityProps {
    data: Product;
    selectedVariation?: VariationOption;
    selectedQuantity: number;
    setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>;
    isInCart: (id: string) => boolean;
    isInStock: (id: string) => boolean;
    getItemFromCart: (id: string) => any;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
                                                             data,
                                                             selectedVariation,
                                                             selectedQuantity,
                                                             setSelectedQuantity,
                                                             isInCart,
                                                             isInStock,
                                                             getItemFromCart,
                                                         }) => {
    const variations = data.variations;
    const hasFirebaseVariations = data.variation_options && Array.isArray(data.variation_options) && data.variation_options.length > 0;
    
    // Ensure itemId is a string by using toString() or type assertion
    const itemId = (selectedVariation ? selectedVariation.id : data.id).toString();
    const outOfStock = isInCart(itemId) && !isInStock(itemId);
    
    // Get available quantity based on Firebase variations or fallback to data.quantity
    const getAvailableQuantity = (): number => {
        if (hasFirebaseVariations && selectedVariation) {
            // Find the matching Firebase variation
            const firebaseVariation = data.variation_options?.find(v => {
                if (selectedVariation.options) {
                    return selectedVariation.options.every(opt => {
                        if (opt.name === 'color') return v.color === opt.value;
                        if (opt.name === 'size') return v.options?.some(sizeOpt => sizeOpt.value === opt.value);
                        return true;
                    });
                }
                return false;
            });
            
            // Use the variation array quantity directly from Firebase
            if (firebaseVariation && typeof firebaseVariation.quantity === 'number') {
                return firebaseVariation.quantity;
            } else if (firebaseVariation && typeof firebaseVariation.quantity === 'string') {
                return Number(firebaseVariation.quantity) || 0;
            }
            
            return 0;
        }
        return Number(data.quantity) || 0;
    };
    
    const availableQuantity = getAvailableQuantity();

    return (
        <div className="pb-2">
            {isEmpty(variations) && !hasFirebaseVariations && (
                <>
                    {availableQuantity > 0 || !outOfStock ? (
                        <span className="text-sm text-yellow">
              {`There are ${availableQuantity} pieces still available.`}
            </span>
                    ) : (
                        <div className="text-base text-brand-danger whitespace-nowrap">Out Stock</div>
                    )}
                </>
            )}
            {!isEmpty(selectedVariation) && (
                <span className="text-sm text-yellow">
          {selectedVariation?.is_disable || availableQuantity === 0
              ? "Out Stock"
              : `There are ${availableQuantity} pieces still available.`}
        </span>
            )}
            <div className="pt-1.5 lg:pt-3 xl:pt-5 space-y-2.5 md:space-y-3.5">
                <label className="font-medium text-sm text-brand-dark mb-1.5 inline-block">Quantity:</label>
                <Counter
                    variant="single"
                    value={selectedQuantity}
                    onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                    onDecrement={() => setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
                    disabled={
                        isInCart(itemId)
                            ? (getItemFromCart(itemId)?.quantity ?? 0) + selectedQuantity >= availableQuantity
                            : selectedQuantity >= availableQuantity
                    }
                />
            </div>
        </div>
    );
};

export default ProductQuantity;