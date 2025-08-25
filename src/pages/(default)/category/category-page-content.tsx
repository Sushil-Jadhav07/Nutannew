
import { Element } from 'react-scroll';
import {useState} from "react";
import TopBar from "@/components/category/top-bar";
import {ProductLoadmore} from "@/components/product/productListing/product-loadmore";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import {LIMITS} from "@/services/utils/limits";
import { useLocation } from 'react-router-dom';
import {useMoreProductsQuery} from "@/services/product/get-all-more-products";
import useQueryParam from '@/utils/use-query-params';


export default function CategoryPageContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	const { pathname, search } = useLocation(); // Replaced usePathname with useLocation
	const { getParams } = useQueryParam(`${pathname}${search}`); // Adjusted for useLocation
	
	const newQuery:  { sort_by?: string } = getParams(
		`${import.meta.env.VITE_PUBLIC_WEBSITE_URL}${pathname}${search}`,
	);
	
	// Get category query parameters
	const limit = LIMITS.PRODUCTS_LIMITS;
	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		data,
	} = useMoreProductsQuery({
		limit: limit,
		sort_by: newQuery.sort_by,
	});
	
	
	return (
		<Element name="category" className="flex products-category">
			<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
				<Filters/>
			</div>
			<div className="w-full">
				<DrawerFilter />
				<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
				<ProductLoadmore data={data} isLoading={isLoading} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} loadingMore={loadingMore} viewAs={viewAs}/>
			</div>
		</Element>
	
	);
}
