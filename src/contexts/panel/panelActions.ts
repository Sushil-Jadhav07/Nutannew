// usePanelActions.ts
import { useContext, useCallback } from 'react';
import { PanelContext } from './panel.context';

export const useSetSelectedColor = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetSelectedColor must be used within PanelProvider');
    const { dispatch } = context;

    return (color: string) => {
        dispatch({ type: 'SET_COLOR', payload: color });
    };
};

export const useSetSelectedTab = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetSelectedTab must be used within PanelProvider');
    const { dispatch } = context;
    return useCallback((index: number) => {
        dispatch({ type: 'SET_TAB', payload: index });
    }, [dispatch]);
};

export const useSetSelectedLayout = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetSelectedLayout must be used within PanelProvider');
    const { dispatch } = context;
    return useCallback((layout: string) => {
        dispatch({ type: 'SET_LAYOUT', payload: layout });
    }, [dispatch]);
};

export const useSetSelectedFooter = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetSelectedFooter must be used within PanelProvider');
    const { dispatch } = context;
    return useCallback((layout: string) => {
        dispatch({ type: 'SET_FOOTER', payload: layout });
    }, [dispatch]);
};

export const useSetSelectedDirection = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetSelectedDirection must be used within PanelProvider');
    const { dispatch } = context;
    return useCallback((layout: string) => {
        dispatch({ type: 'SET_DIRECTION', payload: layout });
    }, [dispatch]);
};

export const useSetTheme = () => {
    const context = useContext(PanelContext);
    if (!context) throw new Error('useSetTheme must be used within PanelProvider');

    return (newTheme: string) => {
        context.setTheme(newTheme);
    };
};
