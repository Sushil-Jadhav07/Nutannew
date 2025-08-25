import { Element } from 'react-scroll';
import { useState } from 'react';

import ProductDetailsTab from "@/components/product/productDetails/description-tab";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";
import useCustomParams from "@/utils/use-custom-params";
import Loading from '@/components/shared/loading';
import { useFirebaseProduct } from "@/hooks/useFirebaseProduct";

export default function PageContent() {
	const pathname = useCustomParams();
	const {slug} = pathname;
	const {data, isLoading, error} = useFirebaseProduct(slug as string);
	const [selectedVariation, setSelectedVariation] = useState<any>(null);

	if (isLoading) return <Loading/>
	
	if (error) {
		console.error('Error fetching product:', error);
		return <div className="text-center py-10">Error loading product. Please try again.</div>;
	}
	
	if (!data) {
		return <div className="text-center py-10">Product not found.</div>;
	}
	
	return (
		<Element name="category" className="products-category">
			<div className="w-full">
				<div className="grid-cols-10 lg:grid gap-7 2xl:gap-10 mb-8 lg:mb-10 bg-white p-5 md:p-7 rounded">
					<ProductGallery 
						data={data} 
						className={"col-span-5 "}
						selectedVariation={selectedVariation}
					/>
					<ProductView 
						data={data} 
						className={"col-span-5 "}
						onVariationChange={setSelectedVariation}
					/>
				</div>
				<ProductDetailsTab data={data}/>
				<RelatedProductSlider/>
			</div>

		</Element>

	);
}
