import { useState, useMemo } from 'react';
import { useSearchQuery, useFirebaseSearchQuery } from '@/services/product/use-search';
import { useUI } from '@/contexts/useUI';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/routes';
import { useFirebaseAllProducts } from '@/hooks/useFirebaseProducts';
import { advancedSearchProducts } from '@/utils/search-filter';

export const useSearchHandler = () => {
    const navigate = useNavigate();
    const {
        displayMobileSearch,
        closeMobileSearch,
        displaySearch,
        closeSearch,
    } = useUI();
    const [queryText, setQueryText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    // Get all products for enhanced search
    const { data: allProducts, isLoading: isLoadingProducts } = useFirebaseAllProducts(1000);

    // Use advanced search for real-time results
    const searchResults = useMemo(() => {
        if (!queryText || queryText.length < 2 || !allProducts || allProducts.length === 0) {
            return [];
        }
        
        console.log('Searching for:', queryText);
        console.log('Available products:', allProducts.length);
        
        const results = advancedSearchProducts(allProducts, queryText);
        console.log('Search results:', results.length);
        
        return results.map(result => result.product);
    }, [queryText, allProducts]);

    const isLoading = isLoadingProducts;

    function handleSearch(e: React.SyntheticEvent) {
        e.preventDefault();
        clear();
        const route = `${ROUTES.SEARCH}?q=${queryText}`;
        navigate(route);
    }

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
        setQueryText(e.currentTarget.value);
    }

    function clear() {
        setQueryText('');
        setInputFocus(false);
        closeMobileSearch();
        closeSearch();
    }

    function enableInputFocus() {
        setInputFocus(true);
    }

    return {
        queryText,
        setQueryText,
        inputFocus,
        setInputFocus,
        displayMobileSearch,
        displaySearch,
        searchResults,
        isLoading,
        handleSearch,
        handleAutoSearch,
        clear,
        enableInputFocus,
    };
};
