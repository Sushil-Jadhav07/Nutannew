'use client';

import { useState, useMemo } from 'react';
import { useUI } from '@/contexts/useUI';
import { filterProductsByPrice, getPriceRangeFromProducts, isDefaultPriceRange, normalizePriceRange } from '@/utils/price-filter';
import { extractColorsFromProducts, filterProductsByColors, ColorOption } from '@/utils/color-filter';
import { Product } from '@/services/types';

export const useFilterSidebar = () => {
    const { closeFilter } = useUI();
    return { closeFilter };
};

export const useFilterControls = () => {
    const [isOnSale, setIsOnSale] = useState(false);
    const MIN_PRICE = 0;
    const MAX_PRICE = 1000;
    const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000];

    const [selectedFilters, setSelectedFilters] = useState<{
        categories: { [key: string]: boolean };
        colors: { [key: string]: boolean };
        sizes: { [key: string]: boolean };
        price: [number, number];
    }>({
        categories: {},
        colors: {},
        sizes: {},
        price: DEFAULT_PRICE_RANGE,
    });

    const handleFilterChange = (
        section: 'categories' | 'colors' | 'sizes' | 'price',
        id: string,
        checked: boolean
    ) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [id]: checked,
            },
        }));
    };

    const handlePriceChange = (value: [number, number]) => {
        setSelectedFilters((prev) => ({
            ...prev,
            price: value,
        }));
    };

    const clearFilter = (section: keyof typeof selectedFilters) => {
        if (section === 'price') {
            setSelectedFilters((prev) => ({ ...prev, price: DEFAULT_PRICE_RANGE }));
        } else {
            setSelectedFilters((prev) => ({ ...prev, [section]: {} }));
        }
    };

    const hasSelectedFilters = (section: keyof typeof selectedFilters) => {
        return Object.values(selectedFilters[section]).some((value) => value);
    };

    const isPriceRangeSelected = () => {
        return (
            selectedFilters.price[0] !== DEFAULT_PRICE_RANGE[0] ||
            selectedFilters.price[1] !== DEFAULT_PRICE_RANGE[1]
        );
    };

    const getPriceRangeLabel = () => {
        if (!isPriceRangeSelected()) return 'Price';
        return `$${selectedFilters.price[0]} - $${selectedFilters.price[1]}`;
    };

    return {
        isOnSale,
        setIsOnSale,
        selectedFilters,
        handleFilterChange,
        handlePriceChange,
        clearFilter,
        hasSelectedFilters,
        isPriceRangeSelected,
        getPriceRangeLabel,
        MIN_PRICE,
        MAX_PRICE,
    };
};

export const useFilters = () => {
    const [isOnSale, setIsOnSale] = useState(true);
    const MIN_PRICE = 0;
    const MAX_PRICE = 1000;
    const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000];

    const [sectionsOpen, setSectionsOpen] = useState({
        categories: true,
        colors: true,
        sizes: true,
        price: true,
    });

    const [selectedFilters, setSelectedFilters] = useState<{
        categories: Record<string, boolean>;
        colors: Record<string, boolean>;
        sizes: Record<string, boolean>;
    }>({
        categories: {},
        colors: {},
        sizes: {},
    });

    const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);

    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleSection = (section: 'categories' | 'colors' | 'sizes' | 'price') => {
        setSectionsOpen((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleCategoryExpand = (id: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleFilterChange = (section: 'categories' | 'colors' | 'sizes', id: string, checked: boolean) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [id]: checked,
            },
        }));
    };

    const handlePriceRangeChange = (value: [number, number]) => {
        setPriceRange(value);
    };

    return {
        isOnSale,
        setIsOnSale,
        sectionsOpen,
        toggleSection,
        selectedFilters,
        handleFilterChange,
        priceRange,
        handlePriceRangeChange,
        expandedCategories,
        toggleCategoryExpand,
        MIN_PRICE,
        MAX_PRICE,
    };
};

/**
 * Hook for comprehensive product filtering including price range
 */
export const useProductFiltering = (products: Product[] = []) => {
    const [isOnSale, setIsOnSale] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<{
        categories: Record<string, boolean>;
        colors: Record<string, boolean>;
        sizes: Record<string, boolean>;
        price: [number, number];
    }>({
        categories: {},
        colors: {},
        sizes: {},
        price: [0, 1000],
    });

    // Get price range from products
    const productPriceRange = useMemo(() => {
        return getPriceRangeFromProducts(products);
    }, [products]);

    // Get available colors from products
    const availableColors = useMemo(() => {
        return extractColorsFromProducts(products);
    }, [products]);

    const MIN_PRICE = 0; // Always start from 0
    const MAX_PRICE = Math.max(productPriceRange.max, 1000); // At least 1000
    const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000]; // Always default to 0-1000

    // Filter products based on all selected filters
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Apply price range filter
        if (!isDefaultPriceRange(selectedFilters.price, DEFAULT_PRICE_RANGE)) {
            filtered = filterProductsByPrice(filtered, selectedFilters.price);
        }

        // Apply category filter
        const selectedCategories = Object.keys(selectedFilters.categories).filter(
            key => selectedFilters.categories[key]
        );
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => 
                selectedCategories.some(category => 
                    product.category?.toLowerCase().includes(category.toLowerCase()) ||
                    product.subcategory?.toLowerCase().includes(category.toLowerCase())
                )
            );
        }

        // Apply color filter
        const selectedColors = Object.keys(selectedFilters.colors).filter(
            key => selectedFilters.colors[key]
        );
        if (selectedColors.length > 0) {
            filtered = filterProductsByColors(filtered, selectedColors);
        }

        // Apply size filter
        const selectedSizes = Object.keys(selectedFilters.sizes).filter(
            key => selectedFilters.sizes[key]
        );
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(product => 
                selectedSizes.some(size => 
                    product.size?.toLowerCase().includes(size.toLowerCase())
                )
            );
        }

        // Apply on sale filter
        if (isOnSale) {
            filtered = filtered.filter(product => 
                product.sale_price && product.sale_price < product.price
            );
        }

        return filtered;
    }, [products, selectedFilters, isOnSale, DEFAULT_PRICE_RANGE]);

    const handleFilterChange = (
        section: 'categories' | 'colors' | 'sizes',
        id: string,
        checked: boolean
    ) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [id]: checked,
            },
        }));
    };

    const handlePriceChange = (value: [number, number]) => {
        const normalizedValue = normalizePriceRange(value, MIN_PRICE, MAX_PRICE);
        setSelectedFilters((prev) => ({
            ...prev,
            price: normalizedValue,
        }));
    };

    const clearFilter = (section: keyof typeof selectedFilters) => {
        if (section === 'price') {
            setSelectedFilters((prev) => ({ ...prev, price: DEFAULT_PRICE_RANGE }));
        } else {
            setSelectedFilters((prev) => ({ ...prev, [section]: {} }));
        }
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            categories: {},
            colors: {},
            sizes: {},
            price: DEFAULT_PRICE_RANGE,
        });
        setIsOnSale(false);
    };

    const hasSelectedFilters = (section: keyof typeof selectedFilters) => {
        if (section === 'price') {
            return !isDefaultPriceRange(selectedFilters.price, DEFAULT_PRICE_RANGE);
        }
        return Object.values(selectedFilters[section]).some((value) => value);
    };

    const hasAnyFilters = () => {
        return hasSelectedFilters('categories') || 
               hasSelectedFilters('colors') || 
               hasSelectedFilters('sizes') || 
               hasSelectedFilters('price') || 
               isOnSale;
    };

    const getPriceRangeLabel = () => {
        if (!hasSelectedFilters('price')) return 'Price';
        return `$${selectedFilters.price[0]} - $${selectedFilters.price[1]}`;
    };

    return {
        // State
        isOnSale,
        setIsOnSale,
        selectedFilters,
        filteredProducts,
        
        // Price range
        MIN_PRICE,
        MAX_PRICE,
        DEFAULT_PRICE_RANGE,
        
        // Available options
        availableColors,
        
        // Actions
        handleFilterChange,
        handlePriceChange,
        clearFilter,
        clearAllFilters,
        
        // Utilities
        hasSelectedFilters,
        hasAnyFilters,
        getPriceRangeLabel,
    };
};