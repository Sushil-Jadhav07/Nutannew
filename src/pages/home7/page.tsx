import {HeadMetadata} from "@/App";
import React from "react";
import Container from '@/components/shared/container';
import HeroSliderBlock from "@/components/hero/hero-slider-block";

import { homeSeventHeroSlider as heroSlider} from "@/components/hero/data";
import CollectionShop from "@/components/collection/collection-shop";
import ThisWeekProductFeed from '@/components/product/feeds/this-week-top-product';
import CollectionDeal from "@/components/collection/collection-deal";
import SuppercategoryPopular from "@/components/product/suppercategory/suppercategory-popular";
import CollectionFeatured from "@/components/collection/collection-featured";
import Testimonial from "@/components/collection/testimonial";

const Home7page: React.FC = () => {
    return (
        <>
            <HeadMetadata pageTitle="Home7 "/>
            <Container className={"lg:max-w-[1600px]"}>
                <div className="mb-8 lg:mb-15">
                    <HeroSliderBlock
                        heroBanner={heroSlider}
                        showHeroContent={true}
                        variant={"hero-4"}
                        contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[270px] xl:min-h-[370px] rounded"
                    />
                </div>
            </Container>

            <div className={"border-b border-border-base mb-8 lg:mb-15 "}>
                <Container>
                    <CollectionShop className={"mb-8 lg:mb-12"}/>
                </Container>
            </div>

            <Container>
                <ThisWeekProductFeed variant={"furniture"} className="mb-8 lg:mb-12"/>
                <CollectionDeal className={"border-b border-border-base mb-8 lg:mb-15 pb-8 lg:pb-12"}/>
                <SuppercategoryPopular className="mb-8 lg:mb-15"/>
                <CollectionFeatured className="mb-8 lg:mb-15"/>
                <Testimonial />
            </Container>

        </>
    )
};
export default Home7page;
