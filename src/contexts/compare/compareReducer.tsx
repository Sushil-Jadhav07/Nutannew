import {Product} from "@/services/types";

export type Action =
  | { type: "ADD_TO_COMPARE"; product: Product }
  | { type: "REMOVE_COMPARE"; productId: number }
  | { type: "CLEAR_COMPARE" };
  
export const compareReducer = (state: Product[], action: Action): Product[] => {
    switch (action.type) {
      case "ADD_TO_COMPARE":
        return [...state, action.product];
      case "REMOVE_COMPARE":
        return state.filter((product) => product.id !== action.productId);
      case "CLEAR_COMPARE":
        return [];
      default:
        return state;
    }
};