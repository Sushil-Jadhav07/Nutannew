
import React from "react";
import {HeadMetadata} from "@/components/shared/HeadMetadata";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import CategoryDropdownNav from '@/components/category/category-dropdown-nav';
import {
    homeThreeHeroCarousel as bannerSlider,
    homeThreeGridHero as gridHero,
    homeThreeGridHero2 as gridHero2,
} from "@/components/banner/data";
import {homeThreeHeroSlider as heroSlider} from "@/components/hero/data";

import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import ListingFeatured from "@/components/product/listingtabs/listing-featured";
import PopularFeed from "@/components/product/feeds/popular-feed";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import BestSellerTodayFeed from "@/components/product/feeds/best-seller-today-feed";

const Home3page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home3 "/>
            <div className={"bg-background py-8"}>
                <Container>
                    <div className={"grid gap-4 grid-cols-1 xl:gap-5 xl:grid-cols-[270px_1fr] "}>
                        <div className={"hidden xl:block bg-white rounded relative h-auto "}>
                            <CategoryDropdownNav categoriesLimit={10}/>
                        </div>

                        <div className={"grid gap-2.5 grid-cols-1 xl:grid-cols-[1fr_300px]"}>
                            <div className={'grid gap-2.5 grid-cols-1'}>
                                <HeroSliderBlock
                                    heroBanner={heroSlider}
                                    showHeroContent={true}
                                    variant={"hero-3"}
                                    className={`mb-0`}
                                    contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 min-h-[220px] md:min-h-[320px]  xl:min-h-[320px] "
                                />
                                <GridBaseCarousel variant={"card"} className="mb-0" limit={5}/>
                            </div>

                            <BannerGrid
                                data={bannerSlider}
                                grid={1}
                                girdClassName={"gap-2.5"}
                                className="hidden xl:block 2xl:gap-[5px] staticBanner--slider"
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <ListingFeatured variant={'boxBorder'}/>

                <BannerGrid
                    data={gridHero}
                    grid={1}
                    className="mb-8 lg:mb-12"
                />

                <BestSellerTodayFeed/>

                <BannerGrid
                    data={gridHero2}
                    grid={2}
                    className="mb-8 lg:mb-12"
                />
                <PopularFeed className="mb-8 lg:mb-12" variant={"boxBorder"}/>

                <LatestblogCarousel className="mb-8 " variant={"home3"}/>

            </Container>


        </>
    )
};
export default Home3page;
