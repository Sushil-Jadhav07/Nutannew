import {HeadMetadata} from "@/App";
import React from "react";

import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeFourGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from "@/components/banner/data";
import { homeFourHeroSlider as heroSlider} from "@/components/hero/data";
import ServiceFeature from "@/components/common/service-featured";
import BrandCarousel from '@/components/brand/brand-carousel';
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import SectionHeader from "@/components/common/section-header";
import PopularFeed from "@/components/product/feeds/popular-feed";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import SectionMarquee from "@/components/common/section-marquee";

const Home4page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home4 "/>
            <div className="mb-8">
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={true}
                    variant={"hero-4"}
                    contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 min-h-[270px] md:min-h-[350px] xl:min-h-[500px] "
                />
            </div>
            <Container>
                <ServiceFeature className={"mb-8 "} variant={'home2'}/>

                <BannerGrid
                    data={gridHero2}
                    girdClassName={"md:gap-3"}
                    grid={3}
                    className="mb-8 lg:mb-12"
                />

                <BestDealsFeed
                    variant={'outBorder'}
                    showBanner={false}
                    className={'navSlider'}
                />

                <BannerGrid
                    data={gridHero}
                    grid={2}
                    girdClassName={"md:gap-3"}
                    className="mb-8 lg:mb-12"
                />

                <ListingElectronic variant={'outBorder'}/>

            </Container>
            <div className={'bg-background py-8 lg:py-15 lg:pt-12'}>
                <Container>
                    <PopularFeed
                        className="mb-0"
                        variant={'outBorder'}
                    />
                </Container>
            </div>
            
            <SectionMarquee/>

            <div className={'py-8 lg:py-12'}>
                <Container>
                    <SectionHeader
                        sectionHeading="From The Blog"
                        className={"uppercase mb-3"}
                    />
                    <LatestblogCarousel className="mb-0 " variant={'home4'}/>
                </Container>
            </div>

            <div className={'border-t border-black/10  py-4'}>
                <Container>
                    <BrandCarousel className="mb-0"/>
                </Container>
            </div>

        </>
    )
};
export default Home4page;
