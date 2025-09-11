import { Element } from 'react-scroll';
import  {useState, useMemo} from "react";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import {LIMITS} from "@/services/utils/limits";
import {ProductMainFiltered} from "@/components/product/productListing/product-main-filtered";
import {useParams, useSearchParams} from "react-router-dom";
import { useFirebaseProductsByCategory } from '@/hooks/useFirebaseProducts';
import SubcategoryBar from "@/pages/(default)/category/[slug]/subcategory-bar";
import { Product } from '@/services/types';
import { FilterProvider } from '@/contexts/FilterContext';

export default function PageContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	const [searchParams] = useSearchParams();
	
	// Get category query parameters
	const limit = LIMITS.PRODUCTS_LIMITS;
	const { slug } = useParams();
	
	// Get sort parameter from URL
	const sortBy = searchParams.get('sort_by') || 'new-arrival';
	
	// Map slug to Firebase productCategory
	const slugToCategory: Record<string, string> = {
		'bags-carry-items': 'bag',
		'tech-gadgets': 'technology',
		'office-stationery': 'office',
		'drinkware': 'drinkware',
		'gift-sets-kits': 'giftsets',
		'eco-lifestyle': 'lifestyle',
		'events-conference-essentials': 'events',
	};
	const firebaseCategory = slugToCategory[String(slug || '').toLowerCase()] || '';
	const { data, isLoading } = useFirebaseProductsByCategory(firebaseCategory, limit);
	
	// Sort products based on the selected sort option
	const sortedProducts = useMemo(() => {
		if (!data || !Array.isArray(data)) return [];
		
		const products = [...data]; // Create a copy to avoid mutating original data
		
		switch (sortBy) {
			case 'lowest':
				return products.sort((a, b) => {
					const priceA = a.sale_price || a.price || 0;
					const priceB = b.sale_price || b.price || 0;
					return priceA - priceB;
				});
			case 'highest':
				return products.sort((a, b) => {
					const priceA = a.sale_price || a.price || 0;
					const priceB = b.sale_price || b.price || 0;
					return priceB - priceA;
				});
			case 'best-selling':
				// Sort by quantity in stock (assuming higher quantity = more popular)
				return products.sort((a, b) => {
					const quantityA = a.quantity || 0;
					const quantityB = b.quantity || 0;
					return quantityB - quantityA;
				});
			case 'new-arrival':
			default:
				// Sort by creation date or ID (assuming higher ID = newer)
				return products.sort((a, b) => {
					// If products have createdAt field, use that
					if (a.createdAt && b.createdAt) {
						return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
					}
					// Fallback to ID comparison (assuming higher ID = newer)
					return parseInt(b.id) - parseInt(a.id);
				});
		}
	}, [data, sortBy]);
	
	
	return (
		<FilterProvider products={sortedProducts}>
			<Element name="category" className="flex products-category">
				<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
					<Filters/>
				</div>
				<div className="w-full">
					<SubcategoryBar />
					<DrawerFilter />
					<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
					<ProductMainFiltered data={sortedProducts} isLoading={isLoading} viewAs={viewAs}/>
				</div>
			</Element>
		</FilterProvider>
	);
}
