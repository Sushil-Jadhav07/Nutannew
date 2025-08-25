// useCart.ts
import { useContext } from 'react';
import { cartContext } from '@/contexts/cart/cartContext';

export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context.state;
};
