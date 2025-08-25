
import {HeadMetadata} from "@/App";
import React from "react";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import CategoryDropdownNav from '@/components/category/category-dropdown-nav';
import {
    homeTwoHeroCarousel as bannerSlider,
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeTwoHeroSlider as heroSlider} from "@/components/hero/data";
import ServiceFeature from '@/components/common/service-featured';
import BestSellerTodayFeed from "@/components/product/feeds/best-seller-today-feed";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import PopularFeed from "@/components/product/feeds/popular-feed";
import SuppercategorySmartphone from "@/components/product/suppercategory/suppercategory-smartphone";
import SuppercategoryHeadphones from "@/components/product/suppercategory/suppercategory-headphone";
import SuppercategoryDesktop from "@/components/product/suppercategory/suppercategory-desktop";
import SuppercategoryLaptop from "@/components/product/suppercategory/suppercategory-laptop";

const Home2page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home2 "/>
            <Container >
                <div className={"grid gap-4 grid-cols-1 xl:gap-5 xl:grid-cols-[270px_1fr] mb-7"}>
                    <div className={"hidden xl:block bg-white rounded relative h-auto "}>
                        <CategoryDropdownNav categoriesLimit={10}/>
                    </div>

                    <div className={"grid gap-1.5 grid-cols-1"}>
                        <HeroSliderBlock
                            heroBanner={heroSlider}
                            showHeroContent={true}
                            className={`mb-0`}
                            contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[320px]  xl:min-h-[340px] "
                        />
                        <BannerGrid
                            data={bannerSlider}
                            grid={3}
                            girdClassName={"gap-1.5"}
                            className=" 2xl:gap-[5px] staticBanner--slider"
                        />
                    </div>
                </div>
            </Container>

            <Container>
                <ServiceFeature className={"mb-8 lg:mb-12"} variant={'home2'}/>
                <BestSellerTodayFeed/>
                <BannerGrid
                    data={gridHero}
                    grid={1}
                    className="mb-8 lg:mb-12"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5">
                    <SuppercategorySmartphone/>
                    <SuppercategoryDesktop  />
                    <SuppercategoryHeadphones />
                    <SuppercategoryLaptop  />
                </div>
                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />

                <PopularFeed className="mb-8 lg:mb-12"/>

                <LatestblogCarousel className="mb-8 "/>
            </Container>
        </>
    )
};
export default Home2page;
