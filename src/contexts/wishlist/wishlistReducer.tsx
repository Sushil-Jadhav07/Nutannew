import {Product} from "@/services/types";

export type Action =
    | { type: "ADD_TO_WISHLIST"; product: Product }
    | { type: "REMOVE_WISHLIST"; productId: string }
    | { type: "CLEAR_WISHLIST" };


export const wishlistReducer = (state: Product[], action: Action): Product[] => {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        return [...state, action.product];
      case "REMOVE_WISHLIST":
        return state.filter((product) => product.id !== action.productId);
      case "CLEAR_WISHLIST":
        return [];
      default:
        return state;
    }
};