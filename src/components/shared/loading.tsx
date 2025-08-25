


import cn from 'classnames';
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import React from "react";

interface Props {
  className?: string;
}

const Loading: React.FC<Props> = ({
                                 className,
                               }) => {
  const { selectedColor } = usePanel();
  
  return (
      <div className={cn("flex justify-center items-center min-h-[300px]",className)}>
        <div
            className={cn("animate-spin rounded-full h-12 w-12 border-4 border-t-transparent", colorMap[selectedColor].border)}></div>
      </div>
  );
};

export default Loading;
