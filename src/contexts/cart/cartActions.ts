// useCartActions.ts
import { useContext, useCallback } from 'react';
import { cartContext } from '@/contexts/cart/cartContext';
import { Item } from './cartUtils';

export const useAddToCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useAddToCart must be used within CartProvider');
    const { dispatch } = context;
    return useCallback((item: Item, quantity: number) => {
        dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
    }, [dispatch]);
};

export const useIsInCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useIsInCart must be used within CartProvider');
    return (id: Item['id']) => {
        return !!context.state.items.find((i) => i.id === id);
    };
};

export const useIsInStock = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useIsInStock must be used within CartProvider');
    return useCallback((id: Item['id']) => {
        const item = context.state.items.find((i) => i.id === id);
        return !!item && typeof item.quantity === 'number' && item.quantity > 0;
    }, [context.state.items]);
};

export const useRemoveFromCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useRemoveFromCart must be used within CartProvider');

    const { dispatch } = context;
    return useCallback((id: Item['id']) => {
        dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
    }, [dispatch]);
};

export const useClearItemFromCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useClearItemFromCart must be used within CartProvider');

    const { dispatch } = context;
    return useCallback((id: Item['id']) => {
        dispatch({ type: 'REMOVE_ITEM', id });
    }, [dispatch]);
};

export const useResetCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useResetCart must be used within CartProvider');

    const { dispatch } = context;
    return useCallback(() => {
        dispatch({ type: 'RESET_CART' });
    }, [dispatch]);
};

export const useGetItemFromCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useGetItemFromCart must be used within CartProvider');
    return useCallback((id: Item['id']) => {
        return context.state.items.find((i) => i.id === id);
    }, [context.state.items]);
};