// useCompareActions.ts
import { useContext, useCallback } from 'react';
import { CompareContext } from './compareContext';
import { Product } from '@/services/types';

export const useAddToCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useAddToCompare must be used within CompareProvider');
    const { dispatch } = context;
    return useCallback((product: Product) => {
        dispatch({ type: 'ADD_TO_COMPARE', product });
    }, [dispatch]);
};

export const useRemoveFromCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useRemoveFromCompare must be used within CompareProvider');
    const { dispatch } = context;
    return useCallback((productId: number) => {
        dispatch({ type: 'REMOVE_COMPARE', productId });
    }, [dispatch]);
};

export const useClearCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useClearCompare must be used within CompareProvider');
    const { dispatch } = context;
    return useCallback(() => {
        dispatch({ type: 'CLEAR_COMPARE' });
    }, [dispatch]);
};
