import React from "react";
import ThumbnailCarousel from "@/components/shared/carousel/thumbnail-carousel";
import Image from "@/components/shared/image";
import {Product} from "@/services/types";
import cn from "classnames";
import {productPlaceholder} from "@/assets/placeholders";

interface GalleryProps {
	className?: string;
	data?: Product;
	selectedVariation?: any; // Add selected variation prop
}

const ProductGallery: React.FC<GalleryProps> = ({data, className, selectedVariation}) => {
	// Get the appropriate image based on selected variation
	const getCurrentImage = () => {
		if (selectedVariation && data?.variation_options) {
			// Find the matching Firebase variation
			const firebaseVariation = data.variation_options.find((v: any) => {
				if (selectedVariation.options) {
					return selectedVariation.options.every((opt: any) => {
						if (opt.name === 'color') return v.color === opt.value;
						return true;
					});
				}
				return false;
			});
			
			// Return the variation image if found and not empty
			if (firebaseVariation && firebaseVariation.options && firebaseVariation.options.length > 0) {
				const variationImage = firebaseVariation.options[0].image;
				if (variationImage && variationImage.trim() !== "") {
					return variationImage;
				}
			}
		}
		
		// Fallback to first gallery image or main image, ensuring no empty strings
		const galleryImage = data?.gallery?.[0]?.original;
		const mainImage = data?.image?.original;
		
		if (galleryImage && galleryImage.trim() !== "") {
			return galleryImage;
		}
		if (mainImage && mainImage.trim() !== "") {
			return mainImage;
		}
		
		return productPlaceholder;
	};

	const currentImage = getCurrentImage();

	// Create a dynamic gallery that prioritizes the selected variation image
	const getDynamicGallery = () => {
		if (!data?.gallery || data.gallery.length === 0) {
			return [];
		}

		// If we have a selected variation with an image, put it first
		if (selectedVariation && currentImage && currentImage !== data.gallery[0]?.original && currentImage.trim() !== "") {
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
				<div className="flex items-center justify-center w-auto">
					<Image
						src={currentImage && currentImage.trim() !== "" ? currentImage : productPlaceholder}
						alt={data?.name ?? 'product name'}
						width={480}
						height={480}
					/>
				</div>
			)}
		</div>
	);
}
export default ProductGallery;
