// useUI.ts
import { useContext } from 'react';
import { UIContext } from './ui/uiContext';

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
