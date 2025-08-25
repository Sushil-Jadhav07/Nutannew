import { createContext } from "react";
import { WishlistContextType } from "./types";

export const wishlistContext = createContext<WishlistContextType | undefined>(undefined);
