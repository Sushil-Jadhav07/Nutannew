import React, { createContext, useContext, ReactNode } from 'react';
import { useProductFiltering } from '@/hooks/use-filter-hooks';
import { Product } from '@/services/types';
import { ColorOption } from '@/utils/color-filter';

interface FilterContextType {
    // State
    isOnSale: boolean;
    setIsOnSale: (value: boolean) => void;
    selectedFilters: {
        categories: Record<string, boolean>;
        colors: Record<string, boolean>;
        sizes: Record<string, boolean>;
        price: [number, number];
    };
    filteredProducts: Product[];
    
    // Price range
    MIN_PRICE: number;
    MAX_PRICE: number;
    DEFAULT_PRICE_RANGE: [number, number];
    
    // Available options
    availableColors: ColorOption[];
    
    // Actions
    handleFilterChange: (section: 'categories' | 'colors' | 'sizes', id: string, checked: boolean) => void;
    handlePriceChange: (value: [number, number]) => void;
    clearFilter: (section: 'categories' | 'colors' | 'sizes' | 'price') => void;
    clearAllFilters: () => void;
    
    // Utilities
    hasSelectedFilters: (section: 'categories' | 'colors' | 'sizes' | 'price') => boolean;
    hasAnyFilters: () => boolean;
    getPriceRangeLabel: () => string;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
    products: Product[];
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children, products }) => {
    const filterState = useProductFiltering(products);
    
    return (
        <FilterContext.Provider value={filterState}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilterContext must be used within a FilterProvider');
    }
    return context;
};
