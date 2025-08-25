import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Using react-router-dom for routing
import { usePanel } from '@/contexts/usePanel';
import { colorMap } from '@/data/color-settings';
import cn from 'classnames';

type Option = {
    name: string;
    slug: string;
};

const AccountNav: React.FC<{ options: Option[] }> = ({ options }) => {
    const location = useLocation(); // useLocation provides the current pathname
    const { selectedColor } = usePanel();
    
    const pathname = location.pathname;
    
    return (
        <nav className="flex flex-col md:flex-row border-b border-border-base bg-white space-x-4 md:space-x-8">
            {options.map((item, index) => (
                <Link
                    key={index}
                    to={item.slug}
                    className={cn(
                        "relative flex items-center cursor-pointer text-sm lg:text-base py-3.5",
                        colorMap[selectedColor].hoverLink,
                        pathname !== item.slug
                            ? "font-medium"
                            : `${colorMap[selectedColor].link} ${colorMap[selectedColor].border} border-b-2 font-semibold`
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default AccountNav;
