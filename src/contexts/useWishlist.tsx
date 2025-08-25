import { useContext } from "react";
import { wishlistContext } from "./wishlist/wishlistContext";

export const useWishlist = () => {
    const context = useContext(wishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context.wishlistList;
};