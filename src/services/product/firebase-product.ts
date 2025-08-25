import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Product } from '@/services/types';

// Firebase Product interface (matching your actual Firestore structure)
export interface FirebaseProduct {
  id: string;
  productName: string;
  productSku: string;
  productPrice: string;
  productQuantity: string;
  productDescription: string;
  productCategory: string;
  productStatus: string;
  productType: string;
  productInventoryStatus: string;
  productImages: string[];
  productMetaTitle: string;
  productMetaDescription: string;
  productReviews: string;
  productSize: string;
  productDimension: Array<{
    batteryLife?: string;
    dimensions?: string;
    materials?: string;
    weight?: string;
    color?: string;
    note?: string;
  }>;
  customDimensions?: Array<{
    title: string;
    value: string;
  }>;
  bannerImageOne?: string;
  bannerImageTwo?: string;
  variation: Array<{
    color: string;
    img: string;
    price: number;
    quantity: number;
    size: string[];
    status: string;
  }>;
  createdAtDate: any;
}

// Transform Firebase data to match existing Product interface
const transformFirebaseProduct = (doc: any): Product => {
  const data = doc.data();
  
  // Debug: Log the raw Firebase data
  console.log('🔍 Raw Firebase data:', {
    productDimension: data.productDimension,
    customDimensions: data.customDimensions,
    variation: data.variation
  });
  
  // Get the first product image as the main image
  const mainImage = data.productImages && data.productImages.length > 0 ? data.productImages[0] : '';
  
  // Get the first variation price as sale price if available
  const variationPrice = data.variation && data.variation.length > 0 ? data.variation[0].price : null;
  
  // Get weight from productDimension if available
  const weight = data.productDimension && data.productDimension.length > 0 ? 
    parseFloat(data.productDimension[0].weight || '0') : 0;
  
  // Use document ID as the primary product identifier (productID)
  const productID = doc.id;
  
  // Transform variations to match the expected format
  const transformedVariations = data.variation?.map((v: any, index: number) => ({
    id: index + 1,
    attribute_id: 1,
    value: v.size?.[0] || '', // Use first size as default
    attribute: {
      id: 1,
      slug: 'size',
      name: 'Size',
      type: 'dropdown' as const,
      values: v.size?.map((s: string, sizeIndex: number) => ({
        id: sizeIndex + 1,
        attribute_id: 1,
        value: s,
        image: v.img
      })) || []
    }
  })) || [];

  // Create variation options for pricing
  const variationOptions = data.variation?.map((v: any, index: number) => ({
    id: index + 1,
    options: v.size?.map((s: string, sizeIndex: number) => ({
      id: sizeIndex + 1,
      attribute_id: 1,
      value: s,
      image: v.img
    })) || [],
    price: v.price,
    quantity: v.quantity,
    color: v.color,
    status: v.status
  })) || [];
  
  const result = {
    id: productID, // Primary identifier - Firebase document ID
    name: data.productName || '',
    slug: productID, // Use productID for slug instead of productSku for consistency
    price: parseFloat(data.productPrice || '0'),
    quantity: parseInt(data.productQuantity || '0'),
    sold: 0, // Not available in your data, defaulting to 0
    videoUrl: '',
    sale_price: variationPrice || parseFloat(data.productPrice || '0'),
    min_price: parseFloat(data.productPrice || '0'),
    max_price: variationPrice || parseFloat(data.productPrice || '0'),
    variation_options: variationOptions,
    variations: transformedVariations,
    image: {
      id: productID,
      thumbnail: mainImage,
      original: mainImage,
      original2: mainImage
    },
    sku: data.productSku || '', // Keep productSku as a separate field
    gallery: data.productImages?.map((img: string, index: number) => ({
      id: `${productID}-${index}`,
      thumbnail: img,
      original: img,
      original2: img
    })) || [],
    category: [{
      id: 1,
      name: data.productCategory || 'Uncategorized',
      slug: data.productCategory?.toLowerCase() || 'uncategorized'
    }],
    tag: [],
    meta: [],
    brand: data.productType || '',
    unit: 'piece',
    model: data.productSku || '', // Keep using productSku for model
    operating: '',
    screen: '',
    description: data.productDescription || '',
    rating: 4.5, // Default rating since not available in your data
    discountPercentage: 0, // Default discount since not available in your data
    weight: weight,
    // Add Firebase-specific fields
    productDimension: data.productDimension || [],
    customDimensions: data.customDimensions || [],
    bannerImageOne: data.bannerImageOne || '',
    bannerImageTwo: data.bannerImageTwo || '',
    productReviews: data.productReviews || '',
    productMetaTitle: data.productMetaTitle || '',
    productMetaDescription: data.productMetaDescription || '',
    productInventoryStatus: data.productInventoryStatus || '',
    productStatus: data.productStatus || '',
    createdAtDate: data.createdAtDate || null
  };
  
  // Debug: Log the transformed product object
  console.log('✅ Transformed product object:', {
    productDimension: result.productDimension,
    customDimensions: result.customDimensions
  });
  
  return result;
};

// Fetch a single product from Firebase by ID
export const fetchProductFromFirebase = async (productId: string): Promise<Product | null> => {
  try {
    console.log('🔍 Fetching product from Firebase by ID:', productId);
    
    const productRef = doc(db, 'Product', productId);
    const productSnapshot = await getDoc(productRef);
    
    if (!productSnapshot.exists()) {
      console.log('❌ Product not found in Firebase:', productId);
      return null;
    }
    
    const product = transformFirebaseProduct(productSnapshot);
    console.log('✅ Transformed product:', product.name, '(ProductID:', product.id, ', SKU:', product.sku, ')');
    
    return product;
    
  } catch (error) {
    console.error('❌ Error fetching product from Firebase:', error);
    return null;
  }
};
