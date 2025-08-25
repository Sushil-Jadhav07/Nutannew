// usePanel.ts
import { useContext } from "react";
import {PanelContext, PanelContextType} from "@/contexts/panel/panel.context";

export const usePanel = (): PanelContextType => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error("usePanel must be used within a PanelProvider");
    }
    return context;
};
