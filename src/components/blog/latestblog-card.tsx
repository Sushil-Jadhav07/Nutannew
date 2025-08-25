import Heading from '@/components/shared/heading';
import Image from '@/components/shared/image';
import Text from '@/components/shared/text';
import {collectionPlaceholder} from '@/assets/placeholders';
import {Blog} from "@/services/types";
import cn from "classnames";
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import { Link  } from 'react-router-dom';

interface Props {
    variant?: string;
    imgWidth?: number;
    imgHeight?: number;
    href: string;
    collection: Blog;
}

const LatestblogCard: React.FC<Props> = ({
                                             collection,
                                             imgWidth = 440,
                                             imgHeight = 250,
                                             href,
                                             variant
                                         }) => {
    const {image, title, date, authorName, shortDescription} = collection;
    const {selectedColor} = usePanel();
    
    return (
        <Link to={href} className={cn("group flex flex-col rounded bg-white overflow-hidden text-brand-muted",{
            "sm:rounded-xl":  variant === 'home7',
        })}>
            <Image
                src={image ?? collectionPlaceholder}
                alt={(title) || ('text-card-thumbnail')}
                width={imgWidth}
                height={imgHeight}
                className="rounded transition duration-1000 ease-in-expo hover:opacity-80"
            />
            <div className={cn('flex flex-col ',
                     {
                         'p-3 lg:p-5': variant === 'default' || variant === 'home5'  || variant === 'home7' ,
                         'p-2 py-3 lg:py-5': variant === 'home3' || variant === 'home8' ,
                         'p-2 py-3 lg:py-5 pr-5':  variant === 'home4'  ,
                     }
                     )}
            >
                <Heading
                    variant="title"
                    className={cn(colorMap[selectedColor].groupHoverLink,"mb-1 lg:mb-1.5 text-base line-clamp-2  ")}
                >
                    {title}
                </Heading>
                <Text variant="body" className="text-[12px] xs:mb-0 text-gray-500 uppercase">
                    Post By: 
                    <span className="post-on ">
                         {authorName}
                    </span>
                </Text>
                <div className="mt-2 mb-5 text-[14px] text-body font-medium line-clamp-2">{shortDescription}</div>
                <div className={"text-[12px] flex justify-between items-center border-t border-black/10 pt-5"}>
                    <div className={cn(colorMap[selectedColor].groupHoverLink,"p-0  font-bold uppercase")}>
                        Read More
                    </div>
                    <div className="entry-meta text-gray-500 flex">
                        {date}
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default LatestblogCard;
