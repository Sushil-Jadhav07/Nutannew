import { Product } from '@/services/types';

export interface ColorOption {
    id: string;
    label: string;
    count: number;
    hex: string;
}

/**
 * Extracts unique colors from product variations
 * @param products - Array of products
 * @returns Array of color options with counts
 */
export const extractColorsFromProducts = (products: Product[]): ColorOption[] => {
    if (!Array.isArray(products) || products.length === 0) {
        return [];
    }

    const colorMap = new Map<string, { label: string; hex: string; count: number }>();

    products.forEach((product) => {
        // Extract colors from variation array
        if (product.variation && Array.isArray(product.variation)) {
            product.variation.forEach((variation) => {
                if (variation.color && variation.color.trim() !== '') {
                    const colorKey = variation.color.toLowerCase();
                    const colorName = variation.colorName || getColorNameFromHex(variation.color);
                    const hexColor = getColorHex(variation.color);
                    
                    if (colorMap.has(colorKey)) {
                        colorMap.get(colorKey)!.count += 1;
                    } else {
                        colorMap.set(colorKey, {
                            label: colorName,
                            hex: hexColor,
                            count: 1
                        });
                    }
                }
            });
        }

        // Extract colors from variation_options array
        if (product.variation_options && Array.isArray(product.variation_options)) {
            product.variation_options.forEach((option) => {
                if (option.color && option.color.trim() !== '') {
                    const colorKey = option.color.toLowerCase();
                    const colorName = getColorNameFromHex(option.color);
                    const hexColor = getColorHex(option.color);
                    
                    if (colorMap.has(colorKey)) {
                        colorMap.get(colorKey)!.count += 1;
                    } else {
                        colorMap.set(colorKey, {
                            label: colorName,
                            hex: hexColor,
                            count: 1
                        });
                    }
                }
            });
        }

        // Extract colors from productDimension array
        if (product.productDimension && Array.isArray(product.productDimension)) {
            product.productDimension.forEach((dimension) => {
                if (dimension.color && dimension.color.trim() !== '') {
                    const colorKey = dimension.color.toLowerCase();
                    const colorName = getColorNameFromHex(dimension.color);
                    const hexColor = getColorHex(dimension.color);
                    
                    if (colorMap.has(colorKey)) {
                        colorMap.get(colorKey)!.count += 1;
                    } else {
                        colorMap.set(colorKey, {
                            label: colorName,
                            hex: hexColor,
                            count: 1
                        });
                    }
                }
            });
        }
    });

    // Convert map to array and sort by count (descending)
    return Array.from(colorMap.entries())
        .map(([id, data]) => ({
            id,
            label: data.label,
            count: data.count,
            hex: data.hex
        }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Gets hex color code for a color value
 * @param colorValue - Color value (could be hex code or color name)
 * @returns Hex color code
 */
const getColorHex = (colorValue: string): string => {
    // If it's already a hex color code, return it
    if (colorValue.startsWith('#')) {
        return colorValue;
    }

    // If it's empty or invalid, return default
    if (!colorValue || colorValue.trim() === '') {
        return '#808080';
    }

    // Color name to hex mapping
    const colorMap: Record<string, string> = {
        'black': '#000000',
        'white': '#FFFFFF',
        'red': '#FF0000',
        'green': '#008000',
        'blue': '#0000FF',
        'yellow': '#FFFF00',
        'orange': '#FFA500',
        'purple': '#800080',
        'pink': '#FFC0CB',
        'brown': '#A52A2A',
        'gray': '#808080',
        'grey': '#808080',
        'silver': '#C0C0C0',
        'gold': '#FFD700',
        'navy': '#000080',
        'maroon': '#800000',
        'olive': '#808000',
        'teal': '#008080',
        'lime': '#00FF00',
        'aqua': '#00FFFF',
        'fuchsia': '#FF00FF',
        'cyan': '#00FFFF',
        'magenta': '#FF00FF',
        'beige': '#F5F5DC',
        'tan': '#D2B48C',
        'coral': '#FF7F50',
        'salmon': '#FA8072',
        'turquoise': '#40E0D0',
        'violet': '#EE82EE',
        'indigo': '#4B0082',
        'crimson': '#DC143C',
        'khaki': '#F0E68C',
        'lavender': '#E6E6FA',
        'plum': '#DDA0DD',
        'tomato': '#FF6347',
        'goldenrod': '#DAA520',
        'orchid': '#DA70D6',
        'thistle': '#D8BFD8',
        'lightblue': '#ADD8E6',
        'lightgreen': '#90EE90',
        'lightcoral': '#F08080',
        'lightpink': '#FFB6C1',
        'lightsalmon': '#FFA07A',
        'lightseagreen': '#20B2AA',
        'lightskyblue': '#87CEEB',
        'lightsteelblue': '#B0C4DE',
        'lightyellow': '#FFFFE0',
        'limegreen': '#32CD32',
        'linen': '#FAF0E6',
        'mediumaquamarine': '#66CDAA',
        'mediumblue': '#0000CD',
        'mediumorchid': '#BA55D3',
        'mediumpurple': '#9370DB',
        'mediumseagreen': '#3CB371',
        'mediumslateblue': '#7B68EE',
        'mediumspringgreen': '#00FA9A',
        'mediumturquoise': '#48D1CC',
        'mediumvioletred': '#C71585',
        'midnightblue': '#191970',
        'mintcream': '#F5FFFA',
        'mistyrose': '#FFE4E1',
        'moccasin': '#FFE4B5',
        'navajowhite': '#FFDEAD',
        'oldlace': '#FDF5E6',
        'olivedrab': '#6B8E23',
        'orangered': '#FF4500',
        'palegoldenrod': '#EEE8AA',
        'palegreen': '#98FB98',
        'paleturquoise': '#AFEEEE',
        'palevioletred': '#DB7093',
        'papayawhip': '#FFEFD5',
        'peachpuff': '#FFDAB9',
        'peru': '#CD853F',
        'powderblue': '#B0E0E6',
        'rosybrown': '#BC8F8F',
        'royalblue': '#4169E1',
        'saddlebrown': '#8B4513',
        'sandybrown': '#F4A460',
        'seagreen': '#2E8B57',
        'seashell': '#FFF5EE',
        'sienna': '#A0522D',
        'skyblue': '#87CEEB',
        'slateblue': '#6A5ACD',
        'slategray': '#708090',
        'slategrey': '#708090',
        'snow': '#FFFAFA',
        'springgreen': '#00FF7F',
        'steelblue': '#4682B4',
        'wheat': '#F5DEB3',
        'whitesmoke': '#F5F5F5',
        'yellowgreen': '#9ACD32'
    };

    return colorMap[colorValue.toLowerCase()] || '#808080'; // Default to gray if color not found
};

/**
 * Gets a human-readable color name from a hex color code
 * @param hexColor - Hex color code
 * @returns Human-readable color name
 */
const getColorNameFromHex = (hexColor: string): string => {
    const hexToNameMap: Record<string, string> = {
        '#000000': 'Black',
        '#FFFFFF': 'White',
        '#FF0000': 'Red',
        '#008000': 'Green',
        '#0000FF': 'Blue',
        '#FFFF00': 'Yellow',
        '#FFA500': 'Orange',
        '#800080': 'Purple',
        '#FFC0CB': 'Pink',
        '#A52A2A': 'Brown',
        '#808080': 'Gray',
        '#C0C0C0': 'Silver',
        '#FFD700': 'Gold',
        '#000080': 'Navy',
        '#800000': 'Maroon',
        '#808000': 'Olive',
        '#008080': 'Teal',
        '#00FF00': 'Lime',
        '#00FFFF': 'Aqua',
        '#FF00FF': 'Fuchsia',
        '#0e2a5d': 'Dark Blue',
        '#1e3a8a': 'Blue',
        '#3b82f6': 'Light Blue',
        '#60a5fa': 'Sky Blue',
        '#93c5fd': 'Pale Blue',
        '#dbeafe': 'Very Light Blue',
        '#1f2937': 'Dark Gray',
        '#374151': 'Gray',
        '#6b7280': 'Medium Gray',
        '#9ca3af': 'Light Gray',
        '#d1d5db': 'Very Light Gray',
        '#ef4444': 'Red',
        '#f87171': 'Light Red',
        '#fca5a5': 'Pale Red',
        '#fecaca': 'Very Light Red',
        '#10b981': 'Green',
        '#34d399': 'Light Green',
        '#6ee7b7': 'Pale Green',
        '#a7f3d0': 'Very Light Green',
        '#f59e0b': 'Amber',
        '#fbbf24': 'Light Amber',
        '#fcd34d': 'Pale Amber',
        '#fde68a': 'Very Light Amber',
        '#8b5cf6': 'Purple',
        '#a78bfa': 'Light Purple',
        '#c4b5fd': 'Pale Purple',
        '#ddd6fe': 'Very Light Purple',
        '#ec4899': 'Pink',
        '#f472b6': 'Light Pink',
        '#f9a8d4': 'Pale Pink',
        '#fbcfe8': 'Very Light Pink',
    };

    return hexToNameMap[hexColor.toLowerCase()] || hexColor;
};

/**
 * Filters products by selected colors
 * @param products - Array of products to filter
 * @param selectedColors - Array of selected color IDs
 * @returns Filtered array of products
 */
export const filterProductsByColors = (
    products: Product[],
    selectedColors: string[]
): Product[] => {
    if (!Array.isArray(products) || products.length === 0 || selectedColors.length === 0) {
        return products;
    }

    return products.filter((product) => {
        // Check if product has any of the selected colors
        const productColors = new Set<string>();

        // Extract colors from variation array
        if (product.variation && Array.isArray(product.variation)) {
            product.variation.forEach((variation) => {
                if (variation.color) {
                    productColors.add(variation.color.toLowerCase());
                }
            });
        }

        // Extract colors from variation_options array
        if (product.variation_options && Array.isArray(product.variation_options)) {
            product.variation_options.forEach((option) => {
                if (option.color) {
                    productColors.add(option.color.toLowerCase());
                }
            });
        }

        // Extract colors from productDimension array
        if (product.productDimension && Array.isArray(product.productDimension)) {
            product.productDimension.forEach((dimension) => {
                if (dimension.color) {
                    productColors.add(dimension.color.toLowerCase());
                }
            });
        }

        // Check if any product color matches selected colors
        return selectedColors.some(selectedColor => 
            productColors.has(selectedColor.toLowerCase())
        );
    });
};
