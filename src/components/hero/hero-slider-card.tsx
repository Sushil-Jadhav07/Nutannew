import cn from 'classnames';
import Link from '@/components/shared/link';
import useWindowSize from '@/utils/use-window-size';
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";

interface BannerProps {
  banner?: any;
  className?: string;
  heroContentCard?: boolean;
  variant: string;
}

function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function HeroSliderCard({
                                           banner,
                                           className = 'py-20 xy:pt-24',
                                           variant ,
                                           heroContentCard = true,
                                       }: BannerProps) {
    const {width} = useWindowSize();
    const {title, description, image} = banner;
    const selectedImage = getImage(width!, image);
    const {selectedColor} = usePanel();
    return heroContentCard ? (
        <div
            className={cn(
                'w-full relative bg-no-repeat bg-cover bg-center flex items-center ',
                {'min-h-[320px] md:min-h-[367px]':variant === 'hero',
                },
                {
                    'bg-fill-thumbnail': variant !== 'hero-3',
                },
                className
            )}
            style={{
                backgroundImage: `url('${selectedImage.url}')`,
                backgroundPosition: 'center center'
            }}
        >
            <div
                className={cn(
                    ' inset-0 m-[15px] md:mt-[30px]  w-full flex rtl:flex-row-reverse  items-center',
                    {
                        'sm:absolute mx-auto max-w-[480px] md:max-w-[580px] xl:max-w-[700px]': variant === 'hero',
                        'sm:absolute mx-auto max-w-[480px] md:max-w-[580px] xl:max-w-[680px]': variant === 'hero-3',
                        'xl:mt-[0px] mx-auto max-w-[1380px]': variant === 'hero-6' || variant === 'hero-4' || variant === 'hero-8',
                    }
                )}
            >
                <div className={cn(
                         'text-start ',
                         {
                             'md:w-8/12 lg:w-6/12 ': variant === 'hero'||variant === 'hero-8',
                             'max-w-[450px] p-8 rounded-lg bg-white': variant === 'hero-6',
                             'max-w-[500px]':  variant === 'hero-4',
                         }
                     )}
                >
                    <p
                        className={cn(
                            'text-[12px] leading-7 uppercase font-bold ',
                            {
                                'text-brand-light ': variant === 'default',
                                'text-brand-light': variant === 'hero'  ||    variant === 'hero-4',
                                'text-brand-dark dark:text-white': variant === 'hero-3',
                                'sm:text-sm text-brand-dark dark:text-white': variant === 'hero-8',
                            }
                        )}
                    >
                        {description}
                    </p>
                    <h2
                        className={cn('text-2xl md:text-4xl font-semibold mt-2 leading-8', {
                            'xl:text-5xl 2xl:text-[36px] text-brand-light leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 ': variant == 'hero' ||  variant === 'hero-4',
                            'xs:text-brand-dark dark:text-white 2xl:text-[36px]': variant === 'hero-3',
                            'sm:mt-4 xs:text-brand-dark 2xl:text-[32px] ': variant === 'hero-6' ,
                            'sm:mt-5 xs:text-brand-dark dark:text-white 2xl:text-[60px] 2xl:leading-[1em] ':  variant == 'hero-8',
                        })}
                    >
                        {title}
                    </h2>


                    {banner.btnText && (
                        <Link
                            to={banner.btnUrl}
                            className={cn('text-sm rounded h-[44px] mt-5 md:mt-12 text-base inline-flex items-center justify-center sm:capitalize px-10 py-2 font-semibold ', {
                                [`text-brand-dark bg-white  ${colorMap[selectedColor].hoverBg} hover:sm:text-brand-light`]: variant == 'hero' ,
                                [`text-brand-light ${colorMap[selectedColor].bg} hover:text-white hover:bg-brand-dark  `]: variant === 'hero-3',
                                [`text-white bg-brand-dark hover:text-white ${colorMap[selectedColor].hoverBg} `]: variant === 'hero-6' || variant == 'hero-8',
                                'text-brand-dark dark:text-white bg-brand-light  hover:bg-gray-200 dark:hover:bg-brand-light':   variant === 'hero-4',
                                'xl:min-w-[220px] sm:text-brand-light dark:bg-white ': variant == 'hero-8'
                            })}
                        >
                            {(banner.btnText)}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <Link to={banner.btnUrl}>
            <div
                className={cn(
                    'w-full bg-skin-thumbnail bg-no-repeat bg-cover flex items-center',
                    {
                        'min-h-[160px]  ': variant === 'hero',
                    },
                    className
                )}
                style={{
                    backgroundImage: `url('${selectedImage.url}')`,
                    backgroundPosition:
                        variant === 'hero-3' ? 'left bottom -10px' : 'center center',
                }}
            ></div>
        </Link>
    );
}

