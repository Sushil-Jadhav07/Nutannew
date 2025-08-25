// panel.reducer.ts
export interface PanelState {
    selectedColor: string;
    selectedTab: number;
    selectedLayout?: string;
    selectedFooter?: string;
    selectedDirection?: string;
    theme?: string;
}

export type PanelAction =
    | { type: 'SET_COLOR'; payload: string }
    | { type: 'SET_TAB'; payload: number }
    | { type: 'SET_LAYOUT'; payload: string }
    | { type: 'SET_FOOTER'; payload: string }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'SET_DIRECTION'; payload: string };

export const initialPanelState: PanelState = {
    selectedColor: 'primary',
    selectedTab: 0,
    selectedLayout: undefined,
    selectedFooter: undefined,
    selectedDirection:'ltr',
    theme: 'light',
};

export function panelReducer(state: PanelState, action: PanelAction): PanelState {
    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, selectedColor: action.payload };
        case 'SET_TAB':
            return { ...state, selectedTab: action.payload };
        case 'SET_LAYOUT':
            return { ...state, selectedLayout: action.payload };
        case 'SET_FOOTER':
            return { ...state, selectedFooter: action.payload };
        case 'SET_DIRECTION':
            return { ...state, selectedDirection: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
}
