'use client';

import Heading from '@/components/shared/heading';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';

import { collectionPlaceholder } from '@/assets/placeholders';
import cn from 'classnames';
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
    href: string;
    variant?: 'rounded' | 'default' | 'rounded-xl';
  collection: {
    image: string;
    title: string;
    description?: string;
  };
}

const CollectionShopCard: React.FC<Props> = ({
  collection,
  imgWidth = 262,
  imgHeight = 195,
  href,
  variant = 'default',
}) => {
  const { image, title } = collection;
    const {selectedColor} = usePanel();
  return (
    <Link
      to={href}
      className={cn('flex flex-col overflow-hidden   shadow-card relative',{
          'rounded-md': variant === 'default',
          'rounded-xl justify-center  items-center': variant === 'rounded-xl',
      })}
    >
      <Image
        src={image ?? collectionPlaceholder}
        alt={title || 'card-thumbnail'}
        width={imgWidth as number}
        height={imgHeight as number}
        className="object-cover transition duration-300 ease-in-out transform bg-fill-thumbnail group-hover:opacity-90 group-hover:scale-105"
      />
      <div className={cn('absolute flex flex-col px-3 bg-white rounded group',
          colorMap[selectedColor].hoverBg,
          {
          'inset-x-4 bottom-4  ': variant === 'default',
          'rounded-full  bottom-7   py-1 max-w-[180px] w-full': variant === 'rounded-xl',
      })}>
        <Heading
          variant="base"
          className={cn('lg:px-5 py-2 leading-7 text-center hover:text-white dark:hover:text-black', {
                  'md:text-base': variant === 'rounded-xl',
              })}
        >
          {title}
        </Heading>
       
      </div>
    </Link>
  );
};

export default CollectionShopCard;
