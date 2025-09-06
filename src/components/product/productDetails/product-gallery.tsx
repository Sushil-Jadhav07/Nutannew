import React from "react";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import {Product} from "@/services/types";
import cn from "classnames";
import {productPlaceholder} from "@/assets/placeholders";

interface GalleryProps {
	className?: string;
	data?: Product;
	selectedColor?: string; // Simplified to just selected color
}

const ProductGallery: React.FC<GalleryProps> = ({data, className, selectedColor}) => {
	// Simple and direct image selection based on selected color
	const getCurrentImage = () => {
		if (selectedColor && data?.variation) {
			const colorVariation = data.variation.find((v: any) => v.color === selectedColor);
			if (colorVariation?.img) {
				return colorVariation.img;
			}
		}
		
		// Fallback to default image
		return data?.image?.original || data?.gallery?.[0]?.original || productPlaceholder;
	};

	const currentImage = getCurrentImage();

	// Create a dynamic gallery that prioritizes the selected color image
	const getDynamicGallery = () => {
		if (!data?.gallery || data.gallery.length === 0) {
			return [];
		}

		// If we have a selected color with an image, put it first
		if (selectedColor && currentImage && currentImage !== data.gallery[0]?.original && currentImage.trim() !== "") {
			const variationImage = {
				id: 'variation-image',
				thumbnail: currentImage,
				original: currentImage,
				original2: currentImage
			};
			
			// Filter out the original first image if it's the same as variation image
			const filteredGallery = data.gallery.filter(img => img.original !== currentImage);
			
			return [variationImage, ...filteredGallery];
		}

		return data.gallery;
	};

	const dynamicGallery = getDynamicGallery();

	return (
		<div className={cn("mb-6 overflow-hidden  md:mb-8 lg:mb-0",className)}>
			{dynamicGallery.length > 0 ? (
				<ThumbnailCarousel
					gallery={dynamicGallery}
					videoUrl={data?.videoUrl}
					thumbnailClassName="xl:w-full"
					galleryClassName="xl:w-full"
				/>
			) : (
				<div className="flex items-center justify-center bg-gray-50 rounded-lg min-h-[400px] lg:min-h-[480px]">
					<img
						src={currentImage && currentImage.trim() !== "" ? currentImage : productPlaceholder}
						alt={data?.name ?? 'product name'}
						className="max-w-full max-h-full object-contain rounded-lg"
						style={{ maxHeight: '480px' }}
					/>
				</div>
			)}
		</div>
	);
}
export default ProductGallery;
