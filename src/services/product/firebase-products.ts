import { collection, getDocs, query, where, orderBy, limit, QuerySnapshot, DocumentData } from 'firebase/firestore';
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
  }>;
  variation: Array<{
    color: string;
    img: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  createdAtDate: any;
}

// Transform Firebase data to match existing Product interface
const transformFirebaseProduct = (doc: DocumentData): Product => {
  const data = doc.data();
  
  // Get the first product image as the main image
  const mainImage = data.productImages && data.productImages.length > 0 ? data.productImages[0] : '';
  
  // Get the first variation price as sale price if available
  const variationPrice = data.variation && data.variation.length > 0 ? data.variation[0].price : null;
  
  // Get weight from productDimension if available
  const weight = data.productDimension && data.productDimension.length > 0 ? 
    parseFloat(data.productDimension[0].weight || '0') : 0;
  
  // Use document ID as the primary product identifier (productID)
  const productID = doc.id;
  
  return {
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
    variation_options: data.variation?.map((v: any) => ({ quantity: v.quantity?.toString() || '0' })) || [],
    variations: data.variation?.map((v: any) => ({
      id: 1,
      attribute_id: 1,
      value: v.size || '',
      attribute: {
        id: 1,
        slug: 'size',
        name: 'Size',
        type: 'dropdown' as const,
        values: []
      }
    })) || [],
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
    weight: weight
  };
};

// Fetch random products from Firebase
export const fetchBestSellerProductsFromFirebase = async (limitCount: number = 10): Promise<Product[]> => {
  try {
    console.log('🔍 Fetching products from Firebase collection: Product');
    const productsRef = collection(db, 'Product'); // Note: Capital P as per your Firebase
    
    // First, get all products to shuffle them
    const allProductsQuery = query(productsRef);
    const allProductsSnapshot: QuerySnapshot = await getDocs(allProductsQuery);
    
    console.log(`📊 Found ${allProductsSnapshot.size} products in Firebase`);
    
    if (allProductsSnapshot.empty) {
      console.log('❌ No products found in Firebase collection: Product');
      return [];
    }
    
    // Convert to array and shuffle
    const allProducts: Product[] = [];
    allProductsSnapshot.forEach((doc) => {
      const product = transformFirebaseProduct(doc);
      console.log(`✅ Transformed product: ${product.name} (ProductID: ${product.id}, SKU: ${product.sku})`);
      allProducts.push(product);
    });
    
    // Shuffle the products array
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    
    // Return the first 'limitCount' products
    const result = shuffledProducts.slice(0, limitCount);
    console.log(`🎯 Returning ${result.length} random products using ProductID as primary identifier`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching random products from Firebase:', error);
    return [];
  }
};

// Fetch random products from Firebase
export const fetchPopularProductsFromFirebase = async (limitCount: number = 10): Promise<Product[]> => {
  try {
    console.log('🔍 Fetching popular products from Firebase collection: Product');
    const productsRef = collection(db, 'Product'); // Note: Capital P as per your Firebase
    
    // First, get all products to shuffle them
    const allProductsQuery = query(productsRef);
    const allProductsSnapshot: QuerySnapshot = await getDocs(allProductsQuery);
    
    console.log(`📊 Found ${allProductsSnapshot.size} products in Firebase`);
    
    if (allProductsSnapshot.empty) {
      console.log('❌ No products found in Firebase');
      return [];
    }
    
    // Convert to array and shuffle
    const allProducts: Product[] = [];
    allProductsSnapshot.forEach((doc) => {
      const product = transformFirebaseProduct(doc);
      console.log(`✅ Transformed popular product: ${product.name} (ProductID: ${product.id}, SKU: ${product.sku})`);
      allProducts.push(product);
    });
    
    // Shuffle the products array
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    
    // Return the first 'limitCount' products
    const result = shuffledProducts.slice(0, limitCount);
    console.log(`🎯 Returning ${result.length} popular products using ProductID as primary identifier`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching popular products from Firebase:', error);
    return [];
  }
};

// Fetch random products from Firebase
export const fetchFeaturedProductsFromFirebase = async (limitCount: number = 10): Promise<Product[]> => {
  try {
    console.log('🔍 Fetching featured products from Firebase collection: Product');
    const productsRef = collection(db, 'Product'); // Note: Capital P as per your Firebase
    
    // First, get all products to shuffle them
    const allProductsQuery = query(productsRef);
    const allProductsSnapshot: QuerySnapshot = await getDocs(allProductsQuery);
    
    console.log(`📊 Found ${allProductsSnapshot.size} products in Firebase`);
    
    if (allProductsSnapshot.empty) {
      console.log('❌ No products found in Firebase');
      return [];
    }
    
    // Convert to array and shuffle
    const allProducts: Product[] = [];
    allProductsSnapshot.forEach((doc) => {
      const product = transformFirebaseProduct(doc);
      console.log(`✅ Transformed featured product: ${product.name} (ProductID: ${product.id}, SKU: ${product.sku})`);
      allProducts.push(product);
    });
    
    // Shuffle the products array
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    
    // Return the first 'limitCount' products
    const result = shuffledProducts.slice(0, limitCount);
    console.log(`🎯 Returning ${result.length} featured products using ProductID as primary identifier`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching featured products from Firebase:', error);
    return [];
  }
};

// Fetch all products from Firebase (with optional filtering)
export const fetchAllProductsFromFirebase = async (
  limitCount: number = 20,
  category?: string,
  brand?: string
): Promise<Product[]> => {
  try {
    console.log('🔍 Fetching all products from Firebase collection: Product');
    const productsRef = collection(db, 'Product'); // Note: Capital P as per your Firebase
    let q = query(productsRef, orderBy('createdAtDate', 'desc'), limit(limitCount));
    
    if (category) {
      q = query(productsRef, where('productCategory', '==', category), orderBy('createdAtDate', 'desc'), limit(limitCount));
      console.log(`📂 Filtering by category: ${category}`);
    }
    
    if (brand) {
      q = query(productsRef, where('productType', '==', brand), orderBy('createdAtDate', 'desc'), limit(limitCount));
      console.log(`🏷️ Filtering by brand: ${brand}`);
    }
    
    const querySnapshot: QuerySnapshot = await getDocs(q);
    console.log(`📊 Found ${querySnapshot.size} products in Firebase`);
    
    if (querySnapshot.empty) {
      console.log('❌ No products found in Firebase');
      return [];
    }
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const product = transformFirebaseProduct(doc);
      console.log(`✅ Transformed product: ${product.name} (ProductID: ${product.id}, SKU: ${product.sku})`);
      products.push(product);
    });
    
    console.log(`🎯 Returning ${products.length} products using ProductID as primary identifier`);
    return products;
  } catch (error) {
    console.error('❌ Error fetching products from Firebase:', error);
    return [];
  }
};

// Fetch products by category from Firebase
export const fetchProductsByCategoryFromFirebase = async (
  category: string,
  limitCount: number = 20
): Promise<Product[]> => {
  try {
    console.log(`🔍 Fetching products from Firebase for category: ${category}`);
    const productsRef = collection(db, 'Product');
    
    // Query products by category
    const q = query(
      productsRef, 
      where('productCategory', '==', category),
      orderBy('createdAtDate', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot: QuerySnapshot = await getDocs(q);
    console.log(`📊 Found ${querySnapshot.size} products for category: ${category}`);
    
    if (querySnapshot.empty) {
      console.log(`⚠️ No products found for category: ${category}`);
      return [];
    }
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const product = transformFirebaseProduct(doc);
      console.log(`✅ Transformed product: ${product.name} (Category: ${product.category[0]?.name})`);
      products.push(product);
    });
    
    console.log(`🎯 Returning ${products.length} products for category: ${category}`);
    return products;
    
  } catch (error) {
    console.error(`❌ Error fetching products for category ${category} from Firebase:`, error);
    return [];
  }
};
