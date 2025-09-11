import { useState, useMemo, useCallback } from 'react';
import { Product } from '@/services/types';
import { 
    searchProducts, 
    advancedSearchProducts, 
    getSearchSuggestions,
    SearchOptions 
} from '@/utils/search-filter';

export interface UseAdvancedSearchOptions {
    products: Product[];
    searchIn: ('name' | 'category' | 'subcategory')[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
    enableSuggestions?: boolean;
    maxSuggestions?: number;
}

export const useAdvancedSearch = (options: UseAdvancedSearchOptions) => {
    const {
        products,
        searchIn = ['name', 'category', 'subcategory'],
        caseSensitive = false,
        exactMatch = false,
        enableSuggestions = true,
        maxSuggestions = 10
    } = options;

    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Basic search results
    const searchResults = useMemo(() => {
        if (!query.trim()) {
            return products;
        }

        return searchProducts(products, {
            query,
            searchIn,
            caseSensitive,
            exactMatch
        });
    }, [products, query, searchIn, caseSensitive, exactMatch]);

    // Advanced search results with scoring
    const advancedResults = useMemo(() => {
        if (!query.trim()) {
            return products.map(product => ({ product, score: 0 }));
        }

        return advancedSearchProducts(products, query);
    }, [products, query]);

    // Search suggestions
    const suggestions = useMemo(() => {
        if (!enableSuggestions || !query.trim() || query.length < 2) {
            return [];
        }

        return getSearchSuggestions(products, query, maxSuggestions);
    }, [products, query, enableSuggestions, maxSuggestions]);

    // Search handlers
    const handleSearch = useCallback((searchQuery: string) => {
        setIsSearching(true);
        setQuery(searchQuery);
        
        // Simulate search delay for better UX
        setTimeout(() => {
            setIsSearching(false);
        }, 300);
    }, []);

    const clearSearch = useCallback(() => {
        setQuery('');
        setIsSearching(false);
    }, []);

    // Get search statistics
    const searchStats = useMemo(() => {
        const totalProducts = products.length;
        const foundProducts = searchResults.length;
        const searchTime = isSearching ? 'Searching...' : 'Complete';

        return {
            totalProducts,
            foundProducts,
            searchTime,
            hasResults: foundProducts > 0,
            isEmpty: foundProducts === 0 && query.trim() !== ''
        };
    }, [products.length, searchResults.length, isSearching, query]);

    return {
        // State
        query,
        setQuery,
        isSearching,
        
        // Results
        searchResults,
        advancedResults,
        suggestions,
        
        // Actions
        handleSearch,
        clearSearch,
        
        // Statistics
        searchStats,
        
        // Options
        searchIn,
        caseSensitive,
        exactMatch
    };
};
