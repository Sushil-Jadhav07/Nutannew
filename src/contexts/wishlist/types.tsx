import { Product } from "@/services/types";
import { Dispatch } from "react";
import { Action } from "./wishlistReducer";  // you will export this!

export interface WishlistContextType {
    wishlistList: Product[];
    dispatch: Dispatch<Action>;
}
