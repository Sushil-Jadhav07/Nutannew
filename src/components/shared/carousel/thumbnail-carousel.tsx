import {Navigation, Swiper, SwiperOptions, SwiperSlide, Thumbs} from '@/components/shared/carousel/slider';
import Image from '@/components/shared/image';
import {lazy, useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import {productGalleryPlaceholder} from '@/assets/placeholders';
const ImageLightBox = lazy(() => import("@/components/shared/image-lightbox"));
import {IoPlay} from "react-icons/io5";
import {usePanel} from "@/contexts/usePanel";

interface Props {
	gallery: any[];
	navigation?: boolean;
	thumbnailClassName?: string;
	galleryClassName?: string;
	videoUrl?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints: { [key: number]: SwiperOptions } = {
	1280: {
		slidesPerView: 6,
		direction: 'horizontal',
	},
	767: {
		slidesPerView: 4,
		direction: 'horizontal',
	},
	0: {
		slidesPerView: 3,
		direction: 'horizontal',
	},
};

const swiperParams: SwiperOptions = {
	slidesPerView: 1,
	spaceBetween: 0,
};

// Function to extract YouTube video ID from URL, including Shorts
const getYouTubeVideoId = (url?: string): string | null => {
	if (!url) return null;
	const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

const ThumbnailCarousel: React.FC<Props> = ({
												gallery,
												videoUrl,
												navigation = false,
												thumbnailClassName = 'xl:w-[500px]',
												galleryClassName = 'xl:w-full',
											}) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [showVideo, setShowVideo] = useState(false); // State to toggle video display
	const prevRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);
	const mainSwiperRef = useRef<any>(null); // Ref to control main Swiper instance

	// Autoplay video on component mount if videoUrl exists
	useEffect(() => {
		if (videoUrl) {
			setShowVideo(true);
		}
	}, [videoUrl]);

	// Handle slide change to stop video
	const handleSlideChange = (swiper: any) => {
		const activeIndex = swiper.activeIndex;
		setShowVideo(activeIndex === 0 && !!videoUrl);
	};

	// Handle video thumbnail click
	const handleVideoThumbnailClick = () => {
		if (videoUrl && mainSwiperRef.current?.swiper) {
			setShowVideo(true);
			mainSwiperRef.current.swiper.slideTo(0, 0); // Navigate to first slide (video)
		}
	};

	// Render play button overlay for the video thumbnail
	const renderCirclePlay = () => {
		return (
			<div className="absolute z-1 top-0 left-0 group w-full h-full flex justify-center items-center">
				<div
					className={cn("flex justify-center items-center text-white w-14 h-14 rounded-full ",
						"bg-black/80")}
				>
					<IoPlay className={cn("w-6 h-6")}/>
				</div>
			</div>
		);
	};

	// Get YouTube video ID
	const videoId = getYouTubeVideoId(videoUrl);
	const { selectedDirection } = usePanel();
	const dir = selectedDirection; // 'ltr' or 'rtl'

	return (
		<div className="w-full  relative">
			<ImageLightBox gallery={gallery}/>
			<div
				className={cn(
					'w-full mb-5   overflow-hidden  relative',
					thumbnailClassName
				)}
			>
				{/* Navigation elements */}
				{Boolean(navigation) && (
					<>
						<div ref={prevRef}
							 className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"></div>
						<div ref={nextRef}
							 className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"></div>
					</>
				)}

				< Swiper
					id="productGallery"
					dir={dir}
					className={`${dir === 'rtl' ? 'swiper-rtl' : ''}`}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					modules={[Navigation, Thumbs]}
					navigation={
						navigation
							? {
								prevEl: prevRef.current!,
								nextEl:  nextRef.current!,
							}
							: false
					}
					observer={true}
					observeParents={true}
					onSwiper={(swiper) => (mainSwiperRef.current = swiper)} // Assign Swiper instance
					onSlideChange={handleSlideChange}
					{...swiperParams}
				>
					{gallery?.map((item: any, index: number) => (
						<SwiperSlide
							key={`product-gallery-${item.id}`}
							className="text-center"
						>
							{index === 0 && showVideo && videoUrl && videoId ? (
								<iframe
									src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
									title={`YouTube video ${item.id}`}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="mx-auto  w-full h-[300px] lg:h-[510px]"
								/>
							) : (
								<Image
									src={item?.original ?? productGalleryPlaceholder}
									alt={`Product gallery ${item.id}`}
									width={600}
									height={510}
									className="mx-auto rounded-lg"
								/>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{/* End of product main slider */}

			<div className={`shrink-0 ${galleryClassName}`}>
				<Swiper
					id="productGalleryThumbs"
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					watchSlidesProgress={true}
					freeMode={true}
					observer={true}
					observeParents={true}
					breakpoints={galleryCarouselBreakpoints}
					modules={[Thumbs]}
				>
					{gallery?.map((item: any, index: number) => {
						const isFirstItem = index === 0;
						return (
							<SwiperSlide
								key={`product-thumb-gallery-${item.id}`}
								className="cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
								onClick={
									isFirstItem && videoUrl
										? handleVideoThumbnailClick
										: () => setShowVideo(false)
								}
								aria-label={isFirstItem && videoUrl ? "Play YouTube video" : `View product image ${item.id}`}
							>
								<Image
									src={item?.thumbnail ?? productGalleryPlaceholder}
									alt={`Product thumb gallery ${item.id}`}
									width={100}
									height={100}
								/>
								{isFirstItem && videoUrl && renderCirclePlay()}
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default ThumbnailCarousel;
