import {HeadMetadata} from "@/App";
import React from "react";
import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";

import {homeHeroSlider as heroSlider} from "@/components/hero/data";
import {
    homeBannerSlider as bannerSlider,
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2} from "@/components/banner/data";
import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import BestSellerFeed from "@/components/product/feeds/best-seller-feed";
import PopularFeed from '@/components/product/feeds/popular-feed';
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";

const Homepage: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Nutan Overseas"/>
            <Container>
                <div className="grid xl:gap-[5px] grid-cols-1 xl:grid-cols-12">
                    <HeroSliderBlock
                        useFirebase={true}
                        fallbackBanners={heroSlider}
                        showHeroContent={true}
                        className={`xl:col-span-8 mb-5 xl:mb-12`}
                        contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[270px] xl:min-h-[375px] rounded"
                    />
                    <BannerGrid
                        useFirebase={true}
                        fallbackData={bannerSlider}
                        grid={1}
                        girdClassName="xl:gap-[5px]"
                        className="xl:col-span-4 mb-5 xl:mb-12"
                    />
                </div>
                
                <GridBaseCarousel  className="mb-8 lg:mb-12"/>
            </Container>
            <div className={"bg-zinc-100 dark:bg-zinc-800 py-10 sm:py-12"}>
                <Container>
                    <BestDealsFeed className={'navSlider'}/>
                    <BestSellerFeed className="mb-8 lg:mb-12"/>
                    <BannerGrid
                        data={gridHero}
                        grid={1}
                        className="mb-8 lg:mb-12"
                    />
                    <ListingElectronic variant={"horizontal"}/>
                    <BannerGrid
                        data={gridHero2}
                        grid={3}
                        className="mb-8 lg:mb-12"
                    />
                    <PopularFeed className="mb-8 lg:mb-12"/>
                    {/* <LatestblogCarousel/> */}
                </Container>
            </div>
        </>
    );
};
export default Homepage;
