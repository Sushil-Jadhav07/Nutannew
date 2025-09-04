import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  
  useEffect(() => {
    if (location.pathname) {
      const linkPath = location.pathname.split('/').filter(Boolean); // Filter removes empty strings
      
      const pathArray = linkPath.map((path, i) => {
        const isCategoryRoot = i === 0 && path.toLowerCase() === 'category';
        const breadcrumb = isCategoryRoot ? 'categories' : path;
        const segments = linkPath.slice(0, i + 1);
        if (isCategoryRoot) {
          segments[0] = 'categories';
        }
        const href = '/' + segments.join('/');
        return { breadcrumb, href };
      });
      
      setBreadcrumbs(pathArray);
    }
  }, [location.pathname]); // Re-run when pathname changes
  
  return breadcrumbs;
}
