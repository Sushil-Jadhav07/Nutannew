import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Function to create a query string from an object
export function createQueryString(queryObj: Record<string, string | number | boolean>): string {
  return Object.entries(queryObj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}

// Custom hook for managing query parameters
export default function useQueryParam(pathname: string = '/'): {
  query: string;
  loading: boolean;
  getParams: (url?: string | URL) => Record<string, string | string[]>;
  setQueryparams: (data: Record<string, string | number | boolean> | string) => void;
  updateQueryparams: (key: string, value: string | number | boolean) => void;
  clearQueryParam: (keys: string[]) => void;
} {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>(''); // Replace jotai's atom with useState
  const [loading, setLoading] = useState<boolean>(true);
  
  // Sync query state with URL on mount and location change
  useEffect(() => {
    setQuery(location.search);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location.search]);
  
  // Clear specific query parameters
  const clearQueryParam = (keys: string[]) => {
    const url = new URL(window.location.href);
    keys.forEach((key) => url.searchParams.delete(key));
    setQuery(url.search);
    navigate(`${pathname}${url.search}`, { replace: true }); // Use replace to avoid history stack growth
  };
  
  // Set query parameters (overwrite existing)
  const setQueryparams = (data: Record<string, string | number | boolean> | string) => {
    const queryString = typeof data === 'string' ? data : createQueryString(data);
    setQuery(queryString ? `?${queryString}` : ''); // Ensure proper formatting
    navigate(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };
  
  // Get all query parameters from a URL
  const getParams = (url: string | URL = window.location.href): Record<string, string | string[]> => {
    const params: Record<string, string | string[]> = {};
    new URL(url).searchParams.forEach((val, key) => {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key] as string];
        }
        (params[key] as string[]).push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  };
  
  // Update a single query parameter
  const updateQueryparams = (key: string, value: string | number | boolean) => {
    if (value === '' || value === null || value === undefined) {
      clearQueryParam([key]);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(key, value.toString());
    setQuery(url.search);
    navigate(`${pathname}${url.search}`);
  };
  
  return {
    query,
    loading,
    getParams,
    setQueryparams,
    updateQueryparams,
    clearQueryParam,
  };
}
