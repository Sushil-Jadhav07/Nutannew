import React from "react";
import { usePanel } from "@/contexts/usePanel";
import { useSetSelectedDirection } from "@/contexts/panel/panelActions";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

const DirectionToggle: React.FC = () => {
    const { selectedColor, selectedDirection } = usePanel();
    const setSelectedDirection = useSetSelectedDirection();
    
    const toggleThemeDirection = () => {
        const useLayoutDirection = selectedDirection === "ltr" ? "rtl" : "ltr";
        setSelectedDirection(useLayoutDirection);
    };
    
    return (
        <div>
            <h3 className="text-base font-medium mb-4">Layout Direction</h3>
            <div className="flex items-center">
                <span className="me-2">LTR</span>
                <button
                    onClick={toggleThemeDirection}
                    className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        selectedDirection === "rtl" ? colorMap[selectedColor].bg : "bg-gray-200"
                    )}
                >
          <span
              className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  selectedDirection === "rtl"
                      ? "ltr:translate-x-6 rtl:-translate-x-6"
                      : "ltr:translate-x-1 rtl:-translate-x-1"
              )}
          />
                </button>
                <span className="ms-2">RTL</span>
            </div>
        </div>
    );
};

export default DirectionToggle;