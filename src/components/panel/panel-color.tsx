import React, { useEffect } from "react";
import { usePanel } from "@/contexts/usePanel";
import ThemeToggle from "@/components/panel/panelCardUI/theme-toggle";
import DirectionToggle from "@/components/panel/panelCardUI/direction-toggle";
import ColorSelector from "@/components/panel/panelCardUI/color-selector";
import usePanelColor from "@/hooks/use-panel-color";

const PanelColor: React.FC = () => {
    const { selectedDirection } = usePanel();
    const { groupedByIndustry,activeColorId,setActiveColorId } = usePanelColor();
    // Sync document direction with selectedDirection
    useEffect(() => {
        document.documentElement.dir = selectedDirection as string;
    }, [selectedDirection]);
    
    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
                <div className="flex justify-between">
                    <ThemeToggle />
                    <DirectionToggle />
                </div>
            </div>
            <ColorSelector groupedByIndustry={groupedByIndustry} activeColorId={activeColorId} setActiveColorId={setActiveColorId} />
        </div>
    );
};

export default PanelColor;