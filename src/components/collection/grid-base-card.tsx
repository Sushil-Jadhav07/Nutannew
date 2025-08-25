import Link from '@/components/shared/link';
import Image from '@/components/shared/image';
import cn from 'classnames';
import {categoryPlaceholder} from '@/assets/placeholders';
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import {Category} from "@/services/types";

interface Props {
    item: Category;
    href: string;
    className?: string;
    variant: string;
}

const GridBaseCard: React.FC<Props> = ({ item, href, className,variant}) => {
    const {name, image, productCount} = item ;
    const { selectedColor } = usePanel();
    return (
        <Link
            to={href}
            className={cn('group block w-full', className)} key={name}  >
            <div className={cn(
                     'flex flex-col  items-center text-[14px]',
                     {
                         'card-category--zoom gap-2': variant === 'default' ,
                         'bg-white rounded p-2 lg:p-5': variant === 'card',
                     }
                 )}
            >
                <div className={cn(
                         'card-category--thumb  ',
                         {
                             'rounded-full relative bg-gray-100 min-w-[100px] h-[100px] ': variant === 'default' ,
                             'max-w-[90px] h-[95px] ': variant === 'card',
                         }
                     )}
                >
                    <Image
                        src={image?.thumbnail ?? categoryPlaceholder}
                        alt={name || 'Card Thumbnail'}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="category-info text-center">
                    <h3 className={cn(colorMap?.[selectedColor]?.groupHoverLink,"font-semibold text-brand-dark truncate leading-6 group-hover:text-skin-primary")}>
                        {name}
                    </h3>
                    {variant === 'default' && <p className={"text-gray-600 dark:text-gray-500"}>{productCount} Products</p>}
                    
                </div>
                
            </div>
        </Link>
    );
};

export default GridBaseCard;
