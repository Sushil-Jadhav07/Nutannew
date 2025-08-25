import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { usePanel } from "@/contexts/usePanel"; // Ensure this context exists
import { colorMap } from "@/data/color-settings"; // Ensure this file exists
import cn from "classnames"; // Ensure 'classnames' is installed

// Define props interface
interface LinkProps {
    to: string; // 'to' is used by react-router-dom instead of 'href'
    className?: string;
    children?: React.ReactNode;
    variant?: 'base' | 'line' | 'button-border' | 'button-primary'| 'button-black'| 'button-white'| 'button-detail'| 'btnFurni-detail';
    title?: string;
    [key: string]: any; // For additional props like target, rel, etc.
}

const Link: React.FC<LinkProps> = ({
       to,
       children,
       className,
       title,
       variant = 'line',
       ...props
    }) => {
    const { selectedColor } = usePanel();
    const btnClassName = "rounded block uppercase  px-5  py-4 md:py-3.5 lg:py-4 text-sm lg:text-15px leading-4  cursor-pointer transition-all ease-in-out duration-300  font-semibold text-center";
    const rootClassName = cn(
        'group',
        {
            [colorMap?.[selectedColor]?.text as string ] : variant === 'base',
            [`${colorMap?.[selectedColor]?.hoverLink} transition-all ease-in-out duration-500` ]: variant === 'line',
            [`text-black border border-gray-400 ${btnClassName} ${colorMap[selectedColor].hoverBorder} ${colorMap?.[selectedColor]?.hoverLink} `] : variant === 'button-border',
            [`bg-brand-dark dark:bg-brand-light  text-white ${btnClassName} hover:bg-brand-dark/90`] : variant === 'button-black',
            [`bg-white  text-brand-dark ${btnClassName} ${colorMap[selectedColor].hoverBg} hover:text-white`] : variant === 'button-white',
            [`text-brand-light ${btnClassName} ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`] : variant === 'button-primary',
            [`w-full min-w-[120px] flex px-4 py-2  relative leading-6 text-brand-light font-semibold rounded-full text-[13px] items-center justify-center transition-all ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`] : variant === 'button-detail',
            [`w-full min-w-[120px] flex px-4 py-2  relative leading-6 text-brand-light font-semibold rounded text-[13px] items-center justify-center transition-all bg-brand-dark dark:bg-white ${colorMap[selectedColor].hoverBg}`] : variant === 'btnFurni-detail',
        },
        className
    );
    
    return (
        <RouterLink to={to} title={title} className={rootClassName} {...props}>
            {children}
        </RouterLink>
    );
};

export default Link;
