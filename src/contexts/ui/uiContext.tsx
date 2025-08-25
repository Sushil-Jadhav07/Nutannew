// uiContext.tsx
import React, {useEffect} from 'react';
import { uiReducer, initialState } from './ui.reducer';
import { State, DRAWER_VIEWS } from './ui.types';
import Cookies from "js-cookie";

export const UIContext = React.createContext<State | any>(initialState);
UIContext.displayName = 'UIContext';

export const UIProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState);

    // Sync isAuthorized with auth_token cookie on mount
    useEffect(() => {
        const authToken = Cookies.get('auth_token');
        if (authToken) {
            dispatch({ type: 'SET_AUTHORIZED' });
        }
    }, []);

    const value = React.useMemo(() => ({
        ...state,
        authorize: () => dispatch({ type: 'SET_AUTHORIZED' }),
        unauthorize: () => dispatch({ type: 'SET_UNAUTHORIZED' }),
        openSidebar: () => dispatch({ type: 'OPEN_SIDEBAR' }),
        closeSidebar: () => dispatch({ type: 'CLOSE_SIDEBAR' }),
        openFilter: () => dispatch({ type: 'OPEN_FILTER' }),
        closeFilter: () => dispatch({ type: 'CLOSE_FILTER' }),
        openSearch: () => dispatch({ type: 'OPEN_SEARCH' }),
        closeSearch: () => dispatch({ type: 'CLOSE_SEARCH' }),
        openMobileSearch: () => dispatch({ type: 'OPEN_MOBILE_SEARCH' }),
        closeMobileSearch: () => dispatch({ type: 'CLOSE_MOBILE_SEARCH' }),
        toggleMobileSearch: () =>
            state.displayMobileSearch
                ? dispatch({ type: 'CLOSE_MOBILE_SEARCH' })
                : dispatch({ type: 'OPEN_MOBILE_SEARCH' }),
        openDrawer: (data?: any) => dispatch({ type: 'OPEN_DRAWER', data }),
        closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
        setDrawerView: (view: DRAWER_VIEWS) => dispatch({ type: 'SET_DRAWER_VIEW', view }),
    }), [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
