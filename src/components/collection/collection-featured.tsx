

import CollectionFeaturedCard from "@/components/collection/collection-featured-card";

const heroBanner = [
    {
        id: 1,
        title: 'Our Favorite & Best Selling High-Quality Sofas.',
        description: 'The best quality products are waiting for you.',
        btnText: 'Shop Now',
        btnUrl: '/',
        image: {
            mobile: {
                url: '/assets/images/collection/img_5_1_720x.png',
            },
            desktop: {
                url: '/assets/images/collection/img_5_1_720x.png',
            },
        },
    },
    {
        id: 2,
        title: 'Premium & Exclusive Aristocratic Bedroom Class.',
        description: 'The best quality products are waiting for you.',
        btnText: 'Shop Now',
        btnUrl: '/',
        image: {
            mobile: {
                url: '/assets/images/collection/img_5_2_720x.png',
            },
            desktop: {
                url: '/assets/images/collection/img_5_2_720x.png',
            },
        },
    }
];

interface Props {
    className?: string;
}


const CollectionFeatured: React.FC<Props> = ({
                                             className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
                                         }) => {
    return (
        <div className={className}>
            
            <div className="gap-5 grid xl:grid-cols-2 ">
                {heroBanner?.map((item: any) => (
                    <CollectionFeaturedCard
                        key={item.id}
                        collection={item}
                    />
                ))}
            </div>
        
        </div>
    );
};

export default CollectionFeatured;
