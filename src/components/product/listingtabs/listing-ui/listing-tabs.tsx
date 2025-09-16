"use client";
import cn from 'classnames';
import useWindowSize from "@/utils/use-window-size";
import {useMemo} from "react";

import DesktopTabs from "@/components/product/listingtabs/listing-ui/desktopTabs";
import MobileDropdownTabs from "@/components/product/listingtabs/listing-ui/mobileDropdownTabs";


const ListingTabs = ({ className, data, onNavClick, activeTab, variant }: any) => {
    const {width} = useWindowSize();
    const isDesktopView = useMemo(() => width! > 1280, [width]);
    
    return (
        <div
            className={cn(
                'sm:flex items-center block-title mb-1.5 gap-2',
                className,
                {
                    ['py-2.5'] : variant ==="outBorder" || variant ==="outBorder-xl",
                    ['px-5 py-2.5 rounded bg-white'] : variant ==="default" || variant ==="horizontal"
                }
            )}
        >
            <h3 className="text-base text-[16px] uppercase text-brand-dark font-semibold border-0  xl:basis-[20%]">
                {data?.name}
            </h3>

            {Array.isArray(data?.children) && (
                isDesktopView
                    ? <DesktopTabs childrenData={data.children} activeTab={activeTab} onNavClick={onNavClick} />
                    : <MobileDropdownTabs childrenData={data.children} onNavClick={onNavClick} />
            )}
        </div>
    );
};

export default ListingTabs;
