import {useEffect, useState, useMemo} from "react";
import { Element } from 'react-scroll';
import {useFirebaseSearchQuery} from "@/services/product/use-search";
import DrawerFilter from "@/components/category/drawer-filter";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import Heading from "@/components/shared/heading";
import {ProductMainFiltered} from "@/components/product/productListing/product-main-filtered";
import { FilterProvider } from '@/contexts/FilterContext';
import { useFirebaseAllProducts } from '@/hooks/useFirebaseProducts';
import SearchDebug from '@/components/search/search-debug';

// Custom hook to replace Next.js useSearchParams
const useCustomSearchParams = () => {
	const [searchParams, setSearchParams] = useState<URLSearchParams>(
		new URLSearchParams(window.location.search)
	);
	
	useEffect(() => {
		const handleUrlChange = () => {
			setSearchParams(new URLSearchParams(window.location.search));
		};
		
		window.addEventListener('popstate', handleUrlChange);
		return () => {
			window.removeEventListener('popstate', handleUrlChange);
		};
	}, []);
	
	return {
		get: (param: string) => searchParams.get(param),
		set: (param: string, value: string) => {
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set(param, value);
			
			const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
			window.history.pushState({}, '', newUrl);
			setSearchParams(newSearchParams);
		}
	};
};


export default function PageContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	// Get search and category query parameters
	const searchParams = useCustomSearchParams();
	const searchTerm = searchParams.get('q') || '';
	const sortBy = searchParams.get('sort_by') || 'new-arrival';
	
	// Get all products from Firebase for enhanced search
	const { data: allProducts, isLoading: isLoadingProducts } = useFirebaseAllProducts(1000);
	
	// Use Firebase search for better results
	const { data: searchResults, isLoading } = useFirebaseSearchQuery(searchTerm, allProducts || []);
	
	// Sort search results based on the selected sort option
	const sortedResults = useMemo(() => {
		if (!searchResults || !Array.isArray(searchResults)) return [];
		
		const results = [...searchResults]; // Create a copy to avoid mutating original data
		
		switch (sortBy) {
			case 'lowest':
				return results.sort((a, b) => {
					const priceA = a.sale_price || a.price || 0;
					const priceB = b.sale_price || b.price || 0;
					return priceA - priceB;
				});
			case 'highest':
				return results.sort((a, b) => {
					const priceA = a.sale_price || a.price || 0;
					const priceB = b.sale_price || b.price || 0;
					return priceB - priceA;
				});
			case 'best-selling':
				// Sort by quantity in stock (assuming higher quantity = more popular)
				return results.sort((a, b) => {
					const quantityA = a.quantity || 0;
					const quantityB = b.quantity || 0;
					return quantityB - quantityA;
				});
			case 'new-arrival':
			default:
				// Sort by creation date or ID (assuming higher ID = newer)
				return results.sort((a, b) => {
					// If products have createdAt field, use that
					if (a.createdAt && b.createdAt && typeof a.createdAt === 'string' && typeof b.createdAt === 'string') {
						return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
					}
					// Fallback to ID comparison (assuming higher ID = newer)
					return parseInt(String(b.id)) - parseInt(String(a.id));
				});
		}
	}, [searchResults, sortBy]);
	
	return (
		<FilterProvider products={sortedResults}>
			<Element name="category" className="flex products-category">
				<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
					<Filters/>
				</div>
				<div className="w-full">
					{/* Debug component - remove this after fixing */}
					<SearchDebug />
					
					<div
						className="sm:flex items-center justify-center mb-3 filters-panel bg-white rounded p-2 xl:p-4 text-center">
						<Heading
							variant={"titleMedium"}>
							{searchTerm ? 
								`${searchResults?.length ?? 0} results for "${searchTerm}"` : 
								'Search for products, categories, and brands'
							}
						</Heading>
					</div>
					<DrawerFilter/>
					<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
					<ProductMainFiltered data={sortedResults} isLoading={isLoading || isLoadingProducts} viewAs={viewAs}/>
				</div>
			</Element>
		</FilterProvider>
	);
}
