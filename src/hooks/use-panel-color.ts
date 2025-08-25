import { useEffect, useState } from "react";
import { sortedColorMapArray, SortedColorMapItem } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";
import { useSetSelectedDirection } from "@/contexts/panel/panelActions";

const usePanelColor = () => {
    const { selectedColor, selectedDirection } = usePanel();
    const setSelectedDirection = useSetSelectedDirection();

    // Create a unique identifier by combining key, id, and industry
    const getUniqueColorId = (colorObj: SortedColorMapItem): string => {
        return `${colorObj.key}-${colorObj.id}-${colorObj.industry}`;
    };
    
    // Find the initial selected color and set its unique ID
    const initialColor = sortedColorMapArray.find((c) => c.key === selectedColor);
    const initialUniqueId = initialColor
        ? getUniqueColorId(initialColor)
        : sortedColorMapArray.length > 0
            ? getUniqueColorId(sortedColorMapArray[0])
            : "";
    
    const [activeColorId, setActiveColorId] = useState<string>(initialUniqueId);
    
    // Group colors by industry, ensuring no duplicates within an industry
    const groupedByIndustry = sortedColorMapArray.reduce((acc, colorObj) => {
        const industryKey = colorObj.industry || "No Industry";
        if (!acc[industryKey]) {
            acc[industryKey] = [];
        }
        if (!acc[industryKey].some((c) => getUniqueColorId(c) === getUniqueColorId(colorObj))) {
            acc[industryKey].push(colorObj);
        }
        return acc;
    }, {} as Record<string, SortedColorMapItem[]>);
    
    const toggleThemeDirection = () => {
        const useLayoutDirection = selectedDirection === "ltr" ? "rtl" : "ltr";
        setSelectedDirection(useLayoutDirection);
    };

    // Sync document direction with selectedDirection
    useEffect(() => {
        document.documentElement.dir = selectedDirection as string;
    }, [selectedDirection]);

    return {
        groupedByIndustry,
        activeColorId,
        setActiveColorId,
        toggleThemeDirection,
        selectedDirection
    };
};

export default usePanelColor;