import isEmpty from 'lodash/isEmpty';
import {VariationOption} from "@/services/types";
import { ColorInfo } from "@/utils/color-utils";
import { getColorNameWithProductParsing } from "@/utils/product-name-parser";
interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}

export function constructCartItem(item: Item, variation: VariationOption) {
  const { id, name, slug, image, price, sale_price, quantity, unit } = item ?? {};
  if (!isEmpty(variation)) {
    // Get color information from variation options
    const colorOption = variation.options?.find(opt => opt.name === 'color');
    const colorInfo = colorOption?.colorInfo as ColorInfo;
    
    // Enhanced color name extraction using product name parsing
    const enhancedColorName = colorInfo?.displayName || 
      getColorNameWithProductParsing(
        colorOption?.value || '', 
        colorInfo?.name, 
        name
      );
    
    // Use display name from color info, fallback to variation title
    const displayName = enhancedColorName || variation.title;
    
    // Create clean display name by removing hex codes if no color info
    const cleanTitle = colorInfo ? displayName : variation.title.replace(/#[0-9a-fA-F]{6}/g, '').trim();
    
    // Extract color from variation for styling
    const color = colorInfo?.hex || colorOption?.value || '';
    
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: name, // Use clean product name without adding color suffix
      color: color, // Hex color for visual display
      colorName: enhancedColorName || cleanTitle, // Enhanced human-readable color name
      colorDisplayName: enhancedColorName || cleanTitle, // Enhanced display name
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      variationId: variation.id,
      // Store complete variation info for order processing
      variationInfo: {
        color: color,
        colorName: enhancedColorName,
        displayName: enhancedColorName,
        options: variation.options
      }
    };
  }
  return {
    id,
    name,
    slug,
    unit,
    image: image?.thumbnail,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
