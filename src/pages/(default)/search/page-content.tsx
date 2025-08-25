import {useEffect, useState} from "react";
import { Element } from 'react-scroll';
import {useSearchQuery} from "@/services/product/use-search";
import DrawerFilter from "@/components/category/drawer-filter";
import TopBar from "@/components/category/top-bar";
import Filters from "@/components/filter/filters";
import Heading from "@/components/shared/heading";
import {ProductMain} from "@/components/product/productListing/product-main";

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
	const { data: searchResults, isLoading } = useSearchQuery({
		text: searchTerm,
	});
	
	return (
		<Element name="category" className="flex products-category">
			<div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
				<Filters/>
			</div>
			<div className="w-full">
				<div
					className="sm:flex items-center justify-center mb-3 filters-panel bg-white rounded p-2 xl:p-4 text-center">
					<Heading
						variant={"titleMedium"}>{`${searchResults?.length ?? ''} results for "${searchTerm}"`}</Heading>
				</div>
				<DrawerFilter/>
				<TopBar viewAs={viewAs} setViewAs={setViewAs}/>
				<ProductMain data={searchResults} isLoading={isLoading} viewAs={viewAs}/>
			</div>
		</Element>

	);
}
