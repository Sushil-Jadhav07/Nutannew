import {HeadMetadata} from "@/App";
import React from "react";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeFiveGridSlider as gridSlider,
    homeFiveGridHero as gridHero,
} from "@/components/banner/data";
import { homeFiveHeroSlider as heroSlider} from "@/components/hero/data";
import PopularFeed from "@/components/product/feeds/popular-home5-feed";
import CollectionPopular from "@/components/collection/collection-popular";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import BestSellerFeed from '@/components/product/feeds/best-seller-feed';
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import SectionHeader from "@/components/common/section-header";
import BrandCarousel from '@/components/brand/brand-carousel';
import SectionMarquee from "@/components/common/section-marquee";

const Home5page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home5 "/>
            <Container className="2xl:max-w-[1700px] ">
                <div className="grid xl:gap-5 grid-cols-1 xl:grid-cols-12">
                    <HeroSliderBlock
                        variant={"hero-4"}
                        heroBanner={heroSlider}
                        showHeroContent={true}
                        className={`xl:col-span-8 mb-5 xl:mb-10`}
                        contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 min-h-[270px] md:min-h-[370px] 2xl:min-h-[515px] rounded-xl"
                    />

                    <BannerGrid
                        data={gridSlider}
                        grid={1}
                        girdClassName="xl:gap-5"
                        variant={"rounded-xl"}
                        className="xl:col-span-4 mb-5 xl:mb-10"
                    />
                </div>
                <PopularFeed className="mb-8 lg:mb-12" variant={'outBorder-xl'}/>

                <CollectionPopular className="mb-8 lg:mb-10"/>

                <BestDealsFeed
                    variant={'outBorder-xl'}
                    showBanner={false}
                    className={'navSlider'}
                />

                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-10"
                />

                <ListingElectronic variant={'outBorder-xl'}/>
            </Container>

            <SectionMarquee/>

            <div className={' py-8 lg:py-10'}>
                <Container className="2xl:max-w-[1700px] ">
                    <BestSellerFeed className="mb-8 lg:mb-12" variant={'outBorder-xl'}/>
                    <SectionHeader
                        sectionHeading="From The Blog"
                        className={"uppercase mb-3"}
                    />
                    <LatestblogCarousel variant={'home5'} className="mb-8 lg:mb-12"/>
                    <BrandCarousel className="mb-0"/>
                </Container>
            </div>

        </>
    )
};
export default Home5page;
