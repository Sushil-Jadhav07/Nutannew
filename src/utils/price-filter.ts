import { Product } from '@/services/types';

/**
 * Filters products based on price range
 * @param products - Array of products to filter
 * @param priceRange - Tuple of [minPrice, maxPrice]
 * @returns Filtered array of products within the price range
 */
export const filterProductsByPrice = (
  products: Product[],
  priceRange: [number, number]
): Product[] => {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  const [minPrice, maxPrice] = priceRange;

  return products.filter((product) => {
    // Get the effective price (sale price if available, otherwise regular price)
    const effectivePrice = product.sale_price || product.price || 0;
    
    // Check if the price is within the range
    return effectivePrice >= minPrice && effectivePrice <= maxPrice;
  });
};

/**
 * Gets the price range from a list of products
 * @param products - Array of products
 * @returns Object with min and max prices
 */
export const getPriceRangeFromProducts = (products: Product[]): { min: number; max: number } => {
    if (!Array.isArray(products) || products.length === 0) {
        return { min: 0, max: 1000 };
    }

    const prices = products.map((product) => product.sale_price || product.price || 0);
    const min = 0; // Always start from 0
    const max = Math.max(...prices, 1000); // At least 1000

    return { min, max };
};

/**
 * Checks if a price range is the default range
 * @param priceRange - Tuple of [minPrice, maxPrice]
 * @param defaultRange - Default price range tuple
 * @returns True if the range is the default range
 */
export const isDefaultPriceRange = (
    priceRange: [number, number],
    defaultRange: [number, number] = [0, 1000]
): boolean => {
    return priceRange[0] === defaultRange[0] && priceRange[1] === defaultRange[1];
};

/**
 * Validates and normalizes a price range
 * @param priceRange - Tuple of [minPrice, maxPrice]
 * @param minLimit - Minimum allowed price
 * @param maxLimit - Maximum allowed price
 * @returns Normalized price range
 */
export const normalizePriceRange = (
  priceRange: [number, number],
  minLimit: number = 0,
  maxLimit: number = 1000
): [number, number] => {
  const [min, max] = priceRange;
  
  // Ensure min is not less than minLimit
  const normalizedMin = Math.max(min, minLimit);
  
  // Ensure max is not greater than maxLimit
  const normalizedMax = Math.min(max, maxLimit);
  
  // Ensure min is not greater than max
  const finalMin = Math.min(normalizedMin, normalizedMax);
  const finalMax = Math.max(normalizedMin, normalizedMax);
  
  return [finalMin, finalMax];
};
