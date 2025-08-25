
import {useCategoriesQuery} from "@/services/category/get-all-categories";
import {CategoriesContainer} from "@/components/category/categories-container";

export default function CategoriesPageContent() {
	const {data : categories} = useCategoriesQuery({
		limit: 9,
	});
	
	return <CategoriesContainer categories = {categories}/>
}
