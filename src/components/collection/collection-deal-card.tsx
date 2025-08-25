
import Heading from '@/components/shared/heading';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';

import {collectionPlaceholder} from '@/assets/placeholders';
import cn from "classnames";

interface Props {
    imgWidth?: number | string;
    imgHeight?: number | string;
    href: string; // Specify string as the route type
    collection: {
        image: string;
        title: string;
        description?: string;
    };
}

const CollectionDealCard: React.FC<Props> = ({
                                              collection,
                                              imgWidth = 333,
                                              imgHeight = 335,
                                              href,
                                          }) => {
    const {image, title, description} = collection;
    return (
        <Link
            to={href}
            className="flex flex-col overflow-hidden group relative"
        >
            <Image
                src={image ?? collectionPlaceholder}
                alt={title || 'card-thumbnail'}
                width={imgWidth as number}
                height={imgHeight as number}
                className="rounded-md  transition duration-300 ease-in-out transform bg-fill-thumbnail group-hover:opacity-90"
            />
            <div className=" flex flex-col gap-2  text-center">
                <Heading
                    variant="base"
                    className="pt-4 sm:text-base"
                >
                    {title}
                </Heading>
                <p className={cn('text-sm font-medium ')}>
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default CollectionDealCard;
