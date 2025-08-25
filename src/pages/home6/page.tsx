import {HeadMetadata} from "@/App";
import React from "react";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";

import { homeSixHeroSlider as heroSlider} from "@/components/hero/data";
import InstagramGrid from "@/components/instagram/instagram";
import ThisWeekProductFeed from "@/components/product/feeds/this-week-top-product";
import CollectionDeal from "@/components/collection/collection-deal";
import SuppercategoryPopular from "@/components/product/suppercategory/suppercategory-popular";
import SectionHeader from "@/components/common/section-header";
import LatestblogCarousel from "@/components/blog/latestblog-carousel";

const Home6page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home6 "/>
            <div className="mb-8 lg:mb-15">
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={true}
                    variant={"hero-6"}
                    contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[370px] xl:min-h-[450px] "
                />
            </div>

            <div className={"border-b border-border-base mb-8 lg:mb-15 "}>
                <Container>
                    <InstagramGrid className="mb-8 lg:mb-12"/>
                </Container>
            </div>

            <Container>
                <ThisWeekProductFeed variant={"furniture"} className={"mb-8 lg:mb-15 pb-8 lg:pb-10"}/>
                <CollectionDeal className={"mb-8 lg:mb-15 pb-8 lg:pb-12"}/>
                <SuppercategoryPopular className="mb-8 lg:mb-15"/>
            </Container>
            <div className={"bg-background py-8 lg:p-15"}>
                <Container>
                    <SectionHeader
                        sectionHeading="From The Blog"
                        sectionSubHeading="Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas."
                        headingPosition={'center'}
                    />
                    <LatestblogCarousel variant={'home5'}/>
                </Container>
            </div>
        </>
    )
};
export default Home6page;
