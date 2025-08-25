
import {useState} from "react";
import TopBar from "@/components/category/top-bar";
import DrawerFilter from "@/components/category/drawer-filter";
import {ProductMain} from "@/components/product/productListing/product-main";
import {LIMITS} from "@/services/utils/limits";
import {useProductsQuery} from "@/services/product/get-all-products";
import {useLocation} from "react-router-dom";
import useQueryParam from "@/utils/use-query-params";

export default function CanvasContent() {
	const [viewAs, setViewAs] = useState(Boolean(true));
	const { pathname, search } = useLocation(); // Replaced usePathname with useLocation
	const { getParams } = useQueryParam(`${pathname}${search}`); // Adjusted for useLocation
	
	const newQuery:  { sort_by?: string } = getParams(
		`${import.meta.env.VITE_PUBLIC_WEBSITE_URL}${pathname}${search}`,
	);
	
	// Get category query parameters
	const limit = LIMITS.PRODUCTS_LIMITS;
	const { data, isLoading } = useProductsQuery({
		limit: limit,
		sort_by: newQuery.sort_by,
	});
	
	return (
		<div className=" products-category">
			<div className="w-full">
				<DrawerFilter isDesktop={true}/>
				<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
				<ProductMain data={data} isLoading={isLoading} viewAs={viewAs}/>
			</div>
		</div>

	);
}
