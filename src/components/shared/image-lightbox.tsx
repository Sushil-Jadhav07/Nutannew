// src/components/image-lightbox.tsx
import { FC, Suspense, lazy, useState } from "react";
import { IoExpandOutline } from "react-icons/io5";

// Lazy-load the Lightbox component
const LightboxComponent = lazy(() =>
    import("yet-another-react-lightbox").then((module) => ({
        default: module.default,
    }))
);

interface ImgGalleryProps {
    gallery: any[];
}

const ImageLightBox: FC<ImgGalleryProps> = ({ gallery }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [plugins, setPlugins] = useState<any[]>([]); // Plugins loaded dynamically
    
    // Load plugins and CSS when opening the lightbox
    const handleOpen = async () => {
        try {
            const [
                { default: Captions },
                { default: Fullscreen },
                { default: Slideshow },
                { default: Thumbnails },
                { default: Video },
                { default: Zoom },
            ] = await Promise.all([
                import("yet-another-react-lightbox/plugins/captions"),
                import("yet-another-react-lightbox/plugins/fullscreen"),
                import("yet-another-react-lightbox/plugins/slideshow"),
                import("yet-another-react-lightbox/plugins/thumbnails"),
                import("yet-another-react-lightbox/plugins/video"),
                import("yet-another-react-lightbox/plugins/zoom"),
            ]);
            
            // Load CSS
            await Promise.all([
                import("yet-another-react-lightbox/styles.css"),
                import("yet-another-react-lightbox/plugins/captions.css"),
                import("yet-another-react-lightbox/plugins/thumbnails.css"),
            ]);
            
            setPlugins([Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]);
            setIsOpen(true);
        } catch (error) {
            console.error("Failed to load lightbox plugins:", error);
        }
    };
    
    const slidesGallery = gallery?.map((image) => ({
        src: image.original,
    }));
    
    return (
        <div className="absolute -top-1 z-10 bg-white rounded flex">
            <button type="button" onClick={handleOpen}>
                <IoExpandOutline className="text-3xl" />
            </button>
            
            {isOpen && (
                <Suspense>
                    <LightboxComponent
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={slidesGallery}
                        plugins={plugins}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default ImageLightBox;
