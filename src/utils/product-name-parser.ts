// Utility to extract color names from product names and clean them up
// Handles cases where product names contain color information like "Product Name - Tan"

import { getColorName } from './color-utils';

// Common color names that might appear in product names
const COMMON_COLOR_NAMES = [
  // Basic colors
  'black', 'white', 'gray', 'grey', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
  
  // Extended colors
  'navy', 'royal', 'sky', 'forest', 'lime', 'olive', 'maroon', 'teal', 'aqua', 'fuchsia', 'silver', 'gold',
  
  // Specific shades
  'tan', 'beige', 'cream', 'ivory', 'khaki', 'coral', 'salmon', 'crimson', 'scarlet', 'burgundy', 'wine',
  'indigo', 'violet', 'lavender', 'magenta', 'cyan', 'turquoise', 'emerald', 'jade', 'mint', 'sage',
  
  // Neutral tones
  'charcoal', 'slate', 'stone', 'sand', 'pearl', 'platinum', 'bronze', 'copper', 'rose', 'blush',
  
  // Fashion colors
  'nude', 'camel', 'taupe', 'mocha', 'chocolate', 'coffee', 'espresso', 'vanilla', 'honey', 'amber',
  
  // Metallic
  'chrome', 'steel', 'iron', 'titanium', 'aluminum', 'brass'
];

export interface ParsedProductName {
  cleanName: string;
  extractedColorName?: string;
  originalName: string;
}

/**
 * Parse product name to extract color information
 * Handles patterns like:
 * - "Product Name - Tan" → cleanName: "Product Name", colorName: "Tan"
 * - "Blue Widget Pro" → cleanName: "Widget Pro", colorName: "Blue" 
 * - "iPhone 15 Gold" → cleanName: "iPhone 15", colorName: "Gold"
 */
export function parseProductName(productName: string): ParsedProductName {
  if (!productName || typeof productName !== 'string') {
    return {
      cleanName: productName || '',
      originalName: productName || ''
    };
  }

  const originalName = productName.trim();
  let cleanName = originalName;
  let extractedColorName: string | undefined;

  // Pattern 1: "Product Name - Color" (most common)
  const dashPattern = /^(.+?)\s*-\s*([^-]+)$/;
  const dashMatch = originalName.match(dashPattern);
  
  if (dashMatch) {
    const [, namePart, colorPart] = dashMatch;
    const potentialColor = colorPart.trim().toLowerCase();
    
    if (COMMON_COLOR_NAMES.includes(potentialColor)) {
      cleanName = namePart.trim();
      extractedColorName = capitalizeColorName(potentialColor);
    }
  }

  // Pattern 2: Color at the beginning "Blue Product Name"
  if (!extractedColorName) {
    const words = originalName.split(/\s+/);
    if (words.length > 1) {
      const firstWord = words[0].toLowerCase();
      if (COMMON_COLOR_NAMES.includes(firstWord)) {
        cleanName = words.slice(1).join(' ');
        extractedColorName = capitalizeColorName(firstWord);
      }
    }
  }

  // Pattern 3: Color at the end "Product Name Gold"
  if (!extractedColorName) {
    const words = originalName.split(/\s+/);
    if (words.length > 1) {
      const lastWord = words[words.length - 1].toLowerCase();
      if (COMMON_COLOR_NAMES.includes(lastWord)) {
        cleanName = words.slice(0, -1).join(' ');
        extractedColorName = capitalizeColorName(lastWord);
      }
    }
  }

  return {
    cleanName: cleanName.trim(),
    extractedColorName,
    originalName
  };
}

/**
 * Capitalize color name properly
 */
function capitalizeColorName(colorName: string): string {
  return colorName.charAt(0).toUpperCase() + colorName.slice(1).toLowerCase();
}

/**
 * Enhanced function to get color name with product name parsing
 * This combines the color extraction from product names with our existing color mapping
 */
export function getColorNameWithProductParsing(
  hexColor: string, 
  firebaseColorName?: string, 
  productName?: string
): string {
  // Priority 1: Use Firebase colorName if available
  if (firebaseColorName && firebaseColorName.trim()) {
    return firebaseColorName;
  }

  // Priority 2: Extract from product name
  if (productName) {
    const parsed = parseProductName(productName);
    if (parsed.extractedColorName) {
      return parsed.extractedColorName;
    }
  }

  // Priority 3: Use our color mapping utility
  return getColorName(hexColor);
}

/**
 * Clean product name by removing color information
 */
export function getCleanProductName(productName: string): string {
  const parsed = parseProductName(productName);
  return parsed.cleanName;
}

/**
 * Process variation data to extract color names from product names
 */
export function processVariationWithColorExtraction(
  variation: any[], 
  productName: string
): any[] {
  if (!variation || !Array.isArray(variation)) {
    return variation || [];
  }

  return variation.map((v: any) => {
    // If colorName is already set, use it
    if (v.colorName && v.colorName.trim()) {
      return v;
    }

    // Extract color name from product name
    const colorName = getColorNameWithProductParsing(v.color, v.colorName, productName);
    
    return {
      ...v,
      colorName: colorName !== v.color ? colorName : undefined // Only set if different from hex
    };
  });
}
