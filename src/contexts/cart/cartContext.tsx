// cartContext.tsx
import React from 'react';
import { cartReducer, State, initialState } from './cartReducer';
import {useLocalStorage} from "@/utils/use-local-storage";

interface CartContextValue {
    state: State;
    dispatch: React.Dispatch<any>;
}

export const cartContext = React.createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: React.PropsWithChildren<{}>) {
    const [savedCart, saveCart] = useLocalStorage(
        'umitex-cart',
        JSON.stringify(initialState)
    );

    // Handle potential parsing errors and provide fallback
    let initialCartState: State;
    try {
        initialCartState = savedCart ? JSON.parse(savedCart) : initialState;
    } catch (error) {
        console.error('Error parsing saved cart:', error);
        initialCartState = initialState;
    }

    // Use initialCartState instead of initialState
    const [state, dispatch] = React.useReducer(cartReducer, initialCartState);

    // Save cart to localStorage when state changes
    React.useEffect(() => {
        saveCart(JSON.stringify(state));
    }, [state, saveCart]);

    const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
