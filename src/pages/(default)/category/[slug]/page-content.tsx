import { Element } from 'react-scroll';
import  {useState} from "react";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import {LIMITS} from "@/services/utils/limits";
import {ProductMain} from "@/components/product/productListing/product-main";
import {useParams} from "react-router-dom";
import { useFirebaseProductsByCategory } from '@/hooks/useFirebaseProducts';
import SubcategoryBar from "@/pages/(default)/category/[slug]/subcategory-bar";

export default function PageContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	
	// Get category query parameters
	const limit = LIMITS.PRODUCTS_LIMITS;
	const { slug } = useParams();
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
	
	
	return (
		<Element name="category" className="flex products-category">
			<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
				<Filters/>
			</div>
			<div className="w-full">
				<SubcategoryBar />
				<DrawerFilter />
				<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
				<ProductMain data={data} isLoading={isLoading} viewAs={viewAs}/>
			</div>
		</Element>
	
	);
}
