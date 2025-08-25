import { useQuery } from '@tanstack/react-query';
import { 
  fetchBestSellerProductsFromFirebase, 
  fetchPopularProductsFromFirebase,
  fetchFeaturedProductsFromFirebase,
  fetchAllProductsFromFirebase,
  fetchProductsByCategoryFromFirebase
} from '@/services/product/firebase-products';
import { Product } from '@/services/types';

// Hook for best seller products
export const useFirebaseBestSellerProducts = (limitCount: number = 10) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-best-seller-products', limitCount],
    queryFn: () => fetchBestSellerProductsFromFirebase(limitCount),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for popular products
export const useFirebasePopularProducts = (limitCount: number = 10) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-popular-products', limitCount],
    queryFn: () => fetchPopularProductsFromFirebase(limitCount),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for featured products
export const useFirebaseFeaturedProducts = (limitCount: number = 10) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-featured-products', limitCount],
    queryFn: () => fetchFeaturedProductsFromFirebase(limitCount),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for all products with optional filtering
export const useFirebaseAllProducts = (
  limitCount: number = 20,
  category?: string,
  brand?: string
) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-all-products', limitCount, category, brand],
    queryFn: () => fetchAllProductsFromFirebase(limitCount, category, brand),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for products by category
export const useFirebaseProductsByCategory = (category: string, limitCount: number = 20) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-products-by-category', category, limitCount],
    queryFn: () => fetchProductsByCategoryFromFirebase(category, limitCount),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for products by brand
export const useFirebaseProductsByBrand = (brand: string, limitCount: number = 20) => {
  return useQuery<Product[], Error>({
    queryKey: ['firebase-products-by-brand', brand, limitCount],
    queryFn: () => fetchAllProductsFromFirebase(limitCount, undefined, brand),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for categories
export const useFirebaseCategories = () => {
  return useQuery({
    queryKey: ['firebase-categories'],
    queryFn: () => import('@/services/product/firebase-categories').then(module => module.fetchCategoriesFromFirebase()),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
