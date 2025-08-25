// compareProvider.tsx
import React, { useReducer, useEffect, useMemo } from "react";
import { CompareContext } from "./compareContext";
import { compareReducer } from "./compareReducer";
import { Product } from "@/services/types";
import { CompareContextType } from "./types"; // make sure to import your updated type

const initialState: Product[] = typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem("compares") || "[]")
    : [];

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [compareList, dispatch] = useReducer(compareReducer, initialState);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("compares", JSON.stringify(compareList));
        }
    }, [compareList]);

    const value: CompareContextType = useMemo(() => ({ compareList, dispatch }), [compareList, dispatch]);

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    );
};
