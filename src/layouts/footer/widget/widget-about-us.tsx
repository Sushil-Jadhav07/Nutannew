import { Link  } from 'react-router-dom';
import Image from '@/components/shared/image';

import Heading from "@/components/shared/heading";
import cn from 'classnames';

interface AboutProps {
    className?: string;
    variant?: string;
    social?: {
        id: string | number;
        path?: string;
        name: string;
        image: string;
        width: number;
        height: number;
    }[];
}

const WidgetAbout: React.FC<AboutProps> = ({ social, className,variant}) => {
    
    return (
        <div className={cn(
                 'pb-10 sm:pb-0 ',{
                     'text-fill-footer': variant === 'home5' || variant === 'home6' || variant === 'home7'|| variant === 'home8',
                     'text-white dark:text-black': variant === 'default',
                 },
                 className
             )}
        >
            <div className="text-sm xl:max-w-[350px] mx-auto sm:ms-0 mb-2">

                <Heading variant="base" className={cn('uppercase mb-4 lg:mb-5',
                    {
                        'text-brand-light': variant === 'home5' || variant === 'home6' || variant === 'home7'|| variant === 'home8',
                        'text-white dark:text-black': variant === 'default',
                    })}>
                    About The Store
                </Heading>
                <div className="mb-3">Address: Acme Widgets 123 Widget Street Acmeville, AC  12345 United States of America</div>
                <div className="mb-3">Phone: (1800)-000-6890</div>
                <div className="mb-3">Email: yourexample@email.com</div>
            </div>

            {social && (
                <ul className="flex flex-wrap items-center  space-x-4 md:space-s-5 mt-5">
                    {social?.map((item) => (
                        <li
                            className="transition  hover:opacity-80"
                            key={`social-list--key${item.id}`}
                        >
                            <Link to={item.path ? item.path : '#'} >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        height={item.height}
                                        width={item.width}
                                        className="transform text-brand-light"
                                    />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WidgetAbout;
