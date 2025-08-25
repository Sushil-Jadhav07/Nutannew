
import Heading from '@/components/shared/heading';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';

import { collectionPlaceholder } from '@/assets/placeholders';

interface Props {
    imgWidth?: number | string;
    imgHeight?: number | string;
    href: string;
    collection: {
        image: string;
        title: string;
        productCount?: number;
    };
}

const CollectionPopularCard: React.FC<Props> = ({
                                             collection,
                                             imgWidth = 267,
                                             imgHeight = 98,
                                             href,
                                         }) => {
    const { image, title, productCount  } = collection;
    return (
      <Link
        to={href}
        className="flex flex-col justify-center overflow-hidden rounded-xl group shadow-card relative"
      >
        <Image
          src={image ?? collectionPlaceholder}
          alt={title || ('text-card-thumbnail')}
          width={imgWidth as number}
          height={imgHeight as number}
          className="object-cover transition duration-300 ease-in-out transform group-hover:opacity-90"
        />
        <div className="absolute left-0 flex flex-col px-5 w-[170px]  ">
          <Heading variant="base" className="mb-1 text-brand-light">
            {title}
          </Heading>
          <p className={'text-13px text-brand-light'}>{productCount} Products</p>
        </div>
      </Link>
    );
};

export default CollectionPopularCard;
