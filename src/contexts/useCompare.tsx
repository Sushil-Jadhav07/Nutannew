import { useContext } from "react";
import { CompareContext } from "./compare/compareContext";

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useCompare must be used within CompareProvider');
    return context.compareList;
};