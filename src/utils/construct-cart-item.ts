import isEmpty from 'lodash/isEmpty';
import {VariationOption} from "@/services/types";
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
    // Create clean display name by removing hex codes
    const cleanTitle = variation.title.replace(/#[0-9a-fA-F]{6}/g, '').trim();
    
    // Extract color from variation title for styling
    const colorMatch = variation.title.match(/#[0-9a-fA-F]{6}/);
    const color = colorMatch ? colorMatch[0] : '';
    
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${cleanTitle}`,
      color: color, // Add color for visual display
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      variationId: variation.id,
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
