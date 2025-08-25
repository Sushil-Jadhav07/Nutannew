import { State, Action } from './ui.types';

export const initialState: State = {
    isAuthorized: false,
    displaySidebar: false,
    displayFilter: false,
    displayCart: false,
    displaySearch: false,
    displayMobileSearch: false,
    displayDrawer: false,
    drawerView: null,
    toastText: '',
    isStickyheader: false,
    data: null,
};

export function uiReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_AUTHORIZED':
            return { ...state, isAuthorized: true };
        case 'SET_UNAUTHORIZED':
            return { ...state, isAuthorized: false };
        case 'OPEN_SIDEBAR':
            return { ...state, displaySidebar: true };
        case 'CLOSE_SIDEBAR':
            return { ...state, displaySidebar: false, drawerView: null };
        case 'OPEN_FILTER':
            return { ...state, displayFilter: true };
        case 'CLOSE_FILTER':
            return { ...state, displayFilter: false };
        case 'OPEN_SEARCH':
            return { ...state, displaySearch: true };
        case 'CLOSE_SEARCH':
            return { ...state, displaySearch: false };
        case 'OPEN_MOBILE_SEARCH':
            return { ...state, displayMobileSearch: true };
        case 'CLOSE_MOBILE_SEARCH':
            return { ...state, displayMobileSearch: false };
        case 'OPEN_DRAWER':
            return { ...state, displayDrawer: true, displaySidebar: false, data: action.data };
        case 'CLOSE_DRAWER':
            return { ...state, displayDrawer: false };
        case 'SET_DRAWER_VIEW':
            return { ...state, drawerView: action.view };
        default:
            return state;
    }
}
