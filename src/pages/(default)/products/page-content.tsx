import { Element } from 'react-scroll';

import ProductDetailsTab from "@/components/product/productDetails/description-tab";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import {useProductQuery} from "@/services/product/get-product";
import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";

import useCustomParams from "@/utils/use-custom-params";
import Loading from "@/components/shared/loading";


export default function PageContent() {
	const pathname = useCustomParams();
	const {slug} = pathname;
	const {data , isLoading} = useProductQuery(slug as string);

	if (isLoading) return <Loading/>
	
	return (
		<>
			<Element name="category" className="xl:flex flex-row-reverse">
				<div className="xl:sticky z-40  lg:block h-full shrink-0 top-16 w-full  xl:w-[36%] ">
					<ProductView data={data} className={"mb-8 lg:mb-10 bg-white p-5 md:p-7 rounded "}/>
				</div>
				<div className="w-full  xl:w-[64%] xl:pe-8  xl:mb-0 mb-8">
					<ProductGallery data={data} className={"mb-8 lg:mb-8 bg-white p-5 md:p-7 rounded"}/>
					<ProductDetailsTab/>
				</div>
			
			</Element>
			
			<RelatedProductSlider/>
		</>
	
	
	);
}
