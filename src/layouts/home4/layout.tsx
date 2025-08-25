
import BackToTopButton from '@/components/shared/back-to-top';
import BottomNavigation from "@/layouts/header/mobile-navigation";

import Header from "@/layouts/header";
import Header5 from "@/layouts/home5/header";
import Header6 from "@/layouts/home6/header";
import Header8 from "@/layouts/home8/header";

import Footer from '@/layouts/footer';
import Footer5 from '@/layouts/home5/footer';
import Footer7 from '@/layouts/home7/footer';
import Footer8 from '@/layouts/home8/footer';

import {usePanel} from "@/contexts/usePanel";
import React from "react";

export default function Home4Layout({
	                                    children,
                                    }: {
	children: React.ReactNode;
}) {
	const { selectedLayout,selectedFooter } = usePanel();
	return (
		<div className="page-type-home4 flex flex-col min-h-screen dark:bg-[#272728]">
			{/* Panel - Header Layout */}
			{
				selectedLayout === 'Header5'   ? <Header5 />
				: selectedLayout === 'Header6' ? <Header6 />
				: selectedLayout === 'Header8' ? <Header8 />
				: <Header />
			}
			<main
				className="relative"
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
				: <Footer />
			}
			
			<BottomNavigation />
			<BackToTopButton/>
		</div>
	);
}
