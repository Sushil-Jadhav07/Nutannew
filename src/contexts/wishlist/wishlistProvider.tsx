import React, {useReducer, useEffect, useMemo} from "react";
import { wishlistContext } from "./wishlistContext";
import { wishlistReducer } from "./wishlistReducer";
import {Product} from "@/services/types";
import {WishlistContextType} from "@/contexts/wishlist/types";


const initialState: Product[] =  JSON.parse(localStorage.getItem("wishlists") || "[]");

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistList, dispatch] = useReducer(wishlistReducer, initialState);
  

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("wishlists", JSON.stringify(wishlistList));
        }
        if (!wishlistList) {
            throw new Error('Hook must be used within Provider');
        }
    }, [wishlistList]);

    const value: WishlistContextType = useMemo(() => ({ wishlistList, dispatch }), [wishlistList, dispatch]);

    return (
        <wishlistContext.Provider value={value}>
            {children}
        </wishlistContext.Provider>
    );
};