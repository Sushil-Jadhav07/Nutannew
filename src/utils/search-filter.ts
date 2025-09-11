import { Product } from '@/services/types';

export interface SearchOptions {
    query: string;
    searchIn: ('name' | 'category' | 'subcategory')[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
}

/**
 * Searches products by name, category, and subcategory
 * @param products - Array of products to search
 * @param options - Search configuration options
 * @returns Filtered array of products matching the search criteria
 */
export const searchProducts = (
    products: Product[],
    options: SearchOptions
): Product[] => {
    if (!Array.isArray(products) || products.length === 0) {
        return [];
    }

    if (!options.query || options.query.trim() === '') {
        return products;
    }

    const searchTerm = options.caseSensitive 
        ? options.query.trim() 
        : options.query.trim().toLowerCase();

    return products.filter((product) => {
        // Search in product name
        if (options.searchIn.includes('name')) {
            const productName = options.caseSensitive 
                ? product.name 
                : product.name.toLowerCase();
            
            if (options.exactMatch) {
                if (productName === searchTerm) return true;
            } else {
                if (productName.includes(searchTerm)) return true;
            }
        }

        // Search in category
        if (options.searchIn.includes('category')) {
            if (product.category && Array.isArray(product.category)) {
                const categoryMatch = product.category.some((cat) => {
                    const categoryName = options.caseSensitive 
                        ? cat.name 
                        : cat.name.toLowerCase();
                    
                    if (options.exactMatch) {
                        return categoryName === searchTerm;
                    } else {
                        return categoryName.includes(searchTerm);
                    }
                });
                
                if (categoryMatch) return true;
            }
        }

        // Search in subcategory
        if (options.searchIn.includes('subcategory')) {
            if (product.subcategory) {
                const subcategoryName = options.caseSensitive 
                    ? product.subcategory 
                    : product.subcategory.toLowerCase();
                
                if (options.exactMatch) {
                    if (subcategoryName === searchTerm) return true;
                } else {
                    if (subcategoryName.includes(searchTerm)) return true;
                }
            }
        }

        return false;
    });
};

/**
 * Advanced search with fuzzy matching and scoring
 * @param products - Array of products to search
 * @param query - Search query
 * @returns Array of products with relevance scores
 */
export const advancedSearchProducts = (
    products: Product[],
    query: string
): Array<{ product: Product; score: number }> => {
    if (!Array.isArray(products) || products.length === 0 || !query.trim()) {
        console.log('No products or query provided');
        return [];
    }

    const searchTerm = query.trim().toLowerCase();
    const results: Array<{ product: Product; score: number }> = [];

    console.log('Advanced search for term:', searchTerm);

    products.forEach((product) => {
        let score = 0;

        // Name matching (highest priority)
        const productName = product.name.toLowerCase();
        if (productName.includes(searchTerm)) {
            score += 100;
            console.log(`Found match in name: ${product.name} (score: ${score})`);
            
            // Bonus for exact match
            if (productName === searchTerm) {
                score += 50;
            }
            
            // Bonus for starting with search term
            if (productName.startsWith(searchTerm)) {
                score += 25;
            }
        }

        // Category matching
        if (product.category && Array.isArray(product.category)) {
            product.category.forEach((cat) => {
                const categoryName = cat.name.toLowerCase();
                if (categoryName.includes(searchTerm)) {
                    score += 75;
                    
                    if (categoryName === searchTerm) {
                        score += 25;
                    }
                    
                    if (categoryName.startsWith(searchTerm)) {
                        score += 15;
                    }
                }
            });
        }

        // Subcategory matching
        if (product.subcategory) {
            const subcategoryName = product.subcategory.toLowerCase();
            if (subcategoryName.includes(searchTerm)) {
                score += 50;
                
                if (subcategoryName === searchTerm) {
                    score += 20;
                }
                
                if (subcategoryName.startsWith(searchTerm)) {
                    score += 10;
                }
            }
        }

        // Brand matching
        if (product.brand) {
            const brandName = product.brand.toLowerCase();
            if (brandName.includes(searchTerm)) {
                score += 30;
            }
        }

        // Description matching (lowest priority)
        if (product.description) {
            const description = product.description.toLowerCase();
            if (description.includes(searchTerm)) {
                score += 10;
            }
        }

        // Only include products with a score > 0
        if (score > 0) {
            results.push({ product, score });
        }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
};

/**
 * Get search suggestions based on product data
 * @param products - Array of products
 * @param query - Partial search query
 * @param limit - Maximum number of suggestions
 * @returns Array of search suggestions
 */
export const getSearchSuggestions = (
    products: Product[],
    query: string,
    limit: number = 10
): string[] => {
    if (!Array.isArray(products) || products.length === 0 || !query.trim()) {
        return [];
    }

    const searchTerm = query.trim().toLowerCase();
    const suggestions = new Set<string>();

    products.forEach((product) => {
        // Add product name suggestions
        if (product.name.toLowerCase().includes(searchTerm)) {
            suggestions.add(product.name);
        }

        // Add category suggestions
        if (product.category && Array.isArray(product.category)) {
            product.category.forEach((cat) => {
                if (cat.name.toLowerCase().includes(searchTerm)) {
                    suggestions.add(cat.name);
                }
            });
        }

        // Add subcategory suggestions
        if (product.subcategory && product.subcategory.toLowerCase().includes(searchTerm)) {
            suggestions.add(product.subcategory);
        }

        // Add brand suggestions
        if (product.brand && product.brand.toLowerCase().includes(searchTerm)) {
            suggestions.add(product.brand);
        }
    });

    return Array.from(suggestions).slice(0, limit);
};

/**
 * Highlight search terms in text
 * @param text - Text to highlight
 * @param searchTerm - Search term to highlight
 * @param className - CSS class for highlighted text
 * @returns JSX element with highlighted text
 */
export const highlightSearchTerm = (
    text: string,
    searchTerm: string,
    className: string = 'bg-yellow-200 font-semibold'
): string => {
    if (!searchTerm.trim()) {
        return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, `<span class="${className}">$1</span>`);
};
