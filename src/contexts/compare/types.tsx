import { Product } from "@/services/types";
import { Dispatch } from "react";
import { Action } from "./compareReducer"; // import your Action type


export interface CompareContextType {
    compareList: Product[];
    dispatch: Dispatch<Action>;
}