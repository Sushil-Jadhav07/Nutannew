// useWishlistActions.ts
import { useContext, useCallback } from 'react';
import { wishlistContext } from './wishlistContext';
import { Product } from '@/services/types';

export const useAddToWishlist = () => {
    const context = useContext(wishlistContext);
    if (!context) throw new Error('useAddToWishlist must be used within WishlistProvider');
    const { dispatch } = context;
    return useCallback((product: Product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', product });
    }, [dispatch]);
};

export const useRemoveFromWishlist = () => {
    const context = useContext(wishlistContext);
    if (!context) throw new Error('useRemoveFromWishlist must be used within WishlistProvider');
    const { dispatch } = context;
    return useCallback((productId: string) => {
        dispatch({ type: 'REMOVE_WISHLIST', productId });
    }, [dispatch]);
};

export const useClearWishlist = () => {
    const context = useContext(wishlistContext);
    if (!context) throw new Error('useClearWishlist must be used within WishlistProvider');
    const { dispatch } = context;
    return useCallback(() => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    }, [dispatch]);
};
