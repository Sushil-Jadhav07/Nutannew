import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFirebaseProduct } from '@/hooks/useFirebaseProduct';

// Function to format breadcrumb titles
export function formarBreadcrumbTitle(string: string): string {
  return string
      .replace(/-/g, ' ')
      .replace(/oe/g, 'ö')
      .replace(/ae/g, 'ä')
      .replace(/ue/g, 'ü')
      .toLowerCase();
}

// Define the breadcrumb type
interface Breadcrumb {
  breadcrumb: string;
  href: string;
}

// Custom hook for breadcrumbs
export default function useBreadcrumb(): Breadcrumb[] | null {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);
  
  // Check if current path is a product page
  const isProductPage = location.pathname.startsWith('/products/');
  const productId = isProductPage ? location.pathname.split('/')[2] : null;
  
  // Fetch product data if it's a product page
  const { data: productData } = useFirebaseProduct(productId || '');
  
  useEffect(() => {
    if (location.pathname) {
      const linkPath = location.pathname.split('/').filter(Boolean); // Filter removes empty strings
      
      const pathArray = linkPath.map((path, i) => {
        const isCategoryRoot = i === 0 && path.toLowerCase() === 'category';
        const isProductPage = i === 0 && path.toLowerCase() === 'products' && linkPath.length > 1;
        const isProductId = i === 1 && linkPath[0]?.toLowerCase() === 'products';
        
        let breadcrumb = path;
        
        // Handle category root
        if (isCategoryRoot) {
          breadcrumb = 'categories';
        }
        // Handle product page - show "Products" instead of "products"
        else if (isProductPage) {
          breadcrumb = 'Products';
        }
        // Handle product ID - show product name if available, otherwise show formatted ID
        else if (isProductId && productData?.name) {
          breadcrumb = productData.name;
        }
        // Handle product ID - show formatted ID if no product data yet
        else if (isProductId && !productData) {
          breadcrumb = path; // Keep the ID as fallback
        }
        
        const segments = linkPath.slice(0, i + 1);
        if (isCategoryRoot) {
          segments[0] = 'categories';
        }
        const href = '/' + segments.join('/');
        return { breadcrumb, href };
      });
      
      setBreadcrumbs(pathArray);
    }
  }, [location.pathname, productData]); // Re-run when pathname or product data changes
  
  return breadcrumbs;
}
