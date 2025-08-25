import {HeadMetadata} from "@/App";
import React from "react";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import {
    homeEightGridHero as gridHero,
    homeEightGridHero2 as gridHero2,
} from "@/components/banner/data";
import {homeEightHeroSlider as heroSlider} from "@/components/hero/data";
import CollectionLight from "@/components/collection/collection-light";
import TrendingFeed from '@/components/product/feeds/trending-feed';
import SectionHeader from "@/components/common/section-header";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";
import BestProductFeed from "@/components/product/feeds/best-feed";

const Home8page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home8 "/>
            <div className="mb-8 lg:mb-24">
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={true}
                    variant={"hero-8"}
                    contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 min-h-[270px] md:min-h-[470px] xl:min-h-[980px] rounded"
                />
            </div>
            <Container>
                <BannerGrid
                    data={gridHero}
                    grid={3}
                    className="mb-8 lg:mb-24"
                />
            </Container>

            <div className={"bg-background py-8 lg:py-24  mb-12 lg:mb-24 "}>
                <Container>
                    <CollectionLight className="mb-0" headingPosition={'center-xl'}/>
                </Container>
            </div>

            <Container>
                <BestProductFeed  variant={"furniture2"} className="mb-12 lg:mb-24" />

                <BannerGrid
                    data={gridHero2}
                    grid={3}
                    className="mb-12 lg:mb-24"
                />

                <TrendingFeed  className="mb-12 lg:mb-24" variant={'furniture2'} />

                <SectionHeader
                    sectionHeading="From The Blog"
                    sectionSubHeading="Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas."
                    headingPosition={'center-xl'}
                />
                <LatestblogCarousel  variant={'home8'}  className="mb-12 lg:mb-16"/>

            </Container>
        </>
    )
};
export default Home8page;
