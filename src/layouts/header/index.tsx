import React, {useRef, useState} from 'react';
import {siteNavigation} from '@/data/navigation-settings';
import {useUI} from '@/contexts/useUI';
import {useActiveScroll} from '@/utils/use-active-scroll';

import Container from '@/components/shared/container';
import Logo from '@/components/shared/logo';
import Text from '@/components/shared/text';
import MenuIcon from '@/components/icons/menu-icon';
import SearchIcon from '@/components/icons/search-icon';
import Search from '@/components/top-search/search';
import cn from 'classnames';
import {FiMenu} from 'react-icons/fi';

import MainMenu from '@/layouts/header/main-menu';
import HeaderMenutop from '@/layouts/header/header-menutop';

import CategoryDropdownNav from '@/components/category/category-dropdown-nav';
import AuthDropdown from "@/layouts/header/auth-dropdown";
import { MainMenuType } from '@/services/types';
import { Link } from 'react-router-dom';

const CartButton = React.lazy(() => import('@/layouts/header/cart-button'));


interface HeaderProps {
    className?: string;
    variant?: string;
}
const Header: React.FC<HeaderProps> = ({className, variant}) => {
    const {openSidebar,displaySearch,  openSearch,  displayMobileSearch} = useUI();
    const siteHeaderRef = useRef<HTMLDivElement>(null);
    const [toggleAllCategory, setToggleAllCategory] = useState(Boolean(false));
    
    useActiveScroll(siteHeaderRef as React.RefObject<HTMLElement>);
    
    function handleMobileMenu() {
        return openSidebar();
    }
    
    function handleCategoryMenu() {
        setToggleAllCategory(!toggleAllCategory);
    }
    
    return (
        <>
            <header
                id="siteHeader"
                ref={siteHeaderRef}
                className={cn(
                    'header-one sticky-header sticky top-0 z-50 lg:relative w-full bg-white',
                    displayMobileSearch && 'active-mobile-search',
                    className,
                
                )}
            >
                <div className={cn(
                    "innerSticky  z-20 w-full transition duration-200 ease-in-out   ",
                    {'bg-brand-dark text-white': variant === 'home5' ,}
                )}>
                    <Search
                        searchId="mobile-search"
                        className="topbar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    <div className="top-bar text-sm  border-b border-border-base">
                        <Container>
                            <div className="h-11 flex justify-between items-center ">
                                <Text className={`hidden md:block truncate m-0 text-brand-muted`} variant={"small"}>
                                New beginning-Explore our brand now!
                                </Text>
                                <div className="flex flex-shrink-0 smx-auto pace-s-5">
                                    <HeaderMenutop
                                        data={siteNavigation.topmenu}
                                        className="flex transition-all duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="border-b border-border-base">
                        <Container>
                            <div className="flex items-center justify-between  py-2 md:py-2">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="bg-brand-dark text-white rounded focus:outline-none flex-shrink-0 text-sm  text-skin-inverted px-2.5 md:px-3 lg:px-[18px] py-2.5 md:py-2.5 lg:py-3 flex items-center transition-all"
                                        onClick={handleMobileMenu}
                                    >
                                        <MenuIcon/>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Logo  className="logo"/>
                                    <Text className="text-brand-dark font-bold text-lg hidden sm:block">
                                        Nutan Overseas
                                    </Text>
                                </div>
                                {/* End of logo */}
                                
                                <Search
                                    searchId="top-search"
                                    className="hidden lg:flex lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[800px] lg:mx-10"
                                />
                                {/* End of search */}
                                
                                <div className="text-brand-dark flex text-sm space-x-5 xl:space-x-10 lg:max-w-[33%]">
                                    <AuthDropdown/>
                                    
                                    <CartButton className="hidden lg:flex"/>
                                </div>
                                {/* End of auth & lang */}
                            </div>
                        </Container>
                    </div>
                    <div className="hidden navbar  lg:block bg-white border-b border-border-base ">
                        <Container>
                            <div className="flex justify-between items-center">
                                <Logo
                                    className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"
                                />
                                {/* End of logo */}
                                
                                <div className="categories-header-button relative  flex-shrink-0 w-52 xl:w-60">
                                    <Link to="/categories">
                                    <button
                                        className="text-brand-dark text-sm border-border-base min-h-[48px] focus:outline-none w-full font-semibold py-2 flex items-center"
                                        // onClick={handleCategoryMenu}
                                    >
                                        <FiMenu className="text-2xl me-3"/>
                                        All Categories
                                    </button>
                                    </Link>
                                    {/* {toggleAllCategory && <CategoryDropdownNav/>} */}
                                </div>
                                
                                <MainMenu
                                    navigations={siteNavigation.menu as MainMenuType[]}
                                    className="flex flex-nowrap transition-all duration-200 ease-in-out overflow-hidden"
                                />
                                
                                {/* End of main menu */}
                                
                                {displaySearch && (
                                    <div className="sticky-search  w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search className="max-w-[780px] xl:max-w-[830px] "/>
                                    </div>
                                )}
                                {/* End of conditional search  */}
                                
                                {/* <div className="bg-black text-brand-icon-header ms-auto flex xl:min-w-[80px] items-center flex-shrink-0">
                                    <div
                                        className="navbar-right flex items-center w-0 opacity-0 transition-all duration-200 ease-in-out">
                                        <button
                                            type="button"
                                            aria-label="Search Toggle"
                                            onClick={() => openSearch()}
                                            title="Search toggle"
                                            className="outline-none me-2 xl:me-6 w-12 md:w-14 h-full flex items-center justify-center  hover:text-heading focus:outline-none"
                                        >
                                            <SearchIcon className="w-[24px] h-[24px] text-base"/>
                                        </button>
                                        
                                        
                                        <div className="flex-shrink-0 flex items-center">
                                            <AuthDropdown hideLabel={true}/>
                                        </div>
                                        
                                        
                                        <CartButton  className="ms-5 xl:ms-8 "/>
                                        
                                    </div>
                                </div> */}
                            
                            </div>
                        </Container>
                    </div>
                </div>
            </header>
            {toggleAllCategory && (
                <div
                    className="shadow_bkg_show fixed w-full h-full inset-0   z-40 bg-black/60 backdrop-blur-xs"
                    onClick={handleCategoryMenu}
                ></div>
            )}
        </>
    );
}

export default Header;
