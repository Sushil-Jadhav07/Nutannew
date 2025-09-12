import Heading from '@/components/shared/heading';
import cn from 'classnames';
import Text from '@/components/shared/text';

import React, { JSX } from 'react';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Props {
  className?: string;
  item: ItemProps;
  variant?: string;
}

const FeaturedCard: React.FC<Props> = ({ item, className, variant }) => {
  const { icon, title, description } = item;
  return (
	<div
	  className={cn(
		'group',
		{
		  'flex flex-col gap-4': variant === 'default' || variant === 'home3',
		  'flex ': variant === 'home2',
		  'md:flex text-white justify-center items-center gap-2': variant === 'home7' ,
            'flex text-white justify-center items-center gap-2':  variant === 'home5' || variant === 'home6',
		},
		className,
	  )}
	>
	  <div className="flex flex-shrink-0 items-center justify-center ">
		{icon}
	  </div>

	  {variant == 'home2' ? (
		<div className="ps-4">
		  <Heading variant="base" className="sm:text-sm  uppercase ">
			{title}
		  </Heading>
		  <Text className={'sm:text-13px lg:leading-[22px]'}>
			{description}
		  </Text>
		</div>
		 
	  ) : variant === 'home7' ? (
		<div className="flex flex-col md:flex-row  md:gap-2 items-center">
		  <Heading
			variant="base"
			className="sm:text-13px  uppercase xs:text-white"
		  >
			{title}
		  </Heading>
		  <Text className={'sm:text-13px lg:leading-[22px] text-[#8f9599]'}>
			{description}
		  </Text>
		</div>
		 
	  ) : variant === 'home5' || variant === 'home6' ? (
		<div className="ps-4 ">
		  <Heading
			variant="base"
			className="sm:text-13px  uppercase xs:text-brand-light"
		  >
			{title}
		  </Heading>
		  <Text className={'sm:text-13px lg:leading-[22px] text-[#8f9599]'}>
			{description}
		  </Text>
		</div>
	  ) : (
		<div className="ps-0 text-center">
		  <Heading
			variant="base"
			className="sm:text-[12px] sm:leading-4 uppercase font-bold text-white dark:text-black"
		  >
			{title}
		  </Heading>
		  <Text
			variant="small"
			className="sm:leading-4 font-normal sm:text-[13px] text-white dark:text-black"
		  >
			{description}
		  </Text>
		</div>
	  )}
	</div>
  );
};

export default FeaturedCard;
