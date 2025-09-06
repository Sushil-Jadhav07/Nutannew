// Color mapping utility for converting hex colors to human-readable names
// This provides fallback color names when Firebase doesn't have colorName field

export interface ColorMapping {
  hex: string;
  name: string;
}

// Common color mappings - you can extend this based on your product colors
const COLOR_MAPPINGS: ColorMapping[] = [
  // Blues
  { hex: '#000080', name: 'Navy Blue' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#4169E1', name: 'Royal Blue' },
  { hex: '#87CEEB', name: 'Sky Blue' },
  { hex: '#00BFFF', name: 'Deep Sky Blue' },
  { hex: '#1E90FF', name: 'Dodger Blue' },
  { hex: '#6495ED', name: 'Cornflower Blue' },
  
  // Reds
  { hex: '#FF0000', name: 'Red' },
  { hex: '#DC143C', name: 'Crimson' },
  { hex: '#B22222', name: 'Fire Brick' },
  { hex: '#8B0000', name: 'Dark Red' },
  { hex: '#FF6347', name: 'Tomato' },
  { hex: '#FF4500', name: 'Orange Red' },
  
  // Greens
  { hex: '#008000', name: 'Green' },
  { hex: '#00FF00', name: 'Lime' },
  { hex: '#32CD32', name: 'Lime Green' },
  { hex: '#228B22', name: 'Forest Green' },
  { hex: '#006400', name: 'Dark Green' },
  { hex: '#90EE90', name: 'Light Green' },
  
  // Yellows
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FFD700', name: 'Gold' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#FFFFE0', name: 'Light Yellow' },
  
  // Purples
  { hex: '#800080', name: 'Purple' },
  { hex: '#9932CC', name: 'Dark Orchid' },
  { hex: '#8A2BE2', name: 'Blue Violet' },
  { hex: '#4B0082', name: 'Indigo' },
  { hex: '#DDA0DD', name: 'Plum' },
  
  // Grays
  { hex: '#000000', name: 'Black' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#808080', name: 'Gray' },
  { hex: '#A9A9A9', name: 'Dark Gray' },
  { hex: '#D3D3D3', name: 'Light Gray' },
  { hex: '#C0C0C0', name: 'Silver' },
  
  // Browns
  { hex: '#A52A2A', name: 'Brown' },
  { hex: '#8B4513', name: 'Saddle Brown' },
  { hex: '#D2B48C', name: 'Tan' },
  { hex: '#F4A460', name: 'Sandy Brown' },
  
  // Pinks
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#FF69B4', name: 'Hot Pink' },
  { hex: '#FF1493', name: 'Deep Pink' },
  { hex: '#FFB6C1', name: 'Light Pink' },
];

/**
 * Get color name from hex value
 * First tries exact match, then closest match, finally fallback to hex
 */
export function getColorName(hex: string, fallbackName?: string): string {
  if (!hex) return fallbackName || 'Unknown';
  
  // Use provided fallback name if available
  if (fallbackName && fallbackName.trim()) {
    return fallbackName;
  }
  
  // Clean hex value
  const cleanHex = hex.toUpperCase().replace('#', '');
  const normalizedHex = `#${cleanHex}`;
  
  // Try exact match first
  const exactMatch = COLOR_MAPPINGS.find(color => 
    color.hex.toUpperCase() === normalizedHex
  );
  
  if (exactMatch) {
    return exactMatch.name;
  }
  
  // If no exact match, try to find closest color (simplified)
  const closestMatch = findClosestColor(normalizedHex);
  if (closestMatch) {
    return closestMatch.name;
  }
  
  // Fallback: return a readable version of the hex
  return formatHexAsName(normalizedHex);
}

/**
 * Find closest color by comparing RGB values
 */
function findClosestColor(targetHex: string): ColorMapping | null {
  if (!isValidHex(targetHex)) return null;
  
  const targetRgb = hexToRgb(targetHex);
  if (!targetRgb) return null;
  
  let minDistance = Infinity;
  let closestColor: ColorMapping | null = null;
  
  for (const color of COLOR_MAPPINGS) {
    const colorRgb = hexToRgb(color.hex);
    if (!colorRgb) continue;
    
    const distance = Math.sqrt(
      Math.pow(targetRgb.r - colorRgb.r, 2) +
      Math.pow(targetRgb.g - colorRgb.g, 2) +
      Math.pow(targetRgb.b - colorRgb.b, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }
  
  // Only return closest color if it's reasonably close (distance < 100)
  return minDistance < 100 ? closestColor : null;
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Check if hex color is valid
 */
function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Format hex as readable name (fallback)
 */
function formatHexAsName(hex: string): string {
  // Remove # and convert to uppercase
  const cleanHex = hex.replace('#', '').toUpperCase();
  
  // For common patterns, provide better names
  if (cleanHex === '000000') return 'Black';
  if (cleanHex === 'FFFFFF') return 'White';
  if (cleanHex.match(/^[0-9A-F]{6}$/)) return `Color ${cleanHex}`;
  
  return hex; // Fallback to original hex
}

/**
 * Get display name for variation - prioritizes colorName over hex conversion
 */
export function getVariationDisplayName(variation: { color: string; colorName?: string }): string {
  return getColorName(variation.color, variation.colorName);
}

/**
 * Enhanced variation display name that considers product name parsing
 */
export function getEnhancedVariationDisplayName(
  variation: { color: string; colorName?: string }, 
  productName?: string
): string {
  // If we have a colorName in the variation, use it
  if (variation.colorName && variation.colorName.trim()) {
    return variation.colorName;
  }
  
  // Try to extract from product name if available
  if (productName) {
    const { getColorNameWithProductParsing } = require('./product-name-parser');
    return getColorNameWithProductParsing(variation.color, variation.colorName, productName);
  }
  
  // Fallback to standard color mapping
  return getColorName(variation.color, variation.colorName);
}

/**
 * Create color mapping for cart/order items
 */
export interface ColorInfo {
  hex: string;
  name: string;
  displayName: string;
}

export function createColorInfo(color: string, colorName?: string): ColorInfo {
  const displayName = getColorName(color, colorName);
  
  return {
    hex: color,
    name: colorName || displayName,
    displayName: displayName
  };
}
