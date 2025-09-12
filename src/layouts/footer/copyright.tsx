import Image from '@/components/shared/image';
import { siteSettings } from '@/data/site-settings';
import Container from '@/components/shared/container';
import cn from 'classnames';
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface CopyrightProps {
    variant?: string;
    payment?: {
        id: string | number;
        path?: string;
        name: string;
        image: string;
        width: number;
        height: number;
    }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
                                                 payment,
                                                 variant = 'default',
                                             }) => {
    const { selectedColor } = usePanel();
    
    return (
        <div className={cn('border-t border-black/10  pt-5 pb-16 sm:pb-20 md:pb-20 lg:pb-3 mb-2 sm:mb-0',
            {
                'text-fill-footer xs:border-white/10 dark:border-black/10': variant === 'home5' ||variant === 'home6' ||  variant === 'home7'|| variant === 'home8',
                'text-white dark:text-black border-white/20 dark:border-black/10': variant === 'default',
            },
        )}>
            <Container className={cn(
                {'2xl:max-w-[1730px]': variant === 'home5',}
            )}>
                <div className="flex flex-col md:flex-row text-center md:justify-between">
                    <p className="text-sm leading-7 lg:leading-[27px]">
                        &copy;&nbsp;Copyright {year}&nbsp;
                        <a
                            className={cn("transition-colors duration-200 ease-in-out  ", 
                                variant === 'default' ? 'text-white hover:text-white dark:text-black dark:hover:text-gray-600' : colorMap[selectedColor].link
                            )}
                            href={siteSettings.author.websiteUrl}
                        >
                            {siteSettings.author.name}
                        </a>
                        &nbsp; All rights reserved
                    </p>

                    {payment && (
                        <ul className="flex flex-wrap justify-center items-center space-x-4 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
                            {payment?.map((item) => (
                                <li
                                    className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex"
                                    key={`payment-list--key${item.id}`}
                                >
                                    <a
                                        href={item.path ? item.path : '/#'}
                                        target="_blank"
                                        className="inline-flex"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={item.width}
                                            height={item.height}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Copyright;
