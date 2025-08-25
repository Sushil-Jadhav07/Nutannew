
import BackToTopButton from '@/components/shared/back-to-top';
import BottomNavigation from "@/layouts/header/mobile-navigation";
import {usePanel} from "@/contexts/usePanel";

import Header from "@/layouts/header";
import Header5 from "@/layouts/home5/header";
import Header6 from "@/layouts/home6/header";
import Header8 from "@/layouts/home8/header";

import Footer from '@/layouts/footer';
import Footer5 from '@/layouts/home5/footer';
import Footer7 from '@/layouts/home7/footer';
import Footer8 from '@/layouts/home8/footer';
import React from "react";

export default function Home6Layout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const {selectedLayout, selectedFooter} = usePanel();
    return (
        <div className="flex flex-col min-h-screen ">
            {/* Panel - Header Layout */}
            {
                selectedLayout === 'Basic'   ? <Header />
                : selectedLayout === 'Header5' ? <Header5 />
                : selectedLayout === 'Header8' ? <Header8 />
                : <Header6 />
            }
            <main
                className="relative dark:bg-[#282828]"
                style={{
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {children}
            </main>

            {/* Panel - Footer Layout */}
            {
                selectedFooter === 'Footer5'   ? <Footer5 showWidgetServices={true} variant={"home5"} />
                 : selectedFooter === 'Footer7' ? <Footer7 />
                 : selectedFooter === 'Footer8' ? <Footer8  variant={"home8"}/>
                 : <Footer showWidgetServices={true} variant={"home6"}/>
            }
            
            <BottomNavigation/>
            <BackToTopButton/>
        </div>
    );
}
