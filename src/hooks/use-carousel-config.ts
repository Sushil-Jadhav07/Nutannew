import React, { useMemo } from "react";
import useWindowSize from "@/utils/use-window-size";

const useCarouselConfig = (
    variant?: string
) => {

    const { width } = useWindowSize();

    // Memoize spaceBetween based on variant and width
    const spaceBetween = React.useMemo(() => {
        if (variant === 'outBorder') {
            return 10;
        }
        if (variant === 'outBorder-xl') {
            return width! < 1536 ? 10 : 20;
        }
        return 6; // Default value
    }, [variant, width]);

    const breakpoints = useMemo(() => {
        switch (variant) {
            case "outBorder-xl":
                return {
                    1536: { slidesPerView: 7 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };

            default:
                return {
                    1536: { slidesPerView: 6 },
                    1280: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    360: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                };
        }
    }, [variant]);

    return { spaceBetween, breakpoints };
};

export default useCarouselConfig;