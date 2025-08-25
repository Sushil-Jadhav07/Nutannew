// panelContext.tsx
import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { useLocalStorage } from "react-use";
import { panelReducer, initialPanelState, PanelState, PanelAction } from "./panel.reducer";

export interface PanelContextType extends PanelState {
    theme: string;
    setTheme: (theme: string) => void;
    dispatch: React.Dispatch<PanelAction>;
}


export const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Use useLocalStorage directly
    const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

    // Panel state (without theme because it's separate)
    const [state, dispatch] = useReducer(panelReducer, {
        ...initialPanelState
    });

    //  Keep the <html> element in sync with the theme
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);


    return (
        <PanelContext.Provider value={{
            ...state,
            theme: theme ?? 'light',
            setTheme,
            dispatch,
        }}>
            {children}
        </PanelContext.Provider>
    );
};
