import { Element } from 'react-scroll';
import { useState } from 'react';

import ProductDetailsTab from "@/components/product/productDetails/description-tab";
import RelatedProductSlider from "@/components/product/feeds/related-product-feed";
import ProductGalleryNew from "@/components/product/productDetails/product-gallery-new";
import ProductViewNew from "@/components/product/productDetails/product-view-new";
import useCustomParams from "@/utils/use-custom-params";
import Loading from '@/components/shared/loading';
import { useFirebaseProduct } from "@/hooks/useFirebaseProduct";

export default function PageContentNew() {
	const pathname = useCustomParams();
	const { slug } = pathname;
	const { data, isLoading, error } = useFirebaseProduct(slug as string);
	const [selectedColor, setSelectedColor] = useState<string>('');
	
	console.log('📄 PageContentNew: Product data loaded:', !!data);
	console.log('📄 PageContentNew: Selected color:', selectedColor);

	const handleColorChange = (color: string) => {
		console.log('📄 PageContentNew: Color changed to:', color);
		setSelectedColor(color);
	};

	if (isLoading) return <Loading />

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
					<ProductGalleryNew 
						data={data} 
						className={"col-span-5 "}
						selectedColor={selectedColor}
					/>
					<ProductViewNew 
						data={data} 
						className={"col-span-5 "}
						onColorChange={handleColorChange}
					/>
				</div>
				<ProductDetailsTab data={data}/>
				<RelatedProductSlider/>
			</div>
		</Element>
	);
}
