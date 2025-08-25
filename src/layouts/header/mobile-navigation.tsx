

import Link from '@/components/shared/link';
import SearchIcon from '@/components/icons/search-icon';
import UserIcon from '@/components/icons/user-icon';
import MenuIcon from '@/components/icons/menu-icon';
import HomeIcon from '@/components/icons/home-icon';
import {useUI} from '@/contexts/useUI';
import {ROUTES} from '@/utils/routes';
import {Drawer} from '@/components/common/drawer/drawer';
import motionProps from '@/components/common/drawer/motion';
import React from "react";

const CartButton =  React.lazy(() => import('@/layouts/header/cart-button'));
const AuthMenu =  React.lazy(() => import('@/layouts/header/auth-menu'));
const MobileMenu =  React.lazy(() => import('@/layouts/header/mobile-menu'));

export default function BottomNavigation() {
    const {
        openSidebar,
        closeSidebar,
        displaySidebar,
        toggleMobileSearch,
    } = useUI();
    const dir = 'ltr' as string;
    
    function handleMobileMenu() {
        return openSidebar();
    }
    
    return (
        <>
            <div
                className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between drop-shadow-mobileNavigation body-font bg-brand-light w-full h-14 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
                <button
                    aria-label="Menu"
                    className="flex flex-col items-center justify-center outline-none shrink-0 focus:outline-none"
                    onClick={handleMobileMenu}
                >
                    <MenuIcon/>
                </button>
                <Link to={ROUTES.HOME} className="shrink-0">
                    <span className="sr-only">Home</span>
                    <HomeIcon/>
                </Link>
                
                <CartButton
                    hideLabel={true}
                />
                
                <button
                    className="relative flex items-center justify-center h-auto shrink-0 focus:outline-none"
                    onClick={toggleMobileSearch}
                    aria-label="Search Button"
                >
                    <SearchIcon/>
                </button>
                
                <AuthMenu>
                    <UserIcon/>
                </AuthMenu>
            </div>
            <Drawer
                className="w-[375px]"
                placement={dir === 'rtl' ? 'right' : 'left'}
                open={displaySidebar}
                onClose={closeSidebar}
                {...motionProps}
            >
                <MobileMenu/>
            </Drawer>
        </>
    );
}
